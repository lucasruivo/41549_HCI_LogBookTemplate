import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Corrigir os ícones do Leaflet (senão aparecem quadrados vazios)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[40.6405, -8.6538]} // UA
        zoom={16}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[40.6405, -8.6538]}>
          <Popup>
            Universidade de Aveiro – Aqui começa o teu mapa acessível!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}