"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<{ success?: boolean; error?: string | null }>;
  confirmMessage?: string;
  successMessage?: string;
  className?: string;
}

export function DeleteButton({ 
  id, 
  action, 
  confirmMessage = "Deseja excluir este item?", 
  successMessage = "Item excluído com sucesso",
  className = ""
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(confirmMessage)) return;
    setIsDeleting(true);
    try {
      const result = await action(id);
      if (result.success) {
        toast.success(successMessage);
      } else {
        toast.error(result.error || "Erro ao excluir");
      }
    } catch (e) {
      toast.error("Erro desconhecido ao excluir");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all ${className}`}
      title="Excluir"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
