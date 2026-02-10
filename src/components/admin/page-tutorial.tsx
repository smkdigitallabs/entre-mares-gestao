"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { HelpCircle, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { TUTORIALS } from "@/constants/tutorials";
import { cn } from "@/lib/utils";

export function PageTutorial() {
  const pathname = usePathname();
  const tutorial = TUTORIALS[pathname];
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
      if (!val) setCurrentStep(0);
    }}>
      <Dialog.Trigger asChild>
        <button 
          className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200 text-xs font-medium border border-slate-200 hover:border-sky-200 group shadow-sm"
          title="Como funciona esta página?"
        >
          <HelpCircle size={14} className="group-hover:rotate-12 transition-transform" />
          <span>Dúvidas?</span>
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-6 border bg-white p-6 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600">
                <HelpCircle size={20} />
              </div>
              <div>
                <Dialog.Title className="text-lg font-bold text-slate-900">
                  {tutorial.title}
                </Dialog.Title>
                <p className="text-xs text-slate-500">Tutorial Rápido • Passo {currentStep + 1} de {tutorial.steps.length}</p>
              </div>
            </div>
            <Dialog.Close className="rounded-full p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="py-4 min-h-[120px] flex flex-col justify-center">
            <h3 className="text-base font-semibold text-slate-800 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {tutorial.steps[currentStep].title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed animate-in fade-in slide-in-from-bottom-3 duration-500">
              {tutorial.steps[currentStep].description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1.5">
              {tutorial.steps.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === currentStep ? "w-6 bg-sky-500" : "w-1.5 bg-slate-200"
                  )}
                />
              ))}
            </div>
            
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-1.5 bg-sky-600 text-white rounded-full text-sm font-medium hover:bg-sky-700 transition-colors shadow-md shadow-sky-600/20"
              >
                {currentStep === tutorial.steps.length - 1 ? "Entendi!" : "Próximo"}
                {currentStep < tutorial.steps.length - 1 && <ChevronRight size={16} />}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
