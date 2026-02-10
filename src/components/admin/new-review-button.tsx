'use client';

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewReviewButton() {
  const [showModal, setShowModal] = useState(false);
  const [reviewType, setReviewType] = useState('property');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateReview = async () => {
    setIsLoading(true);
    try {
      // Simular criação de revisão
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Nova revisão de ${reviewType === 'property' ? 'propriedade' : 'documento'} criada com sucesso!`);
      setShowModal(false);
    } catch (error) {
      toast.error('Erro ao criar revisão');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <Plus size={18} />
        Nova Revisão
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Nova Revisão</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Revisão
                </label>
                <select 
                  value={reviewType}
                  onChange={(e) => setReviewType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="property">Propriedade</option>
                  <option value="document">Documento</option>
                  <option value="contract">Contrato</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prioridade
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Observações
                </label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  rows={3}
                  placeholder="Descreva o que precisa ser revisado..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateReview}
                className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Criando...' : 'Criar Revisão'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}