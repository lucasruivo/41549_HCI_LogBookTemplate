import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      {/* Cabeçalho com seta de voltar */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Definições</h1>
      </div>

      {/* Lista de opções */}
      <div className="space-y-3">
        <div
          onClick={() => navigate('/settings/glossario')}
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium">Glossário</span>
          <ChevronRight size={20} />
        </div>

        <div
          onClick={() => navigate('/settings/ajudasuporte')}
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium">Ajuda e suporte</span>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}
