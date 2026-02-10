"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { HelpCircle, X, ChevronRight, ChevronLeft, Palmtree, Waves } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { TUTORIALS } from "@/constants/tutorials";
import { cn } from "@/lib/utils";

export function PageTutorial() {
  const pathname = usePathname();
  const tutorial = TUTORIALS[pathname];
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);

  const updateHighlight = useCallback(() => {
    if (!open || !tutorial) return;
    
    const step = tutorial.steps[currentStep];
    if (step.targetId) {
      const element = document.getElementById(step.targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightRect(element.getBoundingClientRect());
      } else {
        setHighlightRect(null);
      }
    } else {
      setHighlightRect(null);
    }
  }, [open, tutorial, currentStep]);

  useEffect(() => {
    if (open) {
      updateHighlight();
      window.addEventListener('resize', updateHighlight);
      window.addEventListener('scroll', updateHighlight);
    }
    return () => {
      window.removeEventListener('resize', updateHighlight);
      window.removeEventListener('scroll', updateHighlight);
    };
  }, [open, updateHighlight]);

  if (!tutorial) return null;

  const handleNext = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        setCurrentStep(0);
        setHighlightRect(null);
      }
    }}>
      <Dialog.Trigger asChild>
        <button 
          className="flex items-center gap-2 px-3 py-1.5 text-sky-700 hover:text-sky-900 bg-sky-50/50 hover:bg-sky-100/80 rounded-full transition-all duration-300 text-xs font-semibold border border-sky-200/50 hover:border-sky-300 group shadow-sm hover:shadow-md active:scale-95"
          title="Dicas de viagem (como funciona esta página)"
        >
          <Palmtree size={14} className="group-hover:rotate-12 transition-transform text-orange-400" />
          <span>Dicas da Praia</span>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        {/* Overlay com "buraco" de destaque (Spotlight) */}
        <div 
          className={cn(
            "fixed inset-0 z-[100] transition-opacity duration-500 pointer-events-none",
            open ? "opacity-100" : "opacity-0"
          )}
          style={{
            background: highlightRect 
              ? `radial-gradient(circle at ${highlightRect.left + highlightRect.width / 2}px ${highlightRect.top + highlightRect.height / 2}px, transparent ${Math.max(highlightRect.width, highlightRect.height) / 1.5}px, rgba(12, 74, 110, 0.7) ${Math.max(highlightRect.width, highlightRect.height)}px)`
              : 'rgba(12, 74, 110, 0.5)'
          }}
        />

        {/* Borda animada no destaque */}
        {highlightRect && (
          <div 
            className="fixed z-[101] border-4 border-orange-400 rounded-2xl shadow-[0_0_0_9999px_rgba(12,74,110,0.3)] transition-all duration-500 pointer-events-none animate-pulse"
            style={{
              left: highlightRect.left - 8,
              top: highlightRect.top - 8,
              width: highlightRect.width + 16,
              height: highlightRect.height + 16,
            }}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 whitespace-nowrap shadow-lg">
              <Waves size={10} /> Olhe aqui!
            </div>
          </div>
        )}

        <Dialog.Overlay className="fixed inset-0 bg-sky-950/20 backdrop-blur-[2px] z-[102] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <Dialog.Content 
          className={cn(
            "fixed left-[50%] top-[50%] z-[103] grid w-full max-w-sm translate-x-[-50%] translate-y-[-50%] gap-6 border-0 bg-gradient-to-br from-white via-white to-sky-50 p-0 shadow-2xl duration-500 rounded-3xl overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          )}
        >
          {/* Header Temático (Onda) */}
          <div className="relative h-24 bg-sky-500 flex items-end p-6">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" />
               <div className="absolute top-10 right-10 w-20 h-20 bg-orange-300 rounded-full blur-2xl" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-inner">
                <Palmtree size={24} />
              </div>
              <div className="text-white">
                <Dialog.Title className="text-xl font-black tracking-tight leading-none mb-1">
                  {tutorial.title}
                </Dialog.Title>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-100 opacity-80">
                  Passo {currentStep + 1} de {tutorial.steps.length} • Guia Entre Mares
                </p>
              </div>
            </div>
            <Dialog.Close className="absolute top-4 right-4 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white transition-all">
              <X size={16} />
            </Dialog.Close>
            
            {/* Onda SVG no fundo do header */}
            <svg className="absolute bottom-0 left-0 w-full h-8 text-white fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          <div className="px-8 pb-8 pt-2">
            <div className="min-h-[100px] flex flex-col justify-start">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-orange-400 rounded-full" />
                {tutorial.steps[currentStep].title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {tutorial.steps[currentStep].description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-1.5">
                {tutorial.steps.map((_, idx) => (
                  <div 
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      idx === currentStep ? "w-8 bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]" : "w-1.5 bg-sky-100"
                    )}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-sky-600 hover:bg-sky-50 rounded-xl transition-all active:scale-95"
                  >
                    <ChevronLeft size={16} />
                    Voltar
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-2xl text-xs font-bold hover:bg-sky-700 transition-all shadow-lg shadow-sky-200 active:scale-95 group"
                >
                  {currentStep === tutorial.steps.length - 1 ? "Pronto!" : "Próximo"}
                  {currentStep < tutorial.steps.length - 1 && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Decoração de Areia no Rodapé */}
          <div className="h-1.5 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
