'use client';

import { Baby } from "lucide-react";
import { useState } from "react";

export function PersonalBlockButton() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <button 
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <Baby size={18} />
        Bloco Pessoal
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Baby className="text-rose-600" size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Bloco Pessoal</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-rose-50 rounded-lg p-4">
                <h4 className="font-medium text-rose-900 mb-2">Tempo Família Hoje</h4>
                <div className="space-y-2 text-sm text-rose-800">
                  <div className="flex justify-between">
                    <span>Almoço com a pequena:</span>
                    <span className="font-medium">12:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Brincadeira no jardim:</span>
                    <span className="font-medium">17:00 - 18:00</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-sky-50 rounded-lg p-4">
                <h4 className="font-medium text-sky-900 mb-2">Próximas Atividades</h4>
                <ul className="text-sm text-sky-800 space-y-1">
                  <li>• Leitura das 19h (30 min)</li>
                  <li>• Banho e sono às 20h</li>
                  <li>• Tempo com esposa após 21h</li>
                </ul>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-sm text-emerald-800">
                  <strong>Lembrete:</strong> Nada deve ser improvisado ou tratado com pressa. 
                  O tempo de qualidade com a família é tão importante quanto o trabalho.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  // Abrir Google Calendar ou similar
                  window.open('https://calendar.google.com', '_blank');
                  setShowModal(false);
                }}
                className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors"
              >
                Ver Calendário
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}