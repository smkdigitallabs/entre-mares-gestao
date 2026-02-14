export interface TutorialStep {
  title: string;
  description: string;
  targetId?: string; // ID do elemento para destaque
}

export interface PageTutorialData {
  title: string;
  steps: TutorialStep[];
}

export const TUTORIALS: Record<string, PageTutorialData> = {
  "/": {
    title: "Dashboard Principal",
    steps: [
      {
        title: "Visão Geral",
        description: "Aqui você tem um resumo rápido de tudo que está acontecendo no seu negócio, desde finanças até ocupação.",
        targetId: "dashboard-stats"
      },
      {
        title: "Indicadores Rápidos",
        description: "Os cartões no topo mostram os números mais importantes do mês atual em comparação ao anterior.",
        targetId: "stat-card-ganhos"
      },
      {
        title: "Próximas Reservas",
        description: "Acompanhe quem está chegando e quem está saindo nos próximos dias.",
        targetId: "next-reservations"
      }
    ]
  },
  "/financeiro": {
    title: "Gestão Financeira",
    steps: [
      {
        title: "Fluxo de Caixa",
        description: "Visualize todas as entradas (ganhos) e saídas (despesas). Use isso para manter o controle da saúde financeira do seu negócio.",
        targetId: "finance-list"
      },
      {
        title: "Lançamentos",
        description: "Registre novos ganhos de reservas ou despesas de manutenção. Cada lançamento ajuda a compor o lucro real do mês.",
        targetId: "new-transaction-btn"
      },
      {
        title: "Categorização",
        description: "Classifique gastos como 'Limpeza', 'Manutenção' ou 'Taxas' para entender para onde o dinheiro está indo.",
        targetId: "finance-filters"
      }
    ]
  },
  "/operacional": {
    title: "Operacional & Tempo",
    steps: [
      {
        title: "Gestão de Tarefas",
        description: "Acompanhe o que precisa ser feito hoje. Check-ins, limpezas e reparos aparecem aqui para que nada seja esquecido.",
        targetId: "task-list"
      },
      {
        title: "Check-in e Check-out",
        description: "Marque o status das tarefas conforme são concluídas para manter a operação sincronizada.",
        targetId: "task-status-toggle"
      },
      {
        title: "Calendário Semanal",
        description: "Planeje sua semana visualizando a carga de trabalho futura. Isso ajuda a antecipar contratações de diaristas ou técnicos.",
        targetId: "calendar-widget"
      }
    ]
  },
  "/marketing": {
    title: "Marketing & Divulgação",
    steps: [
      {
        title: "Estratégia de Conteúdo",
        description: "Planeje postagens para Instagram e WhatsApp. O sistema sugere tons de voz que combinam com a essência da Entre Marés.",
        targetId: "marketing-overview"
      },
      {
        title: "IA de Legendas",
        description: "Use o gerador de posts para criar legendas que encantam hóspedes e atraem proprietários, mantendo o padrão visual e de texto.",
        targetId: "new-post-btn"
      }
    ]
  },
  "/documentos": {
    title: "Central de Documentos",
    steps: [
      {
        title: "Biblioteca Viva",
        description: "Consulte manuais operacionais e diretrizes estratégicas. Tenha os padrões da empresa sempre à mão para consulta rápida.",
        targetId: "document-list"
      },
      {
        title: "Guia do Hóspede",
        description: "Baixe e envie modelos de guia para seus clientes, garantindo que eles tenham todas as informações da casa e da região.",
        targetId: "download-guide-btn"
      }
    ]
  },
  "/propriedades": {
    title: "Gestão de Propriedades",
    steps: [
      {
        title: "Portfólio de Imóveis",
        description: "Cadastre e visualize as casas que você gerencia. Cada imóvel tem suas próprias características e equipamentos listados.",
        targetId: "property-grid"
      },
      {
        title: "Detalhes e Checklists",
        description: "Clique em um imóvel para ver o inventário completo e gerar checklists de preparo personalizados via IA.",
        targetId: "property-card-link"
      }
    ]
  },
  "/base-conhecimento": {
    title: "Base de Conhecimento",
    steps: [
      {
        title: "Problemas e Soluções",
        description: "Um repositório de experiências. Quando algo quebrar ou houver um imprevisto, registre aqui como foi resolvido.",
        targetId: "knowledge-search"
      },
      {
        title: "Prevenção",
        description: "Consulte soluções antigas para resolver problemas atuais com rapidez, sem precisar incomodar o proprietário ou buscar do zero.",
        targetId: "knowledge-list"
      }
    ]
  },
  "/contatos": {
    title: "Contatos Estratégicos",
    steps: [
      {
        title: "Rede de Apoio",
        description: "Mantenha contatos de encanadores, eletricistas e técnicos de confiança organizados por especialidade.",
        targetId: "contacts-list"
      },
      {
        title: "Acesso Rápido",
        description: "Ligue ou envie um WhatsApp diretamente daqui em momentos de emergência durante uma estadia.",
        targetId: "contact-actions"
      }
    ]
  },
  "/melhorias": {
    title: "Evolução do Sistema",
    steps: [
      {
        title: "Sugestões e Falhas",
        description: "Sua linha direta com o desenvolvedor. Sugira novas telas, funções ou reporte erros encontrados no dia a dia.",
        targetId: "improvement-form"
      },
      {
        title: "Histórico de Evolução",
        description: "Acompanhe o que já foi implementado e em qual versão do sistema a sua sugestão foi atendida.",
        targetId: "improvements-list"
      }
    ]
  }
};
