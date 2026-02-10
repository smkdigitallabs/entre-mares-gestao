export interface TutorialStep {
  title: string;
  description: string;
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
        description: "Aqui você tem um resumo rápido de tudo que está acontecendo no seu negócio, desde finanças até ocupação."
      },
      {
        title: "Indicadores Rápidos",
        description: "Os cartões no topo mostram os números mais importantes do mês atual em comparação ao anterior."
      },
      {
        title: "Próximas Reservas",
        description: "Acompanhe quem está chegando e quem está saindo nos próximos dias."
      }
    ]
  },
  "/financeiro": {
    title: "Gestão Financeira",
    steps: [
      {
        title: "Fluxo de Caixa",
        description: "Visualize todas as entradas (ganhos) e saídas (despesas) de forma clara e organizada."
      },
      {
        title: "Categorias",
        description: "As transações são categorizadas para que você saiba exatamente onde está gastando e de onde vem seu lucro."
      },
      {
        title: "Exportação",
        description: "Você pode baixar seus dados financeiros em formato CSV para usar em planilhas externas."
      }
    ]
  },
  "/operacional": {
    title: "Operacional & Tempo",
    steps: [
      {
        title: "Gestão de Tarefas",
        description: "Controle check-ins, check-outs, limpezas e manutenções em um só lugar."
      },
      {
        title: "Prioridades",
        description: "Cada tarefa tem um nível de urgência para ajudar você a focar no que é mais importante agora."
      },
      {
        title: "Calendário",
        description: "Visualize suas tarefas por dia, amanhã ou semana para planejar sua rotina."
      }
    ]
  },
  "/marketing": {
    title: "Marketing & Redes",
    steps: [
      {
        title: "Plano de Conteúdo",
        description: "Organize o que será postado em cada rede social para manter sua marca ativa."
      },
      {
        title: "Agendamento",
        description: "Planeje suas postagens com antecedência e defina o tom de voz ideal para cada plataforma."
      }
    ]
  },
  "/documentos": {
    title: "Central de Documentos",
    steps: [
      {
        title: "Arquivos Importantes",
        description: "Acesse rapidamente contratos, manuais e guias das propriedades."
      },
      {
        title: "Organização",
        description: "Mantenha toda a papelada digitalizada e segura, acessível de qualquer lugar."
      }
    ]
  },
  "/propriedades": {
    title: "Minhas Propriedades",
    steps: [
      {
        title: "Portfólio",
        description: "Veja a lista completa de imóveis sob sua gestão."
      },
      {
        title: "Detalhes do Imóvel",
        description: "Cada propriedade tem informações específicas de endereço e proprietário."
      }
    ]
  },
  "/melhorias": {
    title: "Sugestões de Melhoria",
    steps: [
      {
        title: "Evolução do Sistema",
        description: "Acompanhe o que está sendo desenvolvido e sugira novas funcionalidades."
      },
      {
        title: "Status",
        description: "Veja o que já foi concluído e o que está em progresso na nossa jornada v0.1.x."
      }
    ]
  }
};
