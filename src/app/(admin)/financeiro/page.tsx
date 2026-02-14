
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Plus,
  Search,
  TrendingUp
} from "lucide-react";
import { ExportButton } from "@/components/admin/export-button";
import { FilterButton } from "@/components/admin/filter-button";
import { formatCurrency } from "@/lib/utils";
import { getTransactions } from "@/app/actions/finance";
import { TransactionRow } from "@/components/admin/transaction-row";
import { TransactionFormDialog } from "@/components/admin/transaction-form-dialog";
import { SubmitButton } from "@/components/admin/submit-button";
import { SearchBar } from "@/components/admin/search-bar";
import { PageTutorial } from "@/components/admin/page-tutorial";

export const dynamic = "force-dynamic";

export default async function FinanceiroPage({ searchParams }: { searchParams: { type?: string, search?: string } }) {
  const { data: transactions } = await getTransactions(searchParams.type, searchParams.search);

  // Calcular totais baseados nos dados reais (ou mockados se vazio)
  const totalBalance = transactions?.reduce((acc, t) => {
    const amount = Number(t.amount);
    return t.type === 'gain' ? acc + amount : acc - amount;
  }, 0) || 0;

  const totalGains = transactions?.filter(t => t.type === 'gain').reduce((acc, t) => acc + Number(t.amount), 0) || 0;
  const totalExpenses = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Financeiro</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-muted-foreground">Mapeamento de ganhos e despesas do Entre Marés.</p>
            <PageTutorial />
          </div>
        </div>
        <div className="flex gap-3">
          <ExportButton />
          <TransactionFormDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Saldo Total</p>
          <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-foreground' : 'text-rose-600'}`}>{formatCurrency(totalBalance)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <TrendingUp size={14} />
            +15% em relação ao mês passado
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Ganhos (Mês)</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalGains)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            Total bruto recebido
          </div>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-sm text-muted-foreground font-medium mb-1">Despesas (Mês)</p>
          <p className="text-2xl font-bold text-rose-600">{formatCurrency(totalExpenses)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            Limpeza, manutenção e taxas
          </div>
        </div>
      </div>

      <div id="finance-filters" className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div id="finance-list" className="p-4 border-b border-border flex flex-col md:flex-row md:items-center gap-4 justify-between bg-secondary/10">
          <div className="relative flex-1 max-w-md">
            <SearchBar placeholder="Buscar transação..." />
          </div>
          <div className="flex gap-2">
            <FilterButton />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/20 text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions?.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
              {(!transactions || transactions.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Nenhuma transação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
