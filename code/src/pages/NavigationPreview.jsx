import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
import 'leaflet/dist/leaflet.css';

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function NavigationPreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const destino = location.state?.destino;

  if (!destino) return <div>Destino não definido</div>;

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <span className="text-xl">⬅️</span>
        </button>
        <h1 className="text-lg font-semibold">Definir Destino</h1>
      </div>

      <MapContainer
        center={[destino.lat, destino.lng]}
        zoom={15}
        scrollWheelZoom
        style={{ height: '60vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[destino.lat, destino.lng]} />
        <RoutingMachine
          from={{ lat: 40.633129, lng: -8.658757 }}
          to={{ lat: destino.lat, lng: destino.lng }}
          showInstructions={false}
        />
      </MapContainer>

      <div className="mt-4">
        <p className="text-gray-700 font-medium">{destino.nome}</p>
        <p className="text-sm text-gray-500">{destino.morada}</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/gps', { state: { destino } })}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Iniciar Navegação
        </button>
        <button
          onClick={() => navigate('/map')}
          className="border px-6 py-3 rounded-lg"
        >
          Voltar ao mapa
        </button>
      </div>
    </div>
  );
}


