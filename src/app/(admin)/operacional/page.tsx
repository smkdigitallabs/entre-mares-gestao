
import { Plus } from "lucide-react";
import { PersonalBlockButton } from "@/components/admin/personal-block-button";
import { Calendar } from "@/components/admin/calendar";
import { DateFilterButtons } from "@/components/admin/date-filter-buttons";
import { getTasks, seedTasks } from "@/app/actions/operational";
import { TaskItem } from "@/components/admin/task-item";
import { TaskFormDialog } from "@/components/admin/task-form-dialog";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageTutorial } from "@/components/admin/page-tutorial";

export const dynamic = "force-dynamic";

export default async function OperacionalPage({ searchParams }: { searchParams: { period?: string } }) {
  const { data: tasks } = await getTasks(searchParams.period);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Operacional & Tempo</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-muted-foreground">Gestão de rotina, tarefas e tempo pessoal.</p>
            <PageTutorial />
          </div>
        </div>
        <div className="flex gap-3">
          <form action={async () => {
            'use server'
            await seedTasks()
          }}>
             <SubmitButton className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
               Gerar Dados Teste
             </SubmitButton>
           </form>
          <PersonalBlockButton />
          <TaskFormDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Mini Calendário / Seletor de Data */}
        <div id="calendar-widget" className="xl:col-span-1 space-y-6">
          <Calendar />

          <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
            <h3 className="font-bold text-primary text-sm mb-3">Lembrete do Manual</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              &quot;Nada deve ser improvisado ou tratado com pressa.&quot; 
              <br/><br/>
              Garanta que o imóvel esteja 100% pronto 1 hora antes do check-in previsto.
            </p>
          </div>
        </div>

        {/* Lista de Tarefas do Dia */}
        <div id="task-list" className="xl:col-span-3 space-y-4">
          <DateFilterButtons />

          <div className="space-y-3">
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {(!tasks || tasks.length === 0) && (
              <div className="p-8 text-center text-muted-foreground border border-border rounded-xl bg-secondary/10">
                Nenhuma tarefa encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
