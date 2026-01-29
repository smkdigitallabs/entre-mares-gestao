"use client"

import { Instagram, MessageCircle, Trash2 } from "lucide-react"
import { deleteMarketingPost } from "@/app/actions/marketing"
import { useState } from "react"
import { toast } from "sonner"

interface MarketingPostProps {
  post: {
    id: string
    title: string
    platform: string
    contentPlan: string | null
    tone: string | null
    status: string
  }
}

export function MarketingPostCard({ post }: MarketingPostProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este planejamento?")) return

    setIsDeleting(true)
    try {
      const result = await deleteMarketingPost(post.id)
      if (result.success) {
        toast.success("Planejamento excluído com sucesso")
      } else {
        toast.error(result.error || "Erro ao excluir")
      }
    } catch (error) {
      toast.error("Erro ao excluir planejamento")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border p-5 hover:border-sky-200 transition-all group relative">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
         <button 
           onClick={handleDelete} 
           disabled={isDeleting}
           className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
           title="Excluir"
         >
           <Trash2 size={16} />
         </button>
      </div>

      <div className="flex justify-between items-start mb-3 pr-8">
        <div className="flex items-center gap-2">
          {post.platform.toLowerCase().includes('instagram') ? (
            <Instagram className="text-pink-500" size={18} />
          ) : (
            <MessageCircle className="text-emerald-500" size={18} />
          )}
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{post.platform}</span>
        </div>
        {post.tone && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-600 border border-sky-100">
            {post.tone}
          </span>
        )}
      </div>
      <h3 className="font-bold text-slate-900 mb-1">{post.title}</h3>
      <p className="text-sm text-slate-600 line-clamp-3 mb-4">
        {post.contentPlan}
      </p>
      
      <button className="text-sm font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
        Criar rascunho →
      </button>
    </div>
  )
}
