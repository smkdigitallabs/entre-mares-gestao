import { MapPin, User, Plus, Search, MoreVertical } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Casa Maré Alta",
    address: "Praia da Enseada, São Francisco do Sul",
    owner: "João Silva",
    status: "occupied",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Loft Central",
    address: "Centro Histórico, São Francisco do Sul",
    owner: "Maria Santos",
    status: "available",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Refúgio do Pescador",
    address: "Praia do Forte, São Francisco do Sul",
    owner: "Carlos Souza",
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400"
  }
];

export default function PropriedadesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Propriedades</h1>
          <p className="text-slate-500 mt-1">Gestão dos imóveis sob administração do Entre Marés.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
          <Plus size={18} />
          Nova Propriedade
        </button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-xl border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, endereço ou proprietário..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
        </div>
        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20">
          <option>Todos os Status</option>
          <option>Disponível</option>
          <option>Ocupado</option>
          <option>Manutenção</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white rounded-xl border overflow-hidden group hover:border-sky-200 transition-all">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={prop.image} 
                alt={prop.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  prop.status === 'occupied' ? 'bg-amber-500 text-white' : 
                  prop.status === 'available' ? 'bg-emerald-500 text-white' : 
                  'bg-slate-500 text-white'
                }`}>
                  {prop.status === 'occupied' ? 'Ocupado' : 
                   prop.status === 'available' ? 'Disponível' : 
                   'Manutenção'}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{prop.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                    <MapPin size={14} />
                    {prop.address}
                  </div>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="mt-6 flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                    <User size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Proprietário</p>
                    <p className="text-sm font-medium text-slate-700">{prop.owner}</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-sky-600 hover:text-sky-700">
                  Detalhes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
