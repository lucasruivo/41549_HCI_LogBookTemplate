import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import L from 'leaflet';
import { Home, Flag } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Bolinha azul para “Tu estás aqui” (origem)
const userLocationIcon = new L.DivIcon({
  html: `<div style="
    width: 20px;
    height: 20px;
    background: rgba(30, 144, 255, 0.9);
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(30, 144, 255, 0.8);
  "></div>`,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Corrige ícones padrão do Leaflet (para o destino continuar a usar o padrão)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function GpsNavigation() {
  const location = useLocation();
  const destino = location.state?.destino;
  const navigate = useNavigate();
  const [firstInstruction, setFirstInstruction] = useState('');

  if (!destino) return <div className="p-4 text-center">Destino não definido</div>;

  return (
    <div className="relative w-full h-screen">
      {/* Mapa */}
      <MapContainer
        center={[destino.lat, destino.lng]}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* origem: só a bolinha azul */}
        <Marker
          position={[40.633129, -8.658757]}
          icon={userLocationIcon}
        />

        {/* destino: pin padrão */}
        <Marker position={[destino.lat, destino.lng]} />

        <RoutingMachine
          from={{ lat: 40.633129, lng: -8.658757 }}
          to={{ lat: destino.lat, lng: destino.lng }}
          showInstructions={true}
          onRoutesFound={(routes) => {
            const instr = routes[0]?.instructions?.[0]?.text || '';
            setFirstInstruction(instr);
          }}
        />

        <RecenterControl focus={[destino.lat, destino.lng]} />
      </MapContainer>

      {/* Botões topo */}
      <div className="absolute top-4 left-4 flex gap-2 z-[1000]">
        <button
          onClick={() => navigate('/map')}
          className="bg-white p-3 rounded-xl shadow-md"
        >
          <Home size={20} className="text-gray-700" />
        </button>
        <button
          onClick={() => navigate('/reportar', { state: { local: destino } })}
          className="bg-white p-3 rounded-xl shadow-md"
        >
          <Flag size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Primeira instrução em barra fixa */}
      {firstInstruction && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] inset-x-4 bg-white rounded-xl shadow-md py-3 px-5 z-[1000]">
          <p className="text-gray-800 text-base">{firstInstruction}</p>
        </div>
      )}
    </div>
  );
}

// Controla o flyTo suave quando muda o foco
function RecenterControl({ focus }) {
  const map = useMap();
  React.useEffect(() => {
    if (focus) {
      map.flyTo(focus, 16, { animate: true, duration: 1.2 });
    }
  }, [focus, map]);
  return null;
}