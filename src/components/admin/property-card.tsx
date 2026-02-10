"use client";

import { MapPin, User, Trash2, Loader2 } from "lucide-react";
import { deleteProperty } from "@/app/actions/properties";
import { useState } from "react";
import { toast } from "sonner";

interface PropertyProps {
  id: string;
  name: string;
  address: string | null;
  ownerId: string | null;
}

export function PropertyCard({ property }: { property: PropertyProps }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta propriedade?")) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteProperty(property.id);
      if (result.success) {
        toast.success("Propriedade excluída com sucesso");
      } else {
        toast.error("Erro ao excluir: " + result.error);
      }
    } catch (e) {
      toast.error("Erro desconhecido ao excluir");
    } finally {
      setIsDeleting(false);
    }
  };

  // Imagem placeholder aleatória para dar variedade
  const images = [
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400"
  ];
  const image = images[property.name.length % images.length];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={property.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-emerald-500 text-white">
            Disponível
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-foreground">{property.name}</h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1">
              <MapPin size={14} />
              {property.address || "Endereço não informado"}
            </div>
          </div>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
            title="Excluir propriedade"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
          </button>
        </div>
        
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Proprietário</span>
          </div>
        </div>
      </div>
    </div>
  );
}
