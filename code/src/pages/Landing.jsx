import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Zona superior com fundo decorativo */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white z-0">
        <div className="w-full h-full bg-white bg-[linear(45deg,_#e0e0e0_25%,_transparent_25%,_transparent_75%,_#e0e0e0_75%)] bg-[length:40px_40px] opacity-30"></div>
      </div>

      {/* Linha horizontal */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black z-10" />

      {/* Círculo com L, centrado e por cima da linha */}
      <div className="z-20 bg-white px-4">
        <div className="w-32 h-32 rounded-full border-2 border-black flex items-center justify-center text-5xl font-bold bg-white z-20 relative">
          L
        </div>
      </div>

      {/* Título e botões */}
      <div className="z-20 mt-10 flex flex-col items-center gap-10">
        {/* Go Easy em caixa */}
        <div className="border border-black px-8 py-2">
          <h1 className="text-3xl font-medium">Go Easy</h1>
        </div>

        {/* Botões lado a lado */}
        <div className="flex gap-6">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-full border border-black text-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-6 py-2 rounded-full border border-black text-lg"
          >
            Registar
          </button>
        </div>
      </div>
    </div>
  );
}

