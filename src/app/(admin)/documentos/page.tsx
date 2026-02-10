import { FileText, Download, ExternalLink, Search } from "lucide-react";
import { NewReviewButton } from "@/components/admin/new-review-button";
import { PageTutorial } from "@/components/admin/page-tutorial";

const documents = [
  {
    title: "Diretrizes Estratégicas Completas",
    description: "Documento-mãe institucional com essência, propósito e posicionamento da marca.",
    file: "Diretrizes_Estrategicas_Completas_Entre_Mares.pdf",
    category: "Estratégia"
  },
  {
    title: "Manual Operacional",
    description: "Padrões oficiais de check-in, checkout, limpeza e gestão de imprevistos.",
    file: "Manual_Operacional_Entre_Mares.pdf",
    category: "Operação"
  },
  {
    title: "Manual de Comunicação e Marketing",
    description: "Diretrizes de tom de voz, identidade visual e presença nas redes sociais.",
    file: "Manual_Comunicacao_e_Marketing_Entre_Mares.pdf",
    category: "Marketing"
  },
  {
    title: "Roadmap de Evolução Natural",
    description: "Planejamento de crescimento e próximos passos do negócio.",
    file: "Roadmap_Evolucao_Natural_Entre_Mares.pdf",
    category: "Estratégia"
  },
  {
    title: "Guia do Hóspede",
    description: "Modelo de guia para encantar e orientar os hóspedes durante a estadia.",
    file: "Guia_do_Hospede_Entre_Mares.pdf",
    category: "Experiência"
  },
  {
    title: "Apresentação para Proprietários",
    description: "Material comercial para captação de novos imóveis e parcerias.",
    file: "Apresentacao_Proprietarios_Entre_Mares.pdf",
    category: "Comercial"
  }
];

export default function DocumentosPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Biblioteca de Documentos</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-slate-500">Consulte as diretrizes e manuais oficiais do Entre Marés.</p>
            <PageTutorial />
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar documento..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm"
          />
        </div>
      </div>

      <div id="document-list" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.file} className="bg-white rounded-xl border p-6 flex flex-col h-full group hover:border-sky-200 hover:shadow-sm transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-sky-50 rounded-lg text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <FileText size={24} />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-500">
                {doc.category}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-slate-900 mb-2">{doc.title}</h3>
            <p className="text-sm text-slate-500 mb-6 flex-1">{doc.description}</p>
            
            <div className="flex items-center gap-3 pt-4 border-t">
              <a 
                href={`/documents/${doc.file}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <ExternalLink size={16} />
                Visualizar
              </a>
              <a 
                href={`/documents/${doc.file}`} 
                download 
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors" 
                title="Download PDF"
              >
                <Download size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center text-white shrink-0">
            <FileText size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-sky-900">Precisa atualizar algum documento?</h3>
            <p className="text-sky-800 mt-1">
              As diretrizes estratégicas devem ser revisadas a cada 6 meses para garantir que o negócio continue evoluindo conforme o planejado.
            </p>
          </div>
          <NewReviewButton />
        </div>
      </div>
    </div>
  );
}
