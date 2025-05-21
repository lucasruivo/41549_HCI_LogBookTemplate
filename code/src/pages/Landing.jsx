import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-indigo-100 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Zona superior com fundo decorativo */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-indigo-100 z-0">
        <div className="w-full h-full bg-[linear(45deg,_#e0e0e0_25%,_transparent_25%,_transparent_75%,_#e0e0e0_75%)] bg-[length:40px_40px] opacity-30"></div>
      </div>

      {/* Círculo centrado entre o topo e a secção inferior */}
      <div className="z-20 mt-24 mb-10">
      <img
     src="/logo.jpeg"
     alt="Logo"
     className="w-48 h-48 rounded-full border-2 border-black object-cover bg-white"
    />
      </div>

      {/* Secção inferior (Go Easy + botões) */}
      <div className="z-20 mt-10 flex flex-col items-center gap-10">
        <div className="border border-black px-8 py-2 bg-white">
          <h1 className="text-3xl font-medium">Go Easy</h1>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-full border border-black text-lg bg-white hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 rounded-full border border-black text-lg bg-white hover:bg-gray-100 transition"
          >
            Registar
          </button>
        </div>
      </div>
    </div>
  );
}