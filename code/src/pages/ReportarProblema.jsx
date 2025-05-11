import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ReportarProblema() {
  const navigate = useNavigate();
  const location = useLocation();
  const local = location.state?.local || {};

  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui podes enviar os dados para o backend ou mostrar um alerta
    alert('Problema enviado com sucesso!');
    navigate(-1);
  };

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold">Reportar problema</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-100 p-3 rounded">
          <label className="block text-sm font-medium">Edifício</label>
          <p className="text-gray-700">{local.nome || 'Local desconhecido'}</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Tipo</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecionar</option>
            <option value="acesso">Acessibilidade</option>
            <option value="informacao">Informação incorreta</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            rows="4"
            maxLength={400}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o problema que encontrou"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fotografia</label>
          <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
