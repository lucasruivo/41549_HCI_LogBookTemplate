import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      {/* Cabeçalho */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Perfil</h1>
      </div>

      {/* Opções */}
      <div className="space-y-3">
        <div
          onClick={() => navigate('/profile/preferencias')}
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium">Preferências</span>
          <ChevronRight size={20} />
        </div>

        <div
          onClick={() => navigate('/profile/seguranca')}
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium">Segurança</span>
          <ChevronRight size={20} />
        </div>

        <div
          onClick={() => navigate('/profile/dados')}
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium">Dados do utilizador</span>
          <ChevronRight size={20} />
        </div>

        <div
          onClick={() => alert('Sessão terminada.')} // podes substituir pelo teu logout real
          className="flex items-center justify-between bg-gray-200 px-4 py-3 rounded cursor-pointer hover:bg-gray-300"
        >
          <span className="font-medium text-red-600">Terminar sessão</span>
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}

