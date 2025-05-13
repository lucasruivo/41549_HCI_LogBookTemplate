// src/pages/GpsNavigation.jsx
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import RoutingMachine from './RoutingMachine'
import L from 'leaflet'
import { Home, Flag } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import '../index.css'   // aqui está o .leaflet-routing-container { display: none !important; }


// Bolinha azul para “Tu estás aqui”
const userLocationIcon = new L.DivIcon({
  html: `<div style="
    width: 20px;
    height: 20px;
    background: rgba(30,144,255,0.9);
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(30,144,255,0.8);
  "></div>`,
  className: '',
  iconSize: [20,20],
  iconAnchor: [10,10],
})

// Corrige ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function GpsNavigation() {
  const { state } = useLocation()
  const destino = state?.destino
  const navigate = useNavigate()
  const [steps, setSteps] = useState([])
  const [idx, setIdx]     = useState(0)

  if (!destino) {
    return <div className="p-4 text-center">Destino não definido</div>
  }

  const prev = () => setIdx(i => Math.max(0, i-1))
  const next = () => setIdx(i => Math.min(steps.length-1, i+1))

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={[destino.lat, destino.lng]}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* origem: só bolinha azul */}
        <Marker
          position={[40.633129, -8.658757]}
          icon={userLocationIcon}
        />

        {/* destino: pin padrão */}
        <Marker position={[destino.lat, destino.lng]} />

        {/* traça a rota e dispara onRoutesFound */}
        <RoutingMachine
          from={{ lat: 40.633129, lng: -8.658757 }}
          to={destino}
          onRoutesFound={setSteps}
        />
      </MapContainer>

      {/* Botões topo */}
      <div className="absolute top-4 left-4 flex gap-2 z-[1000]">
        <button
          onClick={() => navigate('/map')}
          className="bg-white p-3 rounded-xl shadow-md"
        >
          <Home size={24} className="text-gray-700" />
        </button>
        <button
          onClick={() => navigate('/reportar', { state: { local: destino } })}
          className="bg-white p-3 rounded-xl shadow-md"
        >
          <Flag size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Painel de passos */}
      {steps.length > 0 && (
        <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] inset-x-4 bg-white rounded-xl shadow-md flex items-center justify-between px-4 py-3 z-[1000]">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="bg-indigo-100 p-3 rounded-lg disabled:opacity-50"
          >
            ←
          </button>
          <div className="flex-1 mx-4 text-center">
            <p className="text-gray-800 font-medium">{steps[idx].text}</p>
            <p className="text-sm text-gray-500">
              {(steps[idx].distance / 1000).toFixed(2)} km
            </p>
          </div>
          <button
            onClick={next}
            disabled={idx === steps.length - 1}
            className="bg-indigo-100 p-3 rounded-lg disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}