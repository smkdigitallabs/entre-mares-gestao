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
        description: "Visualize todas as entradas (ganhos) e saídas (despesas) de forma clara e organizada.",
        targetId: "finance-list"
      },
      {
        title: "Categorias",
        description: "As transações são categorizadas para que você saiba exatamente onde está gastando e de onde vem seu lucro.",
        targetId: "finance-filters"
      }
    ]
  },
  "/operacional": {
    title: "Operacional & Tempo",
    steps: [
      {
        title: "Gestão de Tarefas",
        description: "Controle check-ins, check-outs, limpezas e manutenções em um só lugar.",
        targetId: "task-list"
      },
      {
        title: "Calendário",
        description: "Visualize suas tarefas por dia, amanhã ou semana para planejar sua rotina.",
        targetId: "calendar-widget"
      }
    ]
  },
  "/marketing": {
    title: "Marketing & Divulgação",
    steps: [
      {
        title: "Presença Digital",
        description: "Aqui você gerencia como sua marca é vista no Instagram e outras redes sociais.",
        targetId: "marketing-overview"
      }
    ]
  },
  "/documentos": {
    title: "Central de Documentos",
    steps: [
      {
        title: "Manuais e Guias",
        description: "Acesse todos os documentos oficiais, manuais operacionais e guias do hóspede.",
        targetId: "document-list"
      }
    ]
  },
  "/propriedades": {
    title: "Gestão de Propriedades",
    steps: [
      {
        title: "Seus Imóveis",
        description: "Visualize e gerencie todos os imóveis cadastrados sob sua administração.",
        targetId: "property-grid"
      }
    ]
  },
  "/melhorias": {
    title: "Evolução do Sistema",
    steps: [
      {
        title: "Sugestões e Falhas",
        description: "Envie suas ideias de melhoria ou reporte falhas diretamente para o desenvolvedor.",
        targetId: "improvement-form"
      }
    ]
  }
};
