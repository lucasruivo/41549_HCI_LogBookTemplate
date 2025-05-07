import { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import './MapView.css';

// Corrigir os ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const icons = {
  localizacao: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    iconSize: [32, 32],
  }),
  educacao: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
    iconSize: [32, 32],
  }),
  instituicoes: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
    iconSize: [32, 32],
  }),
  lazer: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
    iconSize: [32, 32],
  }),
  restauracao: new L.Icon({
    iconUrl: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png',
    iconSize: [32, 32],
  }),
};

const locais = [
  {
    id: 0,
    nome: 'Universidade de Aveiro',
    categoria: 'localizacao',
    lat: 40.6405,
    lng: -8.6538,
  },
  {
    id: 1,
    nome: 'PSP Aveiro',
    categoria: 'instituicoes',
    lat: 40.6425,
    lng: -8.6545,
  },
  {
    id: 2,
    nome: "McDonald's Aveiro",
    categoria: 'restauracao',
    lat: 40.6395,
    lng: -8.6555,
  },
  {
    id: 3,
    nome: 'Parque Infante D. Pedro',
    categoria: 'lazer',
    lat: 40.637,
    lng: -8.653,
  },
  {
    id: 4,
    nome: 'Escola Secundária José Estêvão',
    categoria: 'educacao',
    lat: 40.6432,
    lng: -8.6485,
  },
];

export default function MapView() {
  const [pesquisa, setPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState(locais);

  const handleMapType = () => console.log('Tipo de Mapa clicado');
  const requestRecenter = () => window.dispatchEvent(new Event('recenter-map'));
  const zoomToPin = (local) => {
    window.dispatchEvent(new CustomEvent('zoom-to-pin', { detail: local }));
  };

  return (
    <div className="relative w-full h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      {/* Mapa com marcadores */}
      <MapContainer
        center={[40.6405, -8.6538]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locais.map((local) => (
          <Marker
            key={local.id}
            position={[local.lat, local.lng]}
            icon={icons[local.categoria] || icons.localizacao}
          >
            <Popup>
              <strong>{local.nome}</strong>
              <br />Categoria: {local.categoria}
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="topright" />
        <RecenterControl />
      </MapContainer>

      {/* Botão Definições */}
      <button className="map-button settings-button absolute top-4 left-4 z-[1000]">
        ⚙️
      </button>

      {/* Perfil e controlos verticais */}
      <div className="absolute top-40 right-4 z-[1000] flex flex-col items-center gap-2">
        <button className="map-button account-button">👤</button>
        <button className="icon-button" onClick={requestRecenter}>🎯</button>
      </div>

      {/* Barra de pesquisa */}
      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-[1000]">
        <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
          <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center font-bold text-sm mr-3">L</div>
          <input
            type="text"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            placeholder="Pesquisar local..."
            className="flex-1 bg-transparent outline-none text-gray-800"
          />
        </div>

        {pesquisa && sugestoes.length > 0 && (
          <ul className="suggestions-list">
            {sugestoes
              .filter((loc) =>
                loc.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((loc) => (
                <li key={loc.id} onClick={() => zoomToPin(loc)}>
                  {loc.nome}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function RecenterControl() {
  const map = useMap();

  useEffect(() => {
    const recenter = () => {
      map.setView([40.6405, -8.6538], 16);
    };

    const zoomToPin = (e) => {
      const loc = e.detail;
      map.setView([loc.lat, loc.lng], 18);
    };

    window.addEventListener('recenter-map', recenter);
    window.addEventListener('zoom-to-pin', zoomToPin);

    return () => {
      window.removeEventListener('recenter-map', recenter);
      window.removeEventListener('zoom-to-pin', zoomToPin);
    };
  }, [map]);

  return null;
}