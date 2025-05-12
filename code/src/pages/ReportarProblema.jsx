import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ReportarProblema() {
  const navigate = useNavigate();
  const location = useLocation();
  const local = location.state?.local || {};

  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col relative">
      {/* Cabeçalho */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-indigo-600 hover:text-indigo-700">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Reportar problema</h1>
      </div>

      {/* Formulário rolável */}
      <div className="flex-1 overflow-y-auto mb-[calc(env(safe-area-inset-bottom)+3rem)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Edifício */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-600">Edifício</label>
            <p className="text-gray-700">{local.nome || 'Local desconhecido'}</p>
          </div>
          {/* Tipo */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-600">Tipo de problema</label>
            <select
              className="w-full border p-2 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            >
              <option value="">Selecionar</option>
              <option value="acesso">Acessibilidade</option>
              <option value="informacao">Informação incorreta</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          {/* Descrição */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-600">Descrição do problema</label>
            <textarea
              className="w-full border p-2 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              maxLength={400}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o problema que encontrou"
              required
            />
          </div>
          {/* Fotografia */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <label className="block text-sm font-medium text-gray-600">Fotografia (opcional)</label>
            <input
              type="file"
              onChange={(e) => setFoto(e.target.files[0])}
              className="w-full border p-2 rounded-lg mt-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </div>

      {/* Botão Enviar fixo */}
      <div className="fixed bottom-0 left-0 w-full bg-[#f5f4f8] px-6 pt-2 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] z-10">
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Enviar
        </button>
      </div>

      {/* Popup personalizado */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-lg animate-fade-in">
            <CheckCircle size={48} className="text-green-500 mb-2" />
            <p className="text-gray-800 font-medium">Problema reportado&nbsp;com sucesso!</p>
          </div>
        </div>
      )}
    </div>
  );
}