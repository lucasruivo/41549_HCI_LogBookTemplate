import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [supportType, setSupportType] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Lógica de registo
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-indigo-100 flex flex-col items-center px-6 pt-12">
      {/* Logótipo */}
      <div className="w-28 h-28 rounded-full border-2 border-black flex items-center justify-center text-4xl font-bold bg-white mb-10">
        L
      </div>

      {/* Formulário */}
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-center">Registo</h2>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Nome *</label>
          <input
            type="text"
            required
            className="border border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">E-mail</label>
          <input
            type="email"
            required
            className="border border-gray-300 rounded-md p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Palavra-passe *</label>
          <input
            type="password"
            required
            className="border border-gray-300 rounded-md p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Tipo de produto de apoio</label>
          <select
            required
            className="border border-gray-300 rounded-md p-2"
            value={supportType}
            onChange={(e) => setSupportType(e.target.value)}
          >
            <option value="">Selecionar...</option>
            <option value="Grau 2">Grau 2 (cadeira de rodas)</option>
            <option value="Grau 1">Grau 1 (canadianas / andarilho)</option>
            <option value="Grau 0">Grau 0 (sem necessidade de produto)</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded-full"
          >
            ←
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
          >
            Registar
          </button>
        </div>
      </form>
    </div>
  );
}

