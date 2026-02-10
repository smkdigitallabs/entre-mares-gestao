'use client';

import { Download } from "lucide-react";
import { exportTransactionsToCSV } from "@/app/actions/finance";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ExportButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const result = await exportTransactionsToCSV();
      
      if (result.success && result.data) {
        // Criar blob e fazer download
        const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', result.filename || 'transacoes.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success("Transações exportadas com sucesso!");
      } else {
        toast.error(result.error || "Erro ao exportar transações");
      }
    } catch (error) {
      console.error("Erro ao exportar:", error);
      toast.error("Erro ao exportar transações");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isLoading}
      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Exportando...
        </>
      ) : (
        <>
          <Download size={18} />
          Exportar
        </>
      )}
    </button>
  );
}