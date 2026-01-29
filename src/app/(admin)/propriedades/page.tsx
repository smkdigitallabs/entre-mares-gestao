import { Plus, Search } from "lucide-react";
import { getProperties, seedProperties } from "@/app/actions/properties";
import { PropertyCard } from "@/components/admin/property-card";
import { PropertyFormDialog } from "@/components/admin/property-form-dialog";

export const dynamic = 'force-dynamic'; // Garantir que não faça cache estático

export default async function PropriedadesPage() {
  const { data: properties } = await getProperties();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Propriedades</h1>
          <p className="text-muted-foreground mt-1">Gestão dos imóveis sob administração do Entre Marés.</p>
        </div>
        <div className="flex gap-2">
          <form action={async () => {
            'use server'
            await seedProperties()
          }}>
             <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors border border-border">
               Gerar Dados Teste
             </button>
           </form>
          <PropertyFormDialog />
        </div>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, endereço ou proprietário..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
          />
        </div>
        <select className="bg-background border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground">
          <option>Todos os Status</option>
          <option>Disponível</option>
          <option>Ocupado</option>
          <option>Manutenção</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties?.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
        
        {(!properties || properties.length === 0) && (
           <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl bg-secondary/5">
             <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
               <Search className="text-muted-foreground" size={24} />
             </div>
             <h3 className="text-lg font-medium text-foreground">Nenhuma propriedade encontrada</h3>
             <p className="text-muted-foreground mt-1 max-w-sm">
               Você ainda não cadastrou nenhuma propriedade. Use o botão acima para gerar dados de teste ou cadastre uma nova.
             </p>
           </div>
        )}
      </div>
    </div>
  );
}
