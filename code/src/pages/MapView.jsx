import { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import './MapView.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const icons = {
  localizacao: new L.Icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', iconSize: [32, 32] }),
  educacao: new L.Icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png', iconSize: [32, 32] }),
  instituicoes: new L.Icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', iconSize: [32, 32] }),
  lazer: new L.Icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', iconSize: [32, 32] }),
  restauracao: new L.Icon({ iconUrl: 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png', iconSize: [32, 32] }),
};

const localizacaoAtual = {
  nome: 'Tu estás aqui',
  lat: 40.633129,
  lng: -8.658757,
};

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

const locais = [
  {
    id: 0,
    nome: 'Centro de congressos de Aveiro',
    categoria: 'instituicoes',
    lat: 40.638364,
    lng: -8.643753,
    morada: 'Campus Universitário de Santiago, 3810-193 Aveiro',
    distancia: '0.0 km',
    estado: 'Aberto - 24 horas',
    imagem: 'https://api-assets.ua.pt/v1/image/resizer?imageUrl=https://www.ua.pt/contents%2Fimgs%2Fspaces%2Fespacos_campus_16.jpg&width=1200',
  },
  {
    id: 1,
    nome: 'Universidade de Aveiro',
    categoria: 'educacao',
    lat: 40.629540,
    lng:  -8.657072,
    morada: 'Campus Universitário de Santiago, 3810-193 Aveiro',
    distancia: '0.0 km',
    estado: 'Aberto - 24 horas',
    imagem: 'https://api-assets.ua.pt/v1/image/resizer?imageUrl=https://www.ua.pt/contents%2Fimgs%2Fspaces%2Fespacos_campus_16.jpg&width=1200',
  },
  {
    id: 2,
    nome: 'PSP Aveiro',
    categoria: 'instituicoes',
    lat: 40.638306,
    lng: -8.654087,
    morada: 'Rua da PSP, Aveiro',
    distancia: '0.3 km',
    estado: 'Aberto até às 20h',
    imagem: 'https://source.unsplash.com/800x400/?police,building',
  },
  {
    id: 3,
    nome: "McDonald's Aveiro",
    categoria: 'restauracao',
    lat: 40.631981,
    lng: -8.650743,
    morada: 'Av. Dr. Lourenço Peixinho, Aveiro',
    distancia: '0.5 km',
    estado: 'Aberto - até às 23h',
    imagem: 'https://source.unsplash.com/800x400/?mcdonalds,food',
  },
  {
    id: 4,
    nome: 'Parque Infante D. Pedro',
    categoria: 'lazer',
    lat: 40.636260,
    lng: -8.653355,
    morada: 'Rua do Parque, Aveiro',
    distancia: '0.7 km',
    estado: 'Aberto - até às 22h',
    imagem: 'https://source.unsplash.com/800x400/?park,nature',
  },
  {
    id: 5,
    nome: 'Escola Secundária José Estêvão',
    categoria: 'educacao',
    lat: 40.637574,
    lng: -8.648383,
    morada: 'Rua Dr. Mário Sacramento, Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://source.unsplash.com/800x400/?school,education',
  },
  {
    id: 6,
    nome: 'Escola C+S João Afonso de Aveiro',
    categoria: 'educacao',
    lat: 40.631987,
    lng: -8.653685,
    morada: 'Rua Dr. Mário Sacramento, Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://source.unsplash.com/800x400/?school,education',
  },
  {
    id: 7,
    nome: 'Clandestino by Salpoente',
    categoria: 'restauracao',
    lat: 40.639233,
    lng: -8.655999,
    morada: 'Rua Dr. Mário Sacramento, Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://source.unsplash.com/800x400/?school,education',
  },
  {
    id: 8,
    nome: 'Hospital Infante D. Pedro',
    categoria: 'instituicoes',
    lat: 40.635329,
    lng: -8.655085,
    morada: 'Rua Dr. Mário Sacramento, Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://source.unsplash.com/800x400/?school,education',
  },
  {
    id: 9,
    nome: 'Cais dos moliceiros',
    categoria: 'lazer',
    lat: 40.641328,
    lng: -8.655974,
    morada: 'Rua Dr. Mário Sacramento, Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://source.unsplash.com/800x400/?school,education',
  },
];

export default function MapView() {
  const [pesquisa, setPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState(locais);
  const [pesquisaAtiva, setPesquisaAtiva] = useState(false);
  const [centrarAnimacao, setCentrarAnimacao] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const requestRecenter = () => {
    window.dispatchEvent(new CustomEvent('zoom-to-pin', {
      detail: localizacaoAtual
    }));
    setCentrarAnimacao(true);
    setTimeout(() => setCentrarAnimacao(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setPesquisaAtiva(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const location = useLocation();

useEffect(() => {
  if (location.state?.focus) {
    const { lat, lng } = location.state.focus;
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('zoom-to-pin', {
        detail: { lat, lng }
      }));
    }, 300); // dá tempo ao mapa para montar
  }
}, [location.state]);

  return (
    <div className="relative w-full h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
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
        <Marker
          position={[localizacaoAtual.lat, localizacaoAtual.lng]}
          icon={userLocationIcon}
        >
          <Popup>Tu estás aqui</Popup>
        </Marker>
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

      {/* Botões laterais */}
      <button className="absolute top-4 left-4 z-[1000] bg-white shadow rounded-full p-3 text-2xl">⚙️</button>
      <button className="absolute top-4 right-4 z-[1000] bg-white shadow rounded-full p-3 text-2xl">👤</button>

      <div className="absolute top-40 right-[1.4rem] z-[1000] flex flex-col items-center gap-2">
        <button
          onClick={requestRecenter}
          className={`w-10 h-10 rounded-sm flex items-center justify-center text-base shadow transition-colors duration-200 ${centrarAnimacao ? 'bg-blue-100' : 'bg-white'}`}
        >
          🎯
        </button>
      </div>

      {pesquisaAtiva && (
        <div className="absolute inset-0 bg-black/40 z-[1000]" onClick={() => setPesquisaAtiva(false)} />
      )}

      {/* Barra de pesquisa animada */}
      <div
        ref={containerRef}
        className={`fixed w-[90%] max-w-xl left-1/2 -translate-x-1/2 z-[1000] transition-all duration-300 ease-in-out ${
          pesquisaAtiva ? 'top-4' : 'bottom-[calc(env(safe-area-inset-bottom)+1rem)]'
        }`}
      >
        <div className="flex items-center bg-white rounded-full shadow px-6 py-4">
          {pesquisaAtiva ? (
            <button
              onClick={() => setPesquisaAtiva(false)}
              className="mr-4 text-xl"
            >
              ⬅️
            </button>
          ) : (
            <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center font-bold text-xl mr-8">
              L
            </div>
          )}

          <input
            type="text"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            onFocus={() => setPesquisaAtiva(true)}
            placeholder="Pesquisar local..."
            className="flex-1 min-w-0 bg-transparent outline-none text-gray-800 text-lg"
          />
        </div>

        {/* Sugestões visíveis só quando a pesquisa estiver ativa */}
        {pesquisaAtiva && pesquisa && sugestoes.length > 0 && (
          <ul className="bg-white rounded-b-xl shadow divide-y max-h-[50vh] overflow-y-auto mt-1">
            {sugestoes
              .filter((loc) => loc.nome.toLowerCase().includes(pesquisa.toLowerCase()))
              .map((loc) => (
                <li
                  key={loc.id}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/place', { state: loc })}
                >
                  <span className="text-xl mr-4">📍</span>
                  <span className="flex-1">{loc.nome}</span>
                  <span className="text-pink-400 text-lg">♡</span>
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
      map.flyTo([40.6405, -8.6538], 16, {
        animate: true,
        duration: 1.5,
      });
    };

    const zoomToPin = (e) => {
      const loc = e.detail;
      map.flyTo([loc.lat, loc.lng], 18, {
        animate: true,
        duration: 1.5,
      });
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