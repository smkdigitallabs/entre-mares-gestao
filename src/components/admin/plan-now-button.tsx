'use client';

import { Megaphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PlanNowButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Simular planejamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Post agendado com sucesso!");
      
      // Abrir Instagram ou ferramenta de agendamento
      setTimeout(() => {
        window.open('https://later.com', '_blank');
      }, 1000);
    } catch (error) {
      toast.error("Erro ao agendar post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-amber-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      type="button"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          Agendando...
        </>
      ) : (
        <>
          <Megaphone size={16} />
          Planejar Agora
        </>
      )}
    </button>
  );
}