
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
import { getTransactions, seedTransactions } from "@/app/actions/finance";
import { TransactionRow } from "@/components/admin/transaction-row";
import { TransactionFormDialog } from "@/components/admin/transaction-form-dialog";
import { SubmitButton } from "@/components/admin/submit-button";
import { SearchBar } from "@/components/admin/search-bar";

export const dynamic = "force-dynamic";

export default async function FinanceiroPage({ searchParams }: { searchParams: { type?: string, search?: string } }) {
  const { data: transactions } = await getTransactions(searchParams.type, searchParams.search);

  // Calcular totais baseados nos dados reais (ou mockados se vazio)
  const totalBalance = transactions?.reduce((acc, t) => {
    const amount = Number(t.amount);
    return t.type === 'gain' ? acc + amount : acc - amount; // Assumindo que expense vem positivo no DB e subtraímos aqui, ou vem negativo? No seed coloquei positivo.
    // No seed: expense amount = 150.00. Type = expense.
    // Então aqui subtrai.
  }, 0) || 0;

  const totalGains = transactions?.filter(t => t.type === 'gain').reduce((acc, t) => acc + Number(t.amount), 0) || 0;
  const totalExpenses = transactions?.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Financeiro</h1>
          <p className="text-slate-500 mt-1">Mapeamento de ganhos e despesas do Entre Marés.</p>
        </div>
        <div className="flex gap-3">
          <form action={async () => {
            'use server'
            await seedTransactions()
          }}>
             <SubmitButton className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
               Gerar Dados Teste
             </SubmitButton>
           </form>
          <ExportButton />
          <TransactionFormDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Saldo Total</p>
          <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>{formatCurrency(totalBalance)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <TrendingUp size={14} />
            +15% em relação ao mês passado
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Ganhos (Mês)</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalGains)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            Total bruto recebido
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Despesas (Mês)</p>
          <p className="text-2xl font-bold text-rose-600">{formatCurrency(totalExpenses)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            Limpeza, manutenção e taxas
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-4 justify-between bg-slate-50/50">
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
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions?.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))}
              {(!transactions || transactions.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    Nenhuma transação encontrada. Clique em "Gerar Dados Teste" acima.
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
