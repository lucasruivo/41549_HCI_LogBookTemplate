import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const faq = [
  {
    pergunta: 'Como posso alterar a minha palavra-passe?',
    resposta: 'Vai ao teu Perfil > Segurança e escolhe "Alterar palavra-passe".',
  },
  {
    pergunta: 'Porque é que não aparecem locais perto de mim?',
    resposta: 'Ativa o GPS e permite à aplicação aceder à tua localização.',
  },
  {
    pergunta: 'Como posso reportar um erro num local?',
    resposta: 'Na página do local, usa o botão "Reportar problema".',
  },
];

export default function AjudaSuporte() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-4 pt-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Ajuda e Suporte</h1>
      </div>

      <h2 className="font-semibold text-gray-800 mb-4">Perguntas Frequentes</h2>
      <ul className="space-y-4 mb-6">
        {faq.map((item, idx) => (
          <li key={idx} className="bg-gray-100 rounded px-4 py-3">
            <p className="text-sm font-semibold text-gray-700">{item.pergunta}</p>
            <p className="text-sm text-gray-600 mt-1">{item.resposta}</p>
          </li>
        ))}
      </ul>

      <h2 className="font-semibold text-gray-800 mb-2">Contacto</h2>
      <p className="text-sm text-gray-600">
        Se precisares de mais ajuda, envia um email para{' '}
        <a href="mailto:support@app.com" className="text-blue-600 underline">support@app.com</a>.
      </p>
    </div>
  );
}


