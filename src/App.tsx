import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLandingPage from './Landingfiles/MainLandingPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
