export const organogramaData = {
  founder: {
    id: "founder",
    title: "Founder",
    badge: "Visão & Estratégia",
    icon: "Crown",
    role: "Liderança Institucional e Visão de Futuro",
    description: "Guardião dos valores fundamentais, cultura e direcionamento estratégico de longo prazo do Grupo Coomarcas.",
    responsibilities: [
      "Definição da visão de futuro e posicionamento institucional.",
      "Garantia da preservação dos princípios e cultura corporativa.",
      "Apoio ao CEO e Conselho nas decisões de alta relevância estratégica."
    ]
  },
  ceo: {
    id: "ceo",
    title: "CEO (Chief Executive Officer)",
    badge: "Execução & Gestão",
    icon: "UserCheck",
    role: "Direção Geral e Integração Executiva",
    description: "Coordena a execução do plano de virada operacional, integra as 7 diretorias e se reporta ao Conselho de Administração.",
    responsibilities: [
      "Integração contínua de prioridades e alocação responsável de recursos.",
      "Cobrança rigorosa das entregas pactuadas com as diretorias executivas.",
      "Diálogo transparente e prestação de contas periódica ao Conselho de Administração."
    ]
  },
  conselho: {
    id: "conselho",
    title: "Conselho de Administração",
    badge: "Governança Corporativa",
    icon: "ShieldAlert",
    role: "Supervisão e Alinhamento Estratégico",
    description: "Órgão colegiado responsável pela fiscalização da governança, aprovação de diretrizes e validação das etapas da virada.",
    responsibilities: [
      "Supervisão da governança e sustentabilidade financeira do grupo.",
      "Aprovação formal dos marcos de expansão e abertura de novas BUs.",
      "Apoio consultivo às decisões de investimento e gestão de riscos corporativos."
    ]
  },
  columns: [
    {
      code: "CCO",
      title: "Governança e Conformidade",
      icon: "Scale",
      mission: "Assegurar conformidade jurídica, integridade regulatória e padrões rigorosos de qualidade em todas as 15 marcas.",
      nodes: [
        { name: "Jurídico", desc: "Segurança contratual, blindagem societária e consultoria preventiva para a operação." },
        { name: "Compliance", desc: "Definição e auditoria de políticas internas, regras de conduta e aderência regulatória." },
        { name: "Qualidade", desc: "Verificação amostral técnica, cumprimento de POPs e detecção ativa de não-conformidades." }
      ]
    },
    {
      code: "CXO",
      title: "Experiência e Soluções",
      icon: "Headphones",
      mission: "Acompanhar a jornada do cliente, detectar atritos precoces, exigir prazos das áreas e auditar a satisfação real.",
      nodes: [
        { name: "Suportes", desc: "Atendimento relacional de apoio à jornada, resolução ágil de dúvidas e acolhimento." },
        { name: "CS (Customer Success)", desc: "Governança da experiência, indicadores de NPS, saúde de carteira e contenção de churn." },
        { name: "Auditoria", desc: "Análise investigativa de causas-raiz, histórico de reclamações e eficácia corretiva." },
        { name: "Consultoria", desc: "Soluções de valor agregado para fidelização e apoio consultivo a clientes estratégicos." }
      ]
    },
    {
      code: "CRO",
      title: "Receita e Crescimento",
      icon: "TrendingUp",
      mission: "Construir demanda sustentável, posicionar as 15 marcas no mercado e negociar escopos contratuais realistas.",
      nodes: [
        { name: "Marketing & Posicionamento", desc: "Branding, campanhas por nicho, autoridade de marca e geração de leads qualificados." },
        { name: "Comercial", desc: "Vendas consultivas, qualificação de clientes e formalização transparente de contratos." },
        { name: "Parcerias & Alianças", desc: "Canais de indicação, ecossistemas setoriais e parcerias estratégicas de negócio." },
        { name: "Inteligência de Mercado", desc: "Pesquisa de concorrência, precificação estratégica e oportunidades de novos nichos." },
        { name: "Expansão", desc: "Abertura de novos mercados e capilaridade nacional das soluções do grupo." }
      ]
    },
    {
      code: "COO",
      title: "Operação e Entrega",
      icon: "Cog",
      mission: "Liderar a produção técnica das Business Units com donos nominais, prazos cumpridos e duplo aceite de qualidade.",
      nodes: [
        { name: "Business Units", desc: "Células multidisciplinares autônomas dedicadas a segmentos de mercado homologados." },
        { name: "Key Account", desc: "Gestora da conta na BU, guardiã dos compromissos e ponte direta com o cliente." },
        { name: "Atendimento", desc: "Triagem imediata, protocolo formal e retorno rápido a todas as solicitações." },
        { name: "DP (Pessoal)", desc: "Folhas de pagamento, encargos sociais, admissões e conformidade trabalhista eSocial." },
        { name: "Fiscal", desc: "Apuração tributária precisa, entrega de obrigações acessórias e fechamentos fiscais." },
        { name: "Contábil", desc: "Conciliação fidedigna, balancetes tempestivos e relatórios contábeis de suporte gerencial." }
      ]
    },
    {
      code: "CFO",
      title: "Saúde Financeira",
      icon: "Coins",
      mission: "Sustentar a disciplina orçamentária, planejamento de caixa, controle de custos e monitoramento de margem por BU.",
      nodes: [
        { name: "Financeiro", desc: "Fluxo de caixa, contas a pagar, faturamento e cobrança ativa de recebíveis." },
        { name: "Controladoria", desc: "Orçamento empresarial, relatórios de DRE por centro de resultado e auditoria de margens." },
        { name: "Compras", desc: "Negociação de suprimentos, gestão de contratos de fornecedores e controle de custos." }
      ]
    },
    {
      code: "CHRO",
      title: "Pessoas e Cultura",
      icon: "Users",
      mission: "Atrair, desenvolver e certificar talentos antes das expansões, promovendo liderança ativa e cultura de alta performance.",
      nodes: [
        { name: "R&S", desc: "Recrutamento técnico especializado, seleção por competências e onboarding cultural." },
        { name: "Desenvolvimento & Treinamento", desc: "Universidade Corporativa, trilhas de capacitação técnica e programas de liderança." },
        { name: "Cultura & Clima", desc: "Pesquisas de clima, alinhamento de valores e fortalecimento das relações interpessoais." },
        { name: "Performance & Carreira", desc: "Avaliações periódicas, PDI individual, planos de cargos e alçadas de promoção." },
        { name: "Comunicação Interna", desc: "Transparência corporativa, alinhamento de metas e engajamento da equipe." }
      ]
    },
    {
      code: "CTO",
      title: "Sistemas e Dados",
      icon: "Laptop",
      mission: "Garantir a integridade da infraestrutura, segurança da informação e a migração controlada e homologada para o Domínio.",
      nodes: [
        { name: "Tecnologia", desc: "Homologação de softwares, parametrização do Domínio e suporte aos sistemas corporativos." },
        { name: "Infraestrutura", desc: "Servidores, rede, segurança cibernética, backups em nuvem e suporte técnico aos usuários." }
      ]
    }
  ]
};
