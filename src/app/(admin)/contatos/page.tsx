import { getStrategicContacts, deleteStrategicContact } from "@/app/actions/knowledge"
import { Search, Plus, Phone, Mail, User } from "lucide-react"
import { PageTutorial } from "@/components/admin/page-tutorial"
import { DeleteButton } from "@/components/admin/delete-button"

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const search = searchParams.q || ""
  const { data: contacts } = await getStrategicContacts(search)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contatos Estratégicos</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-muted-foreground">
              Sua rede de apoio para emergências e manutenção.
            </p>
            <PageTutorial />
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Novo Contato
        </button>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <form>
            <input
              name="q"
              placeholder="Buscar por nome ou profissão..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={search}
            />
          </form>
        </div>
      </div>

      <div id="contacts-list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts?.map((contact) => (
          <div key={contact.id} className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-none tracking-tight">{contact.name}</h3>
                    <p className="text-sm font-medium text-primary mt-1">{contact.role}</p>
                  </div>
                </div>
                <DeleteButton 
                  id={contact.id} 
                  action={deleteStrategicContact} 
                  confirmMessage="Deseja excluir este contato?"
                />
              </div>
            </div>
            <div className="p-6 space-y-3">
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${contact.phone}`} className="hover:underline">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${contact.email}`} className="hover:underline">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.notes && (
                <p className="text-xs text-muted-foreground bg-muted p-2 rounded italic">
                  "{contact.notes}"
                </p>
              )}
            </div>
          </div>
        ))}

        {contacts?.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">Nenhum contato cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}
