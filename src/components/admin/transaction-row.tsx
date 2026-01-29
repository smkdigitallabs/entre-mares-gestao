"use client";

import { Trash2 } from "lucide-react";
import { deleteTransaction } from "@/app/actions/finance";
import { useState } from "react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface TransactionRowProps {
  transaction: {
    id: string;
    date: Date;
    description: string | null;
    category: string;
    amount: any; // Decimal from Prisma comes as object or string depending on setup, usually requires formatting
    type: string;
  }
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta transação?")) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteTransaction(transaction.id);
      if (result.success) {
        toast.success("Transação excluída com sucesso");
      } else {
        toast.error("Erro ao excluir: " + result.error);
      }
    } catch (e) {
      toast.error("Erro desconhecido ao excluir");
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper to handle Decimal type if needed, but formatCurrency expects number. 
  // Prisma Decimal usually needs .toNumber() or Number()
  const amountValue = Number(transaction.amount);

  return (
    <tr className="hover:bg-slate-50 transition-colors group">
      <td className="px-6 py-4 text-sm text-slate-500">
        {new Date(transaction.date).toLocaleDateString('pt-BR')}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {transaction.type === 'gain' ? (
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
              <ArrowUpCircle size={16} />
            </div>
          ) : (
            <div className="p-2 bg-rose-100 text-rose-600 rounded-full">
              <ArrowDownCircle size={16} />
            </div>
          )}
          <span className="font-medium text-slate-700">{transaction.description}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
          {transaction.category}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-slate-700">
        <div className="flex items-center justify-end gap-4">
          <span className={transaction.type === 'gain' ? 'text-emerald-600' : 'text-rose-600'}>
            {transaction.type === 'expense' ? '-' : '+'} {formatCurrency(amountValue)}
          </span>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
            title="Excluir transação"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
