'use client';

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ViewAllButtonProps {
  section: 'reservations' | 'properties' | 'tasks' | 'reviews';
}

export function ViewAllButton({ section }: ViewAllButtonProps) {
  const router = useRouter();

  const getTargetPage = () => {
    switch (section) {
      case 'reservations':
        return '/reservas';
      case 'properties':
        return '/propriedades';
      case 'tasks':
        return '/operacional';
      case 'reviews':
        return '/documentos';
      default:
        return '/';
    }
  };

  const handleClick = () => {
    router.push(getTargetPage());
  };

  return (
    <button 
      onClick={handleClick}
      className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-sm transition-colors"
      type="button"
    >
      Ver tudo
      <ArrowRight size={16} />
    </button>
  );
}