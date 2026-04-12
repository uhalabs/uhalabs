import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLandingPage from './Landingfiles/MainLandingPage'
import BirthdayWish from './components/BirthdayWish'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/birthday" element={<BirthdayWish />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
