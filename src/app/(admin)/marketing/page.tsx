import { 
  Instagram, 
  MessageCircle, 
  Plus, 
  Calendar,
  Sparkles,
  Lightbulb
} from "lucide-react";

const contentIdeas = [
  {
    id: 1,
    title: "O Cuidado Silencioso",
    platform: "Instagram",
    description: "Mostrar detalhes da limpeza e organização antes do check-in. Foco no pilar 'Cuidado Constante'.",
    tone: "Calmo e Profissional"
  },
  {
    id: 2,
    title: "Dica de Praia: Prainha",
    platform: "Instagram/Status",
    description: "Sugerir a Prainha para famílias. Mencionar a tranquilidade e a segurança local.",
    tone: "Acolhedor e Informativo"
  },
  {
    id: 3,
    title: "Abertura de Datas: Carnaval",
    platform: "WhatsApp/Instagram",
    description: "Anunciar disponibilidade para o Carnaval com foco em 'Tranquilidade' (fugir do agito).",
    tone: "Presente e Claro"
  }
];

export default function MarketingPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Marketing & Divulgação</h1>
          <p className="text-slate-500 mt-1">Planejamento de conteúdo e presença digital do Entre Marés.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition-colors shadow-lg shadow-sky-600/20">
          <Plus size={18} />
          Novo Planejamento
        </button>
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
              {contentIdeas.map((idea) => (
                <div key={idea.id} className="bg-white rounded-xl border p-5 hover:border-sky-200 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {idea.platform === 'Instagram' ? (
                        <Instagram className="text-pink-500" size={18} />
                      ) : (
                        <MessageCircle className="text-emerald-500" size={18} />
                      )}
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{idea.platform}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-600 border border-sky-100">
                      {idea.tone}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{idea.title}</h3>
                  <p className="text-sm text-slate-500">{idea.description}</p>
                  <button className="mt-4 text-sm font-semibold text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Criar rascunho →
                  </button>
                </div>
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
            <button className="w-full mt-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors border border-white/10">
              Ver Calendário Completo
            </button>
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
