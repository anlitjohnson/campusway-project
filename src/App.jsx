import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import CampusMap from './pages/CampusMap'
import Events from './pages/Events'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/map" element={<CampusMap />} />
      <Route path="/events" element={<Events />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App