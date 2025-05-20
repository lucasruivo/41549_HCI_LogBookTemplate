import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ChooseMode() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const local = state?.local

  // 0 = nenhum, 1 = a pé, 2 = transporte público, 3 = carro
  const [mode, setMode] = useState(0)

  if (!local) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Local não definido</div>
  }

  // Define valores diferentes por modo
  const tempoPorModo = {
    1: '3.1 km',  // a pé
    2: '4 km',   // bus
    3: '4.2 km',   // carro
  }

  const distanciaPorModo = {
    1: '15 min',
    2: '8 min',
    3: '5 min',
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f4f8]">
      {/* Imagem de topo */}
      <div className="h-64 w-full">
        <img
          src={local.imagem}
          alt={`Imagem de ${local.nome}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Cabeçalho */}
      <div className="flex items-center px-4 py-3 border-b border-indigo-200 bg-white shadow-sm">
        <button onClick={() => navigate(-1)} className="text-xl text-indigo-500 mr-4">
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">{local.nome}</h1>
      </div>

      {/* Escolha do modo */}
      <div className="flex-1 px-6 py-8">
        <p className="text-center text-gray-700 mb-6">Como vais deslocar-te?</p>

        <div className="flex justify-around mb-8">
          <div
            onClick={() => setMode(1)}
            className={`flex flex-col items-center cursor-pointer p-4 rounded-xl transition ${
              mode === 1 ? 'bg-indigo-100' : ''
            }`}
          >
            <span className="text-4xl">👨‍🦽</span>
            <span className="mt-2 text-gray-700">A pé</span>
          </div>

          <div
            onClick={() => setMode(2)}
            className={`flex flex-col items-center cursor-pointer p-4 rounded-xl transition ${
              mode === 2 ? 'bg-indigo-100' : ''
            }`}
          >
            <span className="text-4xl">🚌</span>
            <span className="mt-2 text-gray-700">Bus</span>
          </div>

          <div
            onClick={() => setMode(3)}
            className={`flex flex-col items-center cursor-pointer p-4 rounded-xl transition ${
              mode === 3 ? 'bg-indigo-100' : ''
            }`}
          >
            <span className="text-4xl">🚗</span>
            <span className="mt-2 text-gray-700">Carro</span>
          </div>
        </div>

        {/* Info fixa de distância/tempo */}
        {mode !== 0 && (
          <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+6rem)] left-0 w-full bg-[#f5f4f8] text-center px-6 z-[1000]">
            <p className="text-lg font-medium text-gray-800">{distanciaPorModo[mode]}</p>
            <p className="text-sm text-gray-600 mt-1">{tempoPorModo[mode]}</p>
          </div>
        )}
      </div>

      {/* Botão Confirmar */}
      <div
        className="fixed bottom-0 left-0 w-full bg-[#f5f4f8] px-6 pt-4 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] z-[1000]"
      >
        <button
          disabled={mode === 0}
          onClick={() =>
            navigate('/navegar', {
              state: { destino: local, mode }
            })
          }
          className={`w-full py-3 rounded-xl text-lg font-semibold shadow-md transition ${
            mode === 0
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {mode === 0
            ? 'Escolhe um modo'
            : mode === 1
            ? 'Caminhar para Destino'
            : mode === 2
            ? 'Ir de Bus'
            : 'Ir de Carro'}
        </button>
      </div>
    </div>
  )
}