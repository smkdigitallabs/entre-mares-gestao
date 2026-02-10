import { 
  Plus, 
  Calendar,
  Sparkles,
  Lightbulb
} from "lucide-react";
import { getMarketingPosts, seedMarketingPosts } from "@/app/actions/marketing";
import { MarketingPostCard } from "@/components/admin/marketing-post-card";
import { MarketingFormDialog } from "@/components/admin/marketing-form-dialog";
import { ViewFullCalendarButton } from "@/components/admin/view-full-calendar-button";

export const dynamic = 'force-dynamic';

export default async function MarketingPage() {
  const { data: posts } = await getMarketingPosts();
  
  let displayPosts = posts;
  
  // Seeding inicial se não houver posts
  if (!posts || posts.length === 0) {
    await seedMarketingPosts();
    const res = await getMarketingPosts();
    displayPosts = res.data || [];
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Marketing & Divulgação</h1>
          <p className="text-slate-500 mt-1">Planejamento de conteúdo e presença digital do Entre Marés.</p>
        </div>
        <MarketingFormDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Diretrizes de Comunicação */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              Diretrizes de Tom de Voz
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 border">
                <p className="font-bold text-sm text-slate-900">O que ser:</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• Calmo e profissional</li>
                  <li>• Acolhedor e presente</li>
                  <li>• Claro e intencional</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border">
                <p className="font-bold text-sm text-slate-900">O que evitar:</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600">
                  <li>• Pressa ou ansiedade</li>
                  <li>• Informalidade excessiva</li>
                  <li>• Comunicação apelativa</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400 italic">
              * Baseado no Manual de Comunicação e Marketing Entre Marés.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="text-sky-500" size={20} />
              Ideias de Conteúdo
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {displayPosts?.map((post) => (
                <MarketingPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        {/* Calendário Simplificado */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Próximos Posts
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex flex-col items-center justify-center shrink-0 border border-white/10">
                  <span className="text-[10px] font-bold">JAN</span>
                  <span className="text-sm font-bold">28</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Bastidores: Limpeza</p>
                  <p className="text-xs text-white/60">Instagram Stories</p>
                </div>
              </div>
              <div className="flex gap-3 opacity-50">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex flex-col items-center justify-center shrink-0 border border-white/10">
                  <span className="text-[10px] font-bold">JAN</span>
                  <span className="text-sm font-bold">30</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Dica: Onde comer</p>
                  <p className="text-xs text-white/60">Feed Instagram</p>
                </div>
              </div>
            </div>
            <ViewFullCalendarButton />
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Métricas Rápidas</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Engajamento</span>
                  <span className="font-bold">4.2%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[42%] h-full bg-sky-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Alcance (30 dias)</span>
                  <span className="font-bold">1.2k</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-violet-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
