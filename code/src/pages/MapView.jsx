import { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import L from 'leaflet';
import './MapView.css';

// Corrigir ícones padrão
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
    morada: 'Cais da Fonte Nova, 3810-200 Aveiro',
    distancia: '2.0 km',
    estado: 'Aberto - 24 horas',
    imagem: 'https://www.cm-aveiro.pt/thumbs/cmaveiro/uploads/writer_file/image/608/img_5451_1_1024_2500.JPG',
  },
  {
    id: 1,
    nome: 'Universidade de Aveiro',
    categoria: 'educacao',
    lat: 40.629540,
    lng: -8.657072,
    morada: 'Universidade de Aveiro, Campus Universitário de Santiago, 3810-193 Aveiro',
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
    morada: 'Rua da PSP, 3810-240 Aveiro',
    distancia: '0.3 km',
    estado: 'Aberto até às 20h',
    imagem: 'https://www.on-centro.pt/media/k2/items/cache/b008cfd7267630f8e1706ab4918643a0_XL.jpg?t=20230921_110014',
  },
  {
    id: 3,
    nome: "McDonald's Aveiro",
    categoria: 'restauracao',
    lat: 40.631981,
    lng: -8.650743,
    morada: 'Av. Dr. Lourenço Peixinho, 3810-107 Aveiro',
    distancia: '0.5 km',
    estado: 'Aberto - até às 23h',
    imagem: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/6b/f5/4d/macdonalds.jpg?w=800&h=-1&s=1',
  },
  {
    id: 4,
    nome: 'Parque Infante D. Pedro',
    categoria: 'lazer',
    lat: 40.636260,
    lng: -8.653355,
    morada: 'Rua do Parque, 3810-195 Aveiro',
    distancia: '0.7 km',
    estado: 'Aberto - até às 22h',
    imagem: 'https://portugalwithkids.pt/wp-content/uploads/2023/03/0030F4C5-C4AE-49B7-ADB6-FB5EE0DE2FED.jpeg',
  },
  {
    id: 5,
    nome: 'Escola Secundária José Estêvão',
    categoria: 'educacao',
    lat: 40.637574,
    lng: -8.648383,
    morada: 'Rua Dr. Mário Sacramento, 3810-120 Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://www.noticiasdeaveiro.pt/wp-content/uploads/2019/05/5741dd3987ce7.png',
  },
  {
    id: 6,
    nome: 'Escola C+S João Afonso de Aveiro',
    categoria: 'educacao',
    lat: 40.631987,
    lng: -8.653685,
    morada: 'Rua Dr. Mário Sacramento, 3810-123 Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://c16cbe6d95.clvaw-cdnwnd.com/c127836b19f4d1d88acbc81a28cb669f/200000105-33df634d80/1-7.JPG?ph=c16cbe6d95',
  },
  {
    id: 7,
    nome: 'Clandestino by Salpoente',
    categoria: 'restauracao',
    lat: 40.639233,
    lng: -8.655999,
    morada: 'Rua Dr. Mário Sacramento, 3810-128 Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://res.cloudinary.com/tf-lab/image/upload/restaurant/c8592383-d06d-483d-8f20-2b1d9b6afbae/adc6e046-5f60-4ef4-a818-c69028e238d6.png',
  },
  {
    id: 8,
    nome: 'Hospital Infante D. Pedro',
    categoria: 'instituicoes',
    lat: 40.635329,
    lng: -8.655085,
    morada: 'Rua Dr. Mário Sacramento, 3810-123 Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://www.jb.pt/wp-content/uploads/2022/01/hospital-aveiro-1024x538.jpg',
  },
  {
    id: 9,
    nome: 'Cais dos moliceiros',
    categoria: 'lazer',
    lat: 40.641328,
    lng: -8.655974,
    morada: 'Rua Dr. Mário Sacramento, 3810-113 Aveiro',
    distancia: '0.8 km',
    estado: 'Aberto - até às 18h',
    imagem: 'https://cdn.turismoinaveiro.com/wp-content/uploads/passeio-moliceiro-aveiro-capa.jpg',
  },
];

export default function MapView() {
  const [pesquisa, setPesquisa] = useState('');
  const [sugestoes, setSugestoes] = useState(locais);
  const [pesquisaAtiva, setPesquisaAtiva] = useState(false);
  const [centrarAnimacao, setCentrarAnimacao] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

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

  useEffect(() => {
    if (location.state?.focus) {
      const { lat, lng } = location.state.focus;
      setLocalSelecionado(location.state.focus); 
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('zoom-to-pin', {
          detail: { lat, lng }
        }));
      }, 300); 
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
        />

        {locais.map((local) => (
          <Marker
            key={local.id}
            position={[local.lat, local.lng]}
            icon={icons[local.categoria] || icons.localizacao}
            eventHandlers={{
              click: () => {
                setLocalSelecionado(local);
                setPesquisaAtiva(false);
                window.dispatchEvent(new CustomEvent('zoom-to-pin', {
                  detail: { lat: local.lat, lng: local.lng }
                }));
              },
            }}
          />
        ))}

        <ZoomControl position="topright" />
        <RecenterControl />
      </MapContainer>

      <button 
        className="absolute top-4 left-4 z-[1000] bg-white shadow rounded-full p-3 text-2xl"
        onClick={handleSettingsClick}
      >
        ⚙️
      </button>~

      <button 
        className="absolute top-4 right-4 z-[1000] bg-white shadow rounded-full p-3 text-2xl"
        onClick={handleProfileClick}
      >
        👤
      </button>

      <div className="absolute top-40 right-[1.4rem] z-[1000] flex flex-col items-center gap-2">
        <button
          onClick={requestRecenter}
          className={`w-10 h-10 rounded-sm flex items-center justify-center text-base shadow transition-colors duration-200 ${centrarAnimacao ? 'bg-blue-100' : 'bg-white'}`}
        >
          🎯
        </button>
      </div>

      {!localSelecionado && (
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
      )}

      {localSelecionado && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-xl bg-white rounded-xl shadow-lg z-[1000] overflow-hidden">
          <div className="relative">
            <img
              src={localSelecionado.imagem}
              alt={`Imagem de ${localSelecionado.nome}`}
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => setLocalSelecionado(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-sm"
            >
              ✕
            </button>
          </div>
          <div
            className="px-4 py-3 cursor-pointer"
            onClick={() => {
              navigate('/place', { state: localSelecionado });
              setLocalSelecionado(null);
            }}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {localSelecionado.nome}
            </h3>
            <p className="text-sm text-gray-600">{localSelecionado.morada}</p>
            <p className="text-sm text-gray-600">{localSelecionado.distancia}</p>
          </div>
        </div>
      )}
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
      map.flyTo([loc.lat - 0.00055, loc.lng], 18, {
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
