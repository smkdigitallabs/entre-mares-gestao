import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Baby,
  Instagram,
  Lightbulb,
  Megaphone,
  ArrowRight
} from "lucide-react";
import type { ReactNode } from "react";
import { ViewAllButton } from "@/components/admin/view-all-button";
import { PlanNowButton } from "@/components/admin/plan-now-button";
import { getTransactions } from "@/app/actions/finance";
import { getTasks } from "@/app/actions/operational";
import { getOccupancyStats } from "@/app/actions/reservations";
import { PageTutorial } from "@/components/admin/page-tutorial";

export default async function Dashboard() {
  const [transactionsRes, tasksRes, occupancyRes] = await Promise.all([
    getTransactions(),
    getTasks('today'),
    getOccupancyStats()
  ]);

  const transactions = (transactionsRes.success && transactionsRes.data) ? transactionsRes.data : [];
  const tasks = (tasksRes.success && tasksRes.data) ? tasksRes.data : [];
  const occupancy = (occupancyRes.success && occupancyRes.data) ? occupancyRes.data : { totalReservations: 0, occupancyRate: 0 };

  // Calcular ganhos do mês atual
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const currentMonthGains = transactions
    .filter(t => new Date(t.date) >= startOfMonth && t.type === 'gain')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const pendingTasksCount = tasks.filter(t => t.status !== 'completed').length;

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Bom dia! 👋</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-muted-foreground">Aqui está o que está acontecendo no Entre Marés hoje.</p>
            <PageTutorial />
          </div>
        </div>
      </div>

      {/* Resumo Financeiro e Ocupação */}
      <div id="dashboard-stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          id="stat-card-ganhos"
          title="Ganhos do Mês" 
          value={`R$ ${currentMonthGains.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
          icon={<TrendingUp className="text-emerald-500" />} 
          trend="Dados Reais"
        />
        <StatCard 
          title="Próximos Check-ins" 
          value={occupancy.totalReservations.toString()} 
          icon={<Calendar className="text-sky-500" />} 
          trend="Este mês"
        />
        <StatCard 
          title="Taxa de Ocupação" 
          value={`${occupancy.occupancyRate}%`} 
          icon={<Users className="text-violet-500" />} 
          trend="Estimado"
        />
        <StatCard 
          title="Tarefas Hoje" 
          value={tasks.length.toString()} 
          icon={<AlertCircle className="text-amber-500" />} 
          trend={`${pendingTasksCount} pendentes`}
        />
      </div>

      <div id="next-reservations" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Desafios Diários (Time Management focus) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="text-sky-500" size={20} />
              Desafios Diários & Rotina
            </h2>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold rounded-full border border-rose-100 flex items-center gap-1">
                <Baby size={14} />
                Bloco Família Ativo
              </span>
              <ViewAllButton section="tasks" />
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 space-y-4 shadow-sm">
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <ChallengeItem 
                  key={task.id}
                  title={task.title} 
                  time={new Date(task.dueDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} 
                  category={task.property?.name || "Geral"}
                  status={task.status === 'completed' ? 'completed' : 'pending'}
                />
              ))
            ) : (
              <p className="text-slate-500 text-sm text-center py-4">Nenhuma tarefa para hoje.</p>
            )}
            
            <div className="pt-4 border-t border-dashed">
              <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-3">Rotina Pessoal (Exemplo)</p>
              <ChallengeItem 
                title="Tempo com a Pequena (Almoço & Soneca)" 
                time="12:00 - 14:00" 
                category="Pessoal"
                status="pending"
                isPersonal
              />
            </div>
          </div>
        </div>

        {/* Marketing & Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Megaphone className="text-amber-500" size={20} />
            Estratégia do Dia
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-amber-100 rounded-lg text-amber-600">
                <Instagram size={16} />
              </div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Instagram</span>
            </div>
            <p className="text-amber-900 font-medium">Post: &quot;O Cuidado que se sente&quot;</p>
            <p className="text-amber-800 text-sm mt-2">
              Mostre os lençóis impecáveis ou o aroma do ambiente. 
              Lembre-se: &quot;A Entre Marés não vende hospedagem, vende tranquilidade.&quot;
            </p>
            <PlanNowButton />
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6">
            <h3 className="text-sky-900 font-bold text-sm flex items-center gap-2">
              <Lightbulb className="text-sky-600" size={16} />
              Insight de Gestão
            </h3>
            <p className="text-sky-800 text-xs mt-2 leading-relaxed">
              Você tem 2 horas de &quot;Bloco Família&quot; hoje. Que tal usar 15 min para planejar as vistorias de amanhã e garantir uma tarde sem interrupções?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
  id?: string;
};

type ChallengeItemProps = {
  title: string;
  time: string;
  category: string;
  status: "pending" | "completed";
  isPersonal?: boolean;
};

function StatCard({ title, value, icon, trend, id }: StatCardProps) {
  return (
    <div id={id} className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-2">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-secondary/50 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-muted-foreground">{trend}</span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function ChallengeItem({ title, time, category, status, isPersonal }: ChallengeItemProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
      isPersonal 
        ? 'bg-rose-50/50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30' 
        : 'bg-secondary/20 border-border'
    }`}>
      <div className="flex items-center gap-3">
        {status === 'completed' ? (
          <CheckCircle2 className="text-emerald-500" size={20} />
        ) : (
          <div className={`w-5 h-5 rounded-full border-2 ${isPersonal ? 'border-rose-200' : 'border-slate-300'}`} />
        )}
        <div>
          <p className={`text-sm font-medium ${status === 'completed' ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{category}</span>
            <span className="text-[10px] text-muted-foreground">•</span>
            <span className="text-[10px] text-muted-foreground font-medium">{time}</span>
          </div>
        </div>
      </div>
      <ArrowRight className="text-muted-foreground/30" size={16} />
    </div>
  );
}


