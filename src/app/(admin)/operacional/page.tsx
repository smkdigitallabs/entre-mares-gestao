import { 
  CheckSquare, 
  Clock, 
  MapPin, 
  User, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Baby
} from "lucide-react";

const tasks = [
  { 
    id: 1, 
    title: "Check-in: Família Oliveira", 
    time: "14:00", 
    property: "Casa Maré Alta", 
    status: "pending",
    type: "checkin"
  },
  { 
    id: 2, 
    title: "Vistoria & Limpeza", 
    time: "10:00", 
    property: "Loft Central", 
    status: "completed",
    type: "cleaning"
  },
  { 
    id: 3, 
    title: "Reposição de Kit Conveniência", 
    time: "11:30", 
    property: "Casa Maré Alta", 
    status: "pending",
    type: "maintenance"
  },
  { 
    id: 4, 
    title: "Tempo com a Pequena (Passeio)", 
    time: "16:00", 
    property: "Pessoal", 
    status: "pending",
    type: "personal"
  }
];

export default function OperacionalPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Operacional & Tempo</h1>
          <p className="text-slate-500 mt-1">Gestão de rotina, tarefas e tempo pessoal.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors">
            <Baby size={18} />
            Bloco Pessoal
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
            <Plus size={18} />
            Nova Tarefa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Mini Calendário / Seletor de Data */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Janeiro 2026</h2>
              <div className="flex gap-1">
                <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={16} /></button>
                <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-bold">
              <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {[...Array(31)].map((_, i) => (
                <button 
                  key={i} 
                  className={`py-2 rounded-lg text-sm transition-all ${
                    i + 1 === 27 
                      ? 'bg-sky-500 text-white font-bold' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 rounded-xl border border-sky-100 p-6">
            <h3 className="font-bold text-sky-900 text-sm mb-3">Lembrete do Manual</h3>
            <p className="text-xs text-sky-800 leading-relaxed">
              &quot;Nada deve ser improvisado ou tratado com pressa.&quot; 
              Garanta que o imóvel esteja 100% pronto 1 hora antes do check-in previsto.
            </p>
          </div>
        </div>

        {/* Lista de Tarefas do Dia */}
        <div className="xl:col-span-3 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold">Hoje</button>
            <button className="px-4 py-1.5 rounded-full bg-white border text-slate-500 text-xs font-bold hover:bg-slate-50">Amanhã</button>
            <button className="px-4 py-1.5 rounded-full bg-white border text-slate-500 text-xs font-bold hover:bg-slate-50">Esta Semana</button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-all hover:border-slate-300 group ${
                  task.status === 'completed' ? 'opacity-60' : ''
                }`}
              >
                <button className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                  task.status === 'completed' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 group-hover:border-sky-500'
                }`}>
                  {task.status === 'completed' && <CheckSquare size={14} />}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-slate-900 ${task.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </h3>
                    {task.type === 'personal' && (
                      <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-wider">
                        Pessoal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={14} />
                      {task.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={14} />
                      {task.property}
                    </div>
                  </div>
                </div>

                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-500">
                    <User size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
