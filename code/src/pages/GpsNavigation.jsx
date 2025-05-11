import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import { Home, Flag } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function GpsNavigation() {
  const location = useLocation();
  const destino = location.state?.destino;
  const navigate = useNavigate();

  if (!destino) return <div>Destino não definido</div>;

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapContainer
        center={[destino.lat, destino.lng]}
        zoom={15}
        scrollWheelZoom
        style={{ height: '90vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[destino.lat, destino.lng]} />
        <RoutingMachine from={{ lat: 40.633129, lng: -8.658757 }} to={{ lat: destino.lat, lng: destino.lng }} showInstructions={true} />
      </MapContainer>

      {/* Botões topo */}
      <div className="absolute top-4 left-4 flex gap-2 z-[999]">
        <button
          onClick={() => navigate('/map')}
          className="bg-white p-2 rounded shadow"
          title="Voltar ao mapa"
        >
          <Home size={20} />
        </button>
        <button
          onClick={() => navigate('/reportar', { state: { local: destino } })}
          className="bg-white p-2 rounded shadow"
          title="Reportar problema"
        >
          <Flag size={20} />
        </button>
      </div>
    </div>
  );
}

