import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.post('/api/realtime/session', async (req, res) => {
  try {
    const {
      model = 'gpt-4o-realtime-preview',
      voice = 'alloy',
      instructions = 'You are a helpful, friendly AI assistant from Uha Labs. Keep responses concise and conversational.',
    } = req.body || {};

    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        voice,
        instructions,
        modalities: ['audio', 'text'],
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        input_audio_transcription: {
          model: 'gpt-4o-mini-transcribe',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI session error:', response.status, errorData);
      return res.status(response.status).json({
        error: 'Failed to create realtime session',
        details: errorData,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

// ── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🚀 UHA Labs Backend running on http://localhost:${PORT}`);
  console.log(`  📡 Realtime endpoint: POST /api/realtime/session\n`);
});
