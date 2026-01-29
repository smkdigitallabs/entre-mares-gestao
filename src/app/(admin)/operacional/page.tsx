
import { 
  Plus,
  ChevronLeft,
  ChevronRight,
  Baby
} from "lucide-react";
import { getTasks, seedTasks } from "@/app/actions/operational";
import { TaskItem } from "@/components/admin/task-item";
import { TaskFormDialog } from "@/components/admin/task-form-dialog";

export const dynamic = 'force-dynamic';

export default async function OperacionalPage() {
  const { data: tasks } = await getTasks();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Operacional & Tempo</h1>
          <p className="text-slate-500 mt-1">Gestão de rotina, tarefas e tempo pessoal.</p>
        </div>
        <div className="flex gap-3">
          <form action={async () => {
            'use server'
            await seedTasks()
          }}>
             <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
               Gerar Dados Teste
             </button>
           </form>
          <button className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-200 transition-colors">
            <Baby size={18} />
            Bloco Pessoal
          </button>
          <TaskFormDialog />
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
                    i + 1 === 29 
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
              <br/><br/>
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
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {(!tasks || tasks.length === 0) && (
              <div className="p-8 text-center text-slate-500 border rounded-xl bg-slate-50">
                Nenhuma tarefa encontrada. Use "Gerar Dados Teste" acima.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
