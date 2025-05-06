import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet'
import './MapView.css';


// Corrigir os ícones do Leaflet (senão aparecem quadrados vazios)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MapView() {
  const handleRecenter = () => {
    console.log("Recentrar clicado");
  };
  
  const handleMapType = () => {
    console.log("Tipo de Mapa clicado");
  };
  
  const handleGlossario = () => {
    console.log("Glossário clicado");
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

        <div className="map-control-panel">
          <ZoomControl position="bottomleft" />
          <button className="map-sub-button" onClick={handleRecenter}>
            Recentrar
          </button>
          <button className="map-sub-button" onClick={handleMapType}>
            Tipo de Mapa
          </button>
          <button className="map-sub-button" onClick={handleGlossario}>
            Glossário
          </button>
        </div>

        <Marker position={[40.6405, -8.6538]}>
          <Popup>
            Universidade de Aveiro – Aqui começa o teu mapa acessível!
          </Popup>
        </Marker>
      </MapContainer>

      {/* Botão de Definições */}
      <button
        className="map-button settings-button"
        onClick={() => console.log("Botão de Definições clicado")}
      >
        Definições
      </button>

      {/* Botão de Conta */}
      <button
        className="map-button account-button"
        onClick={() => console.log("Botão de Conta clicado")}
      >
        Conta
      </button>
    </div>
  );
}

function RecenterButton() {
  const map = useMap();

  const handleRecenter = () => {
    map.setView([40.6405, -8.6538], 16); // Recentra com o mesmo zoom
  };

  return (
    <button
      className="map-button recenter-button"
      onClick={handleRecenter}
    >
      Recentrar
    </button>
  );
}




