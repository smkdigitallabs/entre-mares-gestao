import { getPropertyById } from "@/app/actions/properties"
import { deletePropertyChecklist } from "@/app/actions/knowledge"
import { notFound } from "next/navigation"
import { MapPin, User, Home, CheckSquare, Sparkles, AlertCircle, Plus } from "lucide-react"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: property, success } = await getPropertyById(params.id)

  if (!success || !property) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Home className="h-4 w-4" />
            <span>Propriedades</span>
            <span>/</span>
            <span className="text-foreground font-medium">{property.name}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{property.name}</h1>
          <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
            <MapPin size={16} />
            {property.address || "Endereço não informado"}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">Editar</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Nova Reserva</button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex gap-4 border-b mb-6">
          <button className="pb-2 border-b-2 border-primary font-medium">Visão Geral</button>
          <button className="pb-2 text-muted-foreground hover:text-foreground transition-colors">Checklists</button>
          <button className="pb-2 text-muted-foreground hover:text-foreground transition-colors">Histórico</button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 pb-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase">
                  Equipamentos e Comodidades
                </h3>
              </div>
              <div className="p-6 pt-2">
                {property.amenities ? (
                  <p className="text-sm whitespace-pre-wrap">{property.amenities}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground italic">
                    <AlertCircle className="h-8 w-8 mb-2 opacity-20" />
                    <p className="text-sm">Nenhum equipamento cadastrado.</p>
                    <button className="mt-2 text-primary hover:underline text-sm">Cadastrar agora</button>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-6 pb-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase">
                  Proprietário
                </h3>
              </div>
              <div className="p-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nome do Proprietário</p>
                    <p className="text-xs text-muted-foreground">ID: {property.ownerId || "Não vinculado"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Checklists de Preparo</h2>
              <div className="flex gap-2">
                <button className="flex items-center px-3 py-1.5 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                  <Plus className="mr-2 h-4 w-4" /> Manual
                </button>
                <button className="flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  <Sparkles className="mr-2 h-4 w-4" /> Gerar com IA
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {property.checklists?.length > 0 ? (
                property.checklists.map((checklist: any) => (
                  <div key={checklist.id} className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{checklist.title}</h3>
                      <div className="flex items-center gap-1">
                        {checklist.type === 'ai_generated' && <Sparkles className="h-4 w-4 text-purple-500 mr-1" />}
                        <DeleteButton 
                          id={checklist.id} 
                          action={(id) => deletePropertyChecklist(id, params.id)} 
                          confirmMessage="Deseja excluir este checklist?"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {checklist.type === 'ai_generated' ? 'Gerado por IA' : 'Manual'} • {new Date(checklist.createdAt).toLocaleDateString()}
                    </p>
                    <button className="w-full px-4 py-2 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">Ver Itens</button>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg">
                  <CheckSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <h3 className="text-lg font-medium">Nenhum checklist criado</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mt-1">
                    Crie checklists personalizados ou use nossa IA para gerar um com base nos equipamentos do imóvel.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
