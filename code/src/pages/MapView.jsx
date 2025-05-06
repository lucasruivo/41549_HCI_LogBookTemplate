import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import './MapView.css';

// Corrigir os ícones do Leaflet (senão aparecem quadrados vazios)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function MapView() {
  // Eventos de clique (apenas para debug)
  const handleMapType = () => {
    console.log('Tipo de Mapa clicado');
  };

  // Dispara evento personalizado para recentrar
  const requestRecenter = () => {
    window.dispatchEvent(new Event('recenter-map'));
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
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

        <ZoomControl position="topright" />
        <RecenterControl />

        <Marker position={[40.6405, -8.6538]}>
          <Popup>
            Universidade de Aveiro – Aqui começa o teu mapa acessível!
          </Popup>
        </Marker>
      </MapContainer>

      {/* Botões adicionais flutuantes */}
      <div className="map-control-panel">
        <button className="icon-button" onClick={handleMapType}>🗺️</button>
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

// Componente invisível que escuta o evento e recentra
function RecenterControl() {
  const map = useMap();

  useEffect(() => {
    const recenter = () => {
      map.setView([40.6405, -8.6538], 16);
    };
    window.addEventListener('recenter-map', recenter);
    return () => window.removeEventListener('recenter-map', recenter);
  }, [map]);

  return null;
}
