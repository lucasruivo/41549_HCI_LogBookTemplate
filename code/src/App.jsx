import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MapView from './pages/MapView';
import Register from './pages/Register';
import Landing from './pages/Landing';
import PlaceDetails from './pages/PlaceDetails'; // 🔹 Importa aqui

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/place" element={<PlaceDetails />} /> {/* 🔹 Nova rota */}
      </Routes>
    </Router>
  );
}