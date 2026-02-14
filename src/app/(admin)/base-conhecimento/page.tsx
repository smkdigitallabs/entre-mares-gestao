import { getKnowledgeBase, deleteKnowledgeEntry } from "@/app/actions/knowledge"
import { Search, Plus, LifeBuoy } from "lucide-react"
import { PageTutorial } from "@/components/admin/page-tutorial"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function KnowledgeBasePage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const search = searchParams.q || ""
  const { data: entries } = await getKnowledgeBase(search)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Base de Conhecimento</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-muted-foreground">
              Problemas comuns e soluções para agilizar seu atendimento.
            </p>
            <PageTutorial />
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Novo Registro
        </button>
      </div>

      <div id="knowledge-search" className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <form>
            <input
              name="q"
              placeholder="Buscar problema ou solução..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={search}
            />
          </form>
        </div>
      </div>

      <div id="knowledge-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {entries?.map((entry) => (
          <div key={entry.id} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {entry.category || "Geral"}
                </span>
                <div className="flex items-center gap-1">
                  <LifeBuoy className="h-4 w-4 text-muted-foreground mr-1" />
                  <DeleteButton 
                    id={entry.id} 
                    action={deleteKnowledgeEntry} 
                    confirmMessage="Deseja excluir este registro da base de conhecimento?"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold leading-none tracking-tight line-clamp-2">{entry.problem}</h3>
            </div>
            <div className="p-6 pt-0 flex-1">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {entry.solution}
              </p>
            </div>
          </div>
        ))}
        
        {entries?.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Nenhum registro encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
