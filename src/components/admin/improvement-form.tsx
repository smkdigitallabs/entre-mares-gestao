"use client";

import { useState } from "react";
import { Loader2, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { createImprovement } from "@/app/actions/improvements";

export function ImprovementForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      const result = await createImprovement(formData);
      if ((result as any)?.success) {
        toast.success("Sugestão enviada com sucesso!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error((result as any)?.error || "Erro ao enviar sugestão");
      }
    } catch (err) {
      toast.error("Erro inesperado ao enviar sugestão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Lightbulb size={18} />
          Nova melhoria
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Descreva de forma clara qual melhoria você gostaria de ver no sistema.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="text-xs font-medium text-foreground">
            Título da melhoria
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Ex: Relatório mensal em PDF"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="text-xs font-medium text-foreground">
            Detalhes (opcional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Explique o cenário, o objetivo e qualquer detalhe importante para implementar essa melhoria."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Enviando...
            </>
          ) : (
            "Enviar sugestão/melhoria"
          )}
        </button>
      </form>
    </div>
  );
}
