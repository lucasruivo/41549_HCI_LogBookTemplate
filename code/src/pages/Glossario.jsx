import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const glossario = [
  { cor: '🔵', descricao: 'Localização Atual (Universidade)' },
  { cor: '🟠', descricao: 'Educação (escolas, universidade)' },
  { cor: '🔴', descricao: 'Instituições (PSP, hospital)' },
  { cor: '🟢', descricao: 'Lazer (parques, moliceiros)' },
  { cor: '🟣', descricao: 'Restauração (restaurantes, cafés)' },
];

const botoesMapa = [
  { icone: '🎯', descricao: 'Recentrar no utilizador' },
  { icone: '➕', descricao: 'Aproximar o mapa (zoom in)' },
  { icone: '➖', descricao: 'Afastar o mapa (zoom out)' },
];

export default function Glossario() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Glossário de ícones</h1>
      </div>

      <h2 className="font-semibold text-gray-800 mb-2">Categorias no mapa:</h2>
      <ul className="space-y-3 mb-6">
        {glossario.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-gray-100 rounded px-4 py-3"
          >
            <span className="text-2xl">{item.cor}</span>
            <span className="text-gray-700 text-sm">{item.descricao}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-semibold text-gray-800 mb-2">Botões do mapa:</h2>
      <ul className="space-y-3">
        {botoesMapa.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-gray-100 rounded px-4 py-3"
          >
            <span className="text-2xl">{item.icone}</span>
            <span className="text-gray-700 text-sm">{item.descricao}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

