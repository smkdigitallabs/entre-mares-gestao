'use client';

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function FilterButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (type === 'all') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    
    router.push(`/financeiro?${params.toString()}`);
    setIsOpen(false);
  };

  const currentFilter = searchParams.get('type') || 'all';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <Filter size={18} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-lg z-10">
          <div className="p-2">
            <button
              onClick={() => handleFilter('all')}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentFilter === 'all' 
                  ? 'bg-sky-50 text-sky-700' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              Todas as Transações
            </button>
            <button
              onClick={() => handleFilter('gain')}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentFilter === 'gain' 
                  ? 'bg-sky-50 text-sky-700' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              Apenas Ganhos
            </button>
            <button
              onClick={() => handleFilter('expense')}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentFilter === 'expense' 
                  ? 'bg-sky-50 text-sky-700' 
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              Apenas Despesas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}