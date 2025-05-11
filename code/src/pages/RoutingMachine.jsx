import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default function RoutingMachine({ from, to, showInstructions = true }) {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: (i, wp) => L.marker(wp.latLng),
      ...(showInstructions
        ? { show: true } // Mostra instruções
        : {
          show: false,
          plan: null, // REMOVE O PAINEL DE INSTRUÇÕES
          routeLine: (route, options) =>
            L.Routing.line(route, {
              ...options,
              styles: [{ color: 'red', weight: 5 }]
            }),
          })
    }).addTo(map);

    if (!showInstructions) {
      const instructionsPanel = document.querySelector('.leaflet-routing-container');
      if (instructionsPanel) {
        instructionsPanel.remove();
      }
    }


    return () => map.removeControl(routingControl);
  }, [map, from, to, showInstructions]);

  return null;
}




