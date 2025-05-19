import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DadosUtilizador() {
  const navigate = useNavigate();

  // Estado simulado (normalmente viria de uma API)
  const [nome, setNome] = useState('João Silva');
  const [email, setEmail] = useState('joao@example.com');
  const [telefone, setTelefone] = useState('912345678');
  const [nascimento, setNascimento] = useState('1995-01-01');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui estarias a enviar os dados para a API
    console.log({ nome, email, telefone, nascimento });
    alert('Dados atualizados com sucesso!');
  };

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Dados do utilizador</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full p-2 border rounded"
            pattern="[0-9]{9}"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded font-medium"
        >
          Guardar alterações
        </button>
      </form>
    </div>
  );
}
