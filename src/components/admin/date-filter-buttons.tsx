'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function DateFilterButtons() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(searchParams.get('period') || 'today');

  const handleFilterChange = (period: string) => {
    setActiveFilter(period);
    const params = new URLSearchParams(searchParams.toString());
    params.set('period', period);
    router.push(`/operacional?${params.toString()}`);
  };

  const filters = [
    { key: 'today', label: 'Hoje' },
    { key: 'tomorrow', label: 'Amanhã' },
    { key: 'week', label: 'Esta Semana' }
  ];

  return (
    <div className="flex items-center gap-4 mb-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => handleFilterChange(filter.key)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            activeFilter === filter.key
              ? 'bg-slate-900 text-white'
              : 'bg-white border text-slate-500 hover:bg-slate-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}