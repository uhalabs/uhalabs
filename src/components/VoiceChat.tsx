import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VoiceChat.css';

const BACKEND_URL = 'https://uhalabs.onrender.com';
const OPENAI_REALTIME_URL = 'https://api.openai.com/v1/realtime';
const MODEL = 'gpt-4o-realtime-preview';

interface TranscriptEntry {
  role: 'user' | 'assistant';
  text: string;
  id: string;
}

type ConnectionState = 'idle' | 'connecting' | 'active' | 'error';

export default function VoiceChat() {
  const navigate = useNavigate();
  const [state, setState] = useState<ConnectionState>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [statusText, setStatusText] = useState('Tap the orb to start a conversation');
  const [waveHeights, setWaveHeights] = useState<number[]>(new Array(12).fill(4));

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Audio Visualization ─────────────────────────────
  const startVisualization = useCallback((stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
      const bars = 12;
      const heights: number[] = [];
      const step = Math.floor(dataArray.length / bars);

      for (let i = 0; i < bars; i++) {
        const val = dataArray[i * step] || 0;
        heights.push(Math.max(4, (val / 255) * 36));
      }
      setWaveHeights(heights);
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, []);

  // ── Connect ─────────────────────────────────────────
  const connect = useCallback(async () => {
    try {
      setState('connecting');
      setStatusText('Connecting to AI assistant...');

      // Step 1: Get ephemeral token from our backend
      const sessionRes = await fetch(`${BACKEND_URL}/api/realtime/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          voice: 'alloy',
          instructions: 'You are a helpful, friendly AI assistant from Uha Labs. Keep responses concise and conversational. Respond naturally as if chatting with a friend.',
        }),
      });

      if (!sessionRes.ok) {
        throw new Error(`Session creation failed: ${sessionRes.status}`);
      }

      const sessionData = await sessionRes.json();
      const ephemeralKey = sessionData.client_secret?.value;

      if (!ephemeralKey) {
        throw new Error('No ephemeral key received');
      }

      // Step 2: Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 24000,
        },
      });
      streamRef.current = stream;

      // Step 3: Create RTCPeerConnection
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = pc;

      // Step 4: Set up remote audio playback
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioRef.current = audioEl;

      pc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0];
      };

      // Step 5: Add microphone track
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Step 6: Create data channel for events
      const dc = pc.createDataChannel('oai-events');
      dcRef.current = dc;

      dc.addEventListener('open', () => {
        console.log('Data channel open');
      });

      dc.addEventListener('message', (event) => {
        try {
          const msg = JSON.parse(event.data);
          handleRealtimeEvent(msg);
        } catch (e) {
          console.warn('Failed to parse event:', e);
        }
      });

      // Step 7: Create SDP offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Step 8: Send SDP offer to OpenAI
      const sdpResponse = await fetch(`${OPENAI_REALTIME_URL}?model=${MODEL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ephemeralKey}`,
          'Content-Type': 'application/sdp',
        },
        body: offer.sdp,
      });

      if (!sdpResponse.ok) {
        throw new Error(`WebRTC negotiation failed: ${sdpResponse.status}`);
      }

      // Step 9: Set remote description
      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({
        type: 'answer',
        sdp: answerSdp,
      });

      // Start audio visualization
      startVisualization(stream);

      setState('active');
      setStatusText('Listening... speak anytime');
    } catch (error: unknown) {
      console.error('Connection error:', error);
      setState('error');
      const message = error instanceof Error ? error.message : 'Connection failed';
      setStatusText(`Error: ${message}`);
      disconnect();
    }
  }, [startVisualization]);

  // ── Handle Realtime Events ──────────────────────────
  const handleRealtimeEvent = useCallback((event: Record<string, unknown>) => {
    const type = event.type as string;

    switch (type) {
      case 'conversation.item.input_audio_transcription.completed': {
        const text = event.transcript as string;
        if (text?.trim()) {
          setTranscript((prev) => [
            ...prev,
            { role: 'user', text: text.trim(), id: `user-${Date.now()}` },
          ]);
        }
        break;
      }

      case 'response.audio_transcript.done': {
        const text = event.transcript as string;
        if (text?.trim()) {
          setTranscript((prev) => [
            ...prev,
            { role: 'assistant', text: text.trim(), id: `ai-${Date.now()}` },
          ]);
        }
        break;
      }

      case 'response.audio.started':
        setStatusText('AI is speaking...');
        break;

      case 'response.audio.done':
        setStatusText('Listening... speak anytime');
        break;

      case 'input_audio_buffer.speech_started':
        setStatusText('Hearing you...');
        break;

      case 'input_audio_buffer.speech_stopped':
        setStatusText('Processing...');
        break;

      case 'error': {
        const errorMsg = (event.error as Record<string, string>)?.message || 'Unknown error';
        console.error('Realtime API error:', errorMsg);
        setStatusText(`Error: ${errorMsg}`);
        break;
      }
    }
  }, []);

  // ── Disconnect ──────────────────────────────────────
  const disconnect = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    setWaveHeights(new Array(12).fill(4));

    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }

    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.srcObject = null;
      audioRef.current = null;
    }

    setState('idle');
    setStatusText('Tap the orb to start a conversation');
  }, []);

  // ── Toggle Mute ─────────────────────────────────────
  const toggleMute = useCallback(() => {
    if (streamRef.current) {
      const track = streamRef.current.getAudioTracks()[0];
      if (track) {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
        setStatusText(track.enabled ? 'Listening... speak anytime' : 'Microphone muted');
      }
    }
  }, []);

  // ── Orb Click ───────────────────────────────────────
  const handleOrbClick = useCallback(() => {
    if (state === 'idle' || state === 'error') {
      connect();
    }
  }, [state, connect]);

  return (
    <div className="voice-chat-page">
      {/* Back Button */}
      <button className="voice-back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      {/* Main Card */}
      <div className="voice-card">
        <h1 className="voice-title">UHA Voice Assistant</h1>
        <p className="voice-subtitle">Powered by OpenAI Realtime</p>

        {/* Orb */}
        <div className="voice-orb-container">
          <div
            className={`voice-orb-ring ${state === 'active' ? 'active' : state === 'connecting' ? 'connecting' : ''
              }`}
          />
          <div
            className={`voice-orb-inner ${state === 'active' ? 'active' : ''}`}
            onClick={handleOrbClick}
            role="button"
            tabIndex={0}
            aria-label={state === 'idle' ? 'Start voice chat' : 'Voice chat active'}
          >
            <span className="voice-orb-icon">
              {state === 'idle' && '🎙️'}
              {state === 'connecting' && '⏳'}
              {state === 'active' && '🎤'}
              {state === 'error' && '⚠️'}
            </span>
          </div>
        </div>

        {/* Waveform */}
        {state === 'active' && (
          <div className="voice-waveform">
            {waveHeights.map((h, i) => (
              <div
                key={i}
                className="voice-wave-bar"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        )}

        {/* Status */}
        <p className={`voice-status ${state}`}>{statusText}</p>

        {/* Controls */}
        {state === 'active' && (
          <div className="voice-controls">
            <button
              className={`voice-ctrl-btn ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              className="voice-ctrl-btn end-call"
              onClick={disconnect}
              title="End conversation"
            >
              ✕
            </button>
          </div>
        )}

        {/* Transcript */}
        {transcript.length > 0 && (
          <div className="voice-transcript">
            {transcript.map((entry) => (
              <div key={entry.id} className={`transcript-msg ${entry.role}`}>
                <div className="msg-role">
                  {entry.role === 'user' ? 'You' : 'AI'}
                </div>
                {entry.text}
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
