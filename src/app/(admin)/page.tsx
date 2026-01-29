import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle,
  Clock,
  CheckCircle2,
  Baby,
  Instagram,
  Lightbulb
} from "lucide-react";
import type { ReactNode, SVGProps } from "react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Bom dia! 👋</h1>
        <p className="text-slate-500 mt-1">Aqui está o que está acontecendo no Entre Marés hoje.</p>
      </div>

      {/* Resumo Financeiro e Ocupação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Ganhos do Mês" 
          value="R$ 12.450,00" 
          icon={<TrendingUp className="text-emerald-500" />} 
          trend="+12% vs mês anterior"
        />
        <StatCard 
          title="Próximos Check-ins" 
          value="4" 
          icon={<Calendar className="text-sky-500" />} 
          trend="Esta semana"
        />
        <StatCard 
          title="Taxa de Ocupação" 
          value="78%" 
          icon={<Users className="text-violet-500" />} 
          trend="+5% vs mês anterior"
        />
        <StatCard 
          title="Pendências" 
          value="2" 
          icon={<AlertCircle className="text-amber-500" />} 
          trend="Ações requeridas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <button className="text-sm text-sky-600 hover:underline">Ver tudo</button>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-6 space-y-4">
            <ChallengeItem 
              title="Vistoria Casa Maré Alta" 
              time="09:00 - 10:00" 
              category="Operacional"
              status="pending"
            />
            <ChallengeItem 
              title="Responder Consultas Airbnb" 
              time="10:30 - 11:00" 
              category="Marketing"
              status="completed"
            />
            <ChallengeItem 
              title="Tempo com a Pequena (Almoço & Soneca)" 
              time="12:00 - 14:00" 
              category="Pessoal"
              status="pending"
              isPersonal
            />
            <ChallengeItem 
              title="Organizar kits de boas-vindas" 
              time="14:30 - 15:30" 
              category="Operacional"
              status="pending"
            />
            <ChallengeItem 
              title="Brincadeira no Jardim" 
              time="17:00 - 18:00" 
              category="Pessoal"
              status="pending"
              isPersonal
            />
          </div>
        </div>

        {/* Marketing & Insights */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MegaphoneIcon className="text-amber-500" size={20} />
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
            <button className="mt-4 w-full bg-amber-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors shadow-sm">
              Planejar Agora
            </button>
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
};

type ChallengeItemProps = {
  title: string;
  time: string;
  category: string;
  status: "pending" | "completed";
  isPersonal?: boolean;
};

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex justify-between items-start">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <span className="text-xs font-medium text-slate-400">{trend}</span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ChallengeItem({ title, time, category, status, isPersonal }: ChallengeItemProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${isPersonal ? 'bg-rose-50 border-rose-100' : 'bg-slate-50'}`}>
      <div className="flex items-center gap-3">
        {status === 'completed' ? (
          <CheckCircle2 className="text-emerald-500" size={20} />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
        )}
        <div>
          <p className={`font-medium text-sm ${status === 'completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
            {title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-slate-500">{time}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white border text-slate-400">
              {category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type MegaphoneIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function MegaphoneIcon({ size = 24, ...props }: MegaphoneIconProps) {
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
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}
