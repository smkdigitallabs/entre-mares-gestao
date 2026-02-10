'use client';

import { Calendar } from "lucide-react";

export function ViewFullCalendarButton() {
  const handleClick = () => {
    // Abrir Google Calendar ou outro calendário externo
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
      type="button"
    >
      <Calendar size={18} />
      Ver Calendário Completo
    </button>
  );
}