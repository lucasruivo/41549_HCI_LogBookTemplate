import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PlaceDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const local = location.state;

  if (!local) return <p className="text-center mt-10 text-gray-600">Local não encontrado.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f4f8]">
      {/* Imagem de topo */}
      <div className="h-64 w-full">
        <img
          src={local.imagem}
          alt={`Imagem de ${local.nome}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Cabeçalho */}
      <div className="flex items-center px-4 py-3 border-b border-indigo-200 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="text-xl text-indigo-500 mr-4">⬅️</button>
        <h1 className="text-2xl font-semibold text-gray-800">{local.nome}</h1>
      </div>

      {/* Informações do local */}
      <div className="flex-1 px-6 py-4 space-y-4">
        <div className="flex items-center text-gray-700">
          <span className="text-xl mr-2">📍</span>
          <span className="text-gray-800">{local.morada}</span>
        </div>

        <div className="flex items-center text-gray-700 gap-24">
          <div className="flex items-center">
            <span className="text-xl mr-2">🕒</span>
            <span className="text-gray-800">{local.distancia}</span>
          </div>
          <button className="text-indigo-600 font-medium flex items-center gap-1">
            <span className="text-xl leading-none">📝</span>
            <span className="underline">Reportar</span>
          </button>
        </div>

        <div className="flex items-center text-gray-700">
          <span className="text-xl mr-2">✅</span>
          <span className="text-green-600 font-medium">{local.estado}</span>
        </div>

        {/* Botão Ver no Mapa */}
        <div className="pt-4">
          <button
            className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-50 transition"
            onClick={() => navigate('/map', { state: { focus: local } })}
          >
            Ver no mapa
          </button>
        </div>
      </div>

      {/* Botão Definir como Destino */}
      <div className="fixed bottom-0 left-0 w-full bg-[#f5f4f8] px-6 pt-2 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] z-[1000]">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl text-lg font-semibold shadow-md">
          Definir como Destino
        </button>
      </div>
    </div>
  );
}