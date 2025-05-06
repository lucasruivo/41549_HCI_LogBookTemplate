import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import './MapView.css';

// Corrigir os ícones do Leaflet
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

const locais = [
  { id: 0, nome: "Universidade de Aveiro", categoria: "localizacao", lat: 40.6405, lng: -8.6538 },
  { id: 1, nome: "PSP Aveiro", categoria: "instituicoes", lat: 40.6425, lng: -8.6545 },
  { id: 2, nome: "McDonald's Aveiro", categoria: "restauracao", lat: 40.6395, lng: -8.6555 },
  { id: 3, nome: "Parque Infante D. Pedro", categoria: "lazer", lat: 40.6370, lng: -8.6530 },
  { id: 4, nome: "Escola Secundária José Estêvão", categoria: "educacao", lat: 40.6432, lng: -8.6485 }
];

export default function MapView() {
  const [pesquisa, setPesquisa] = useState("");
  const [sugestoes, setSugestoes] = useState(locais);

  const handleMapType = () => console.log('Tipo de Mapa clicado');
  const requestRecenter = () => {
    window.dispatchEvent(new Event('recenter-map'));
  };

  const zoomToPin = (local) => {
    window.dispatchEvent(new CustomEvent('zoom-to-pin', { detail: local }));
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <SearchBar locais={locais} onSelect={zoomToPin} />

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
              <strong>{local.nome}</strong><br />
              Categoria: {local.categoria}
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="topright" />
        <RecenterControl />
      </MapContainer>

      <div className="map-control-panel">
        <button className="icon-button" onClick={handleMapType}>🗘️</button>
        <button className="icon-button" onClick={requestRecenter}>🎯</button>
      </div>

      <button
        className="map-button settings-button"
        onClick={() => console.log("Botão de Definições clicado")}
      >
        Definições
      </button>

      <button
        className="map-button account-button"
        onClick={() => console.log("Botão de Conta clicado")}
      >
        Conta
      </button>
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

function SearchBar({ locais, onSelect }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered = locais.filter(loc =>
    loc.nome.toLowerCase().startsWith(query.toLowerCase())
  );

  const handleSelect = (local) => {
    setQuery(local.nome);
    setShowSuggestions(false);
    onSelect(local);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Pesquisar..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />

      {showSuggestions && query && (
        <ul className="suggestions-list">
          {filtered.length > 0 ? (
            filtered.map(loc => (
              <li key={loc.id} onClick={() => handleSelect(loc)}>
                {loc.nome}
              </li>
            ))
          ) : (
            <li className="no-results">Nenhum resultado</li>
          )}
        </ul>
      )}
    </div>
  );
}


