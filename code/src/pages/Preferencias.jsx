import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Preferencias() {
  const navigate = useNavigate();
  const [tema, setTema] = useState('claro');
  const [idioma, setIdioma] = useState('pt');
  const [unidade, setUnidade] = useState('km');

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Preferências</h1>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
          <select
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="pt">Português</option>
            <option value="en">Inglês</option>
            <option value="es">Espanhol</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unidades de medida</label>
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="km">Quilómetros (km)</option>
            <option value="mi">Milhas (mi)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

