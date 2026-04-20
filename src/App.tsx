import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLandingPage from './Landingfiles/MainLandingPage'
import VoiceChat from './components/VoiceChat'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/voice" element={<VoiceChat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
