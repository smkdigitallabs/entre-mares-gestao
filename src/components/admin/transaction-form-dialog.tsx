"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createTransaction } from "@/app/actions/finance";

export function TransactionFormDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const amountStr = formData.get("amount") as string;
    const amount = parseFloat(amountStr.replace("R$", "").replace(".", "").replace(",", "."));

    const data = {
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      type: formData.get("type") as string,
      amount: isNaN(amount) ? 0 : amount,
      date: new Date(formData.get("date") as string),
    };

    if (!data.description || !data.category || !data.type || !data.amount || !formData.get("date")) {
      toast.error("Preencha todos os campos obrigatórios");
      setLoading(false);
      return;
    }

    try {
      const result = await createTransaction(data);
      if (result.success) {
        toast.success("Transação criada com sucesso");
        setOpen(false);
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Erro ao criar transação");
      }
    } catch (error) {
      toast.error("Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
          <Plus size={18} />
          Nova Transação
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-slate-900">
              Nova Transação
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-500">
              Registre uma nova receita ou despesa financeira.
            </Dialog.Description>
          </div>
          
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium leading-none text-slate-700">
                Descrição
              </label>
              <input
                id="description"
                name="description"
                placeholder="Ex: Aluguel Janeiro"
                className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium leading-none text-slate-700">
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="gain">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="amount" className="text-sm font-medium leading-none text-slate-700">
                  Valor (R$)
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium leading-none text-slate-700">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="Aluguel">Aluguel</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Manutenção">Manutenção</option>
                  <option value="Conveniência">Conveniência</option>
                  <option value="Taxa">Taxa</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium leading-none text-slate-700">
                  Data
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-4">
              <Dialog.Close asChild>
                <button type="button" className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                  Cancelar
                </button>
              </Dialog.Close>
              <button 
                type="submit" 
                disabled={loading}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? "Salvando..." : "Salvar Transação"}
              </button>
            </div>
          </form>
          
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
