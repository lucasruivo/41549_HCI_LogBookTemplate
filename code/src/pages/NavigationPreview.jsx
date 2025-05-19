// src/pages/NavigationPreview.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine';
import 'leaflet/dist/leaflet.css';

// Bolinha azul para “Tu estás aqui”
const blueDotIcon = new L.DivIcon({
  html: `<div style="
    width: 20px;
    height: 20px;
    background: rgba(30,144,255,0.9);
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(30,144,255,0.8);
  "></div>`,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Componente que ajusta bounds animado para caber rota inteira
function FitBounds({ origin, destination }) {
  const map = useMap();
  useEffect(() => {
    if (!origin || !destination) return;
    const bounds = L.latLngBounds(
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    );
    map.flyToBounds(bounds, {
      padding: [60, 60],
      animate: true,
      duration: 1.2,
    });
  }, [map, origin, destination]);
  return null;
}

export default function NavigationPreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const destino = state?.destino;
  const origem  = { lat: 40.633129, lng: -8.658757 };

  if (!destino) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Destino não definido
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center h-12 px-4 bg-white shadow-sm z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <span className="text-xl text-indigo-600">⬅️</span>
        </button>
        <h1 className="ml-4 text-2xl font-semibold text-gray-800">
          Definir Destino
        </h1>
      </header>

      {/* Mapa com 60% de altura */}
      <div className="h-[60vh] w-full">
        <MapContainer
          center={[destino.lat, destino.lng]}
          zoom={15}
          scrollWheelZoom
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* origem: bolinha azul */}
          <Marker position={[origem.lat, origem.lng]} icon={blueDotIcon} />

          {/* destino: pin padrão */}
          <Marker position={[destino.lat, destino.lng]} />

          {/* Traçado da rota */}
          <RoutingMachine from={origem} to={destino} showInstructions={false} />

          {/* Ajusta zoom/centro para cobertura total */}
          <FitBounds origin={origem} destination={destino} />
        </MapContainer>
      </div>

      {/* Info do local */}
      <div className="bg-white px-6 py-4 space-y-2 shadow-inner">
        <p className="text-lg font-medium text-gray-800">{destino.nome}</p>
        <p className="text-sm text-gray-600">{destino.morada}</p>
      </div>

      {/* Botões no rodapé */}
      <div
        className="flex gap-4 px-6 
                  pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4 bg-gray-50"
      >
        <button
          onClick={() => navigate('/gps', { state: { destino } })}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition"
        >
          Iniciar Navegação
        </button>
        <button
          onClick={() => navigate('/map')}
          className="flex-1 border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-50 transition"
        >
          Voltar ao Mapa
        </button>
      </div>
    </div>
  );
}