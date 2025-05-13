// src/pages/RoutingMachine.jsx
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet-routing-machine'

// bolinha azul para a origem
const blueDotIcon = new L.DivIcon({
  html: `<div style="
    width: 20px; height: 20px;
    background: rgba(30,144,255,0.9);
    border:3px solid white;
    border-radius:50%;
    box-shadow:0 0 8px rgba(30,144,255,0.8);
  "></div>`,
  className:'', iconSize:[20,20], iconAnchor:[10,10]
})

export default function RoutingMachine({ from, to, onRoutesFound = () => {} }) {
  const map = useMap()
  const controlRef = useRef(null)
  const polyRef    = useRef(null)

  useEffect(() => {
    // só cria o controle uma vez
    if (!controlRef.current) {
      controlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(from.lat, from.lng),
          L.latLng(to.lat, to.lng)
        ],
        lineOptions: { styles: [{ color:'red', weight:5 }] },
        createMarker: i => i === 0
          ? L.marker([from.lat, from.lng], { icon: blueDotIcon })
          : null,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        plan: null // remove painel interno
      }).addTo(map)

      controlRef.current.on('routesfound', e => {
        const route = e.routes[0]
        // limpa polyline antiga
        if (polyRef.current) {
          map.removeLayer(polyRef.current)
        }
        // desenha nova
        polyRef.current = L.polyline(
          route.coordinates.map(c => [c.lat, c.lng]),
          { color:'red', weight:5 }
        ).addTo(map)
        onRoutesFound(route.instructions || [])
      })
    }
    // apenas roda quando from ou to mudam
  }, [from.lat, from.lng, to.lat, to.lng, map, onRoutesFound])

  // limpa ao desmontar
  useEffect(() => {
    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current)
      }
      if (polyRef.current) {
        map.removeLayer(polyRef.current)
      }
    }
  }, [map])

  return null
}