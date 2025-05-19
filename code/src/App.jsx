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
import ChooseMode from './pages/ChooseMode';
import AjudaSuporte from './pages/AjudaSuporte';
import Preferencias from './pages/Preferencias';
import Seguranca from './pages/Seguranca';
import DadosUtilizador from './pages/DadosUtilizador';
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
        <Route path="/profile/preferencias" element={<Preferencias />} />
        <Route path="/profile/seguranca" element={<Seguranca />} />
        <Route path="/profile/dados" element={<DadosUtilizador />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/glossario" element={<Glossario />} />
        <Route path="/settings/ajudasuporte" element={<AjudaSuporte />} />
        <Route path="/reportar" element={<ReportarProblema />} />
        <Route path="/navegar" element={<NavigationPreview />} />
        <Route path="/choose-mode" element={<ChooseMode />} />
        <Route path="/gps" element={<GpsNavigation />} />
      </Routes>
    </Router>
  );
}