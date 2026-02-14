"use client";

import { MapPin, User, Trash2, Loader2, ExternalLink } from "lucide-react";
import { deleteProperty } from "@/app/actions/properties";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface PropertyProps {
  id: string;
  name: string;
  address: string | null;
  ownerId: string | null;
}

export function PropertyCard({ property }: { property: PropertyProps }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/50 transition-all shadow-sm hover:shadow-md relative">
      <Link href={`/propriedades/${property.id}`} className="absolute inset-0 z-0" />
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={property.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-emerald-500 text-white">
            Disponível
          </span>
        </div>
      </div>
      
      <div className="p-5 relative z-10 pointer-events-none">
        <div className="flex justify-between items-start">
          <div className="pointer-events-auto">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
              {property.name}
              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-1">
              <MapPin size={14} />
              {property.address || "Endereço não informado"}
            </div>
          </div>
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors pointer-events-auto"
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
