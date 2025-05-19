import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Seguranca() {
  const navigate = useNavigate();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [doisFatores, setDoisFatores] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (novaSenha !== confirmacao) {
      alert('A nova palavra-passe e a confirmação não coincidem.');
      return;
    }

    // Lógica fictícia de alteração de senha
    console.log('Palavra-passe alterada com sucesso!');
    alert('Palavra-passe alterada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Segurança</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Palavra-passe atual</label>
          <input
            type="password"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nova palavra-passe</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nova palavra-passe</label>
          <input
            type="password"
            value={confirmacao}
            onChange={(e) => setConfirmacao(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-medium"
        >
          Guardar alterações
        </button>
      </form>

      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Autenticação de dois fatores</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">Ativar 2FA por SMS ou app</span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={doisFatores}
              onChange={() => setDoisFatores(!doisFatores)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">
              {doisFatores ? 'Ativo' : 'Inativo'}
            </span>
          </label>
        </div>
        {doisFatores && (
          <p className="text-xs text-gray-500 mt-2">
            A autenticação de dois fatores está ativa. Receberás um código por SMS ou app sempre que iniciares sessão.
          </p>
        )}
      </div>
    </div>
  );
}
