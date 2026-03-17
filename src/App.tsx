import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLandingPage from './Landingfiles/MainLandingPage'
import ExcelProcessor from './Landingfiles/Analyser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/analyser" element={<ExcelProcessor />} /><Route path="/" element={<MainLandingPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
