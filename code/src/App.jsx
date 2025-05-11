import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MapView from './pages/MapView';
import Register from './pages/Register';
import Landing from './pages/Landing';
import PlaceDetails from './pages/PlaceDetails'; // 🔹 Importa aqui
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Glossario from './pages/Glossario';
import ReportarProblema from './pages/ReportarProblema';
import NavigationPreview from './pages/NavigationPreview';
import GpsNavigation from './pages/GpsNavigation';
import './App.css';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/place" element={<PlaceDetails />} /> {/* 🔹 Nova rota */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/preferencias" element={<div>Preferências</div>} />
        <Route path="/profile/seguranca" element={<div>Segurança</div>} />
        <Route path="/profile/dados" element={<div>Dados do utilizador</div>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/glossario" element={<Glossario />} />
        <Route path="/settings/ajuda" element={<div>Ajuda e suporte</div>} />
        <Route path="/reportar" element={<ReportarProblema />} />
        <Route path="/navegar" element={<NavigationPreview />} />
        <Route path="/gps" element={<GpsNavigation />} />
      </Routes>
    </Router>
  );
}