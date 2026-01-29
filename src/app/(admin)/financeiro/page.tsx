import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Plus, 
  Filter, 
  Download,
  Search
} from "lucide-react";
import type { SVGProps } from "react";
import { formatCurrency } from "@/lib/utils";

const transactions = [
  { id: 1, date: "2026-01-25", description: "Reserva Casa Maré Alta - Silva", category: "Aluguel", amount: 2500.00, type: "gain" },
  { id: 2, date: "2026-01-24", description: "Limpeza Loft Central", category: "Limpeza", amount: -150.00, type: "expense" },
  { id: 3, date: "2026-01-23", description: "Venda Kit Conveniência (Vinho)", category: "Conveniência", amount: 85.00, type: "gain" },
  { id: 4, date: "2026-01-22", description: "Manutenção Ar Condicionado", category: "Manutenção", amount: -320.00, type: "expense" },
  { id: 5, date: "2026-01-21", description: "Comissão Gestão - Reserva #452", category: "Taxa", amount: 375.00, type: "gain" },
];

export default function FinanceiroPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Financeiro</h1>
          <p className="text-slate-500 mt-1">Mapeamento de ganhos e despesas do Entre Marés.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
            <Download size={18} />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
            <Plus size={18} />
            Nova Transação
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Saldo Total</p>
          <p className="text-2xl font-bold text-slate-900">{formatCurrency(12450.00)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <TrendingUp size={14} />
            +15% em relação ao mês passado
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Ganhos (Mês)</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(15200.00)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            Total bruto recebido
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-slate-500 font-medium mb-1">Despesas (Mês)</p>
          <p className="text-2xl font-bold text-rose-600">{formatCurrency(2750.00)}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            Limpeza, manutenção e taxas
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center gap-4 justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar transação..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter size={18} />
            </button>
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
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(t.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {t.type === 'gain' ? (
                        <ArrowUpCircle className="text-emerald-500 shrink-0" size={18} />
                      ) : (
                        <ArrowDownCircle className="text-rose-500 shrink-0" size={18} />
                      )}
                      <span className="text-sm font-medium text-slate-900">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-bold text-right ${t.type === 'gain' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'gain' ? '+' : ''} {formatCurrency(Math.abs(t.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type TrendingUpProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function TrendingUp({ size = 24, ...props }: TrendingUpProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
