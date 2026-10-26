import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, Layers, Zap, Clock, Users, Database, Award } from 'lucide-react';
import OrganogramaInteractive from '../components/OrganogramaInteractive';
import Slide01Hero from './Slide01Hero';
import Slide02Transformacao from './Slide02Transformacao';
import Slide03Proposito from './Slide03Proposito';
import Slide04Principios from './Slide04Principios';
import Slide05Fronts from './Slide05Fronts';
import Slide07Marcas from './Slide07Marcas';
import Slide08Transicao from './Slide08Transicao';
import Slide09BU from './Slide09BU';
import ContentAccordion from '../components/ContentAccordion';

export default function SlideRenderer({ slide, index, totalSlides = 21, onGoToSlide, onRegisterNavigation }) {
  // 1. CAPA HERO (Slide 01)
  if (slide.id === 1) {
    return <Slide01Hero slide={slide} index={index} totalSlides={totalSlides} />;
  }

  // 1.1 SLIDE 02: NOSSA TRANSFORMAÇÃO (Lista Expandível Interativa)
  if (slide.id === 2) {
    return <Slide02Transformacao slide={slide} index={index} totalSlides={totalSlides} onRegisterNavigation={onRegisterNavigation} />;
  }

  // 2. SLIDE 03: PROPÓSITO DA MUDANÇA (Light Mode Statement)
  if (slide.id === 3) {
    return <Slide03Proposito slide={slide} onRegisterNavigation={onRegisterNavigation} />;
  }

  // 2.1 SLIDE 04: PRINCÍPIOS FUNDAMENTAIS
  if (slide.id === 4) {
    return <Slide04Principios slide={slide} onRegisterNavigation={onRegisterNavigation} />;
  }

  // 3. SLIDE 05: ORGANOGRAMA CORPORATIVO
  if (slide.isOrganograma) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-5 px-6 md:px-12 lg:px-16 bg-[#080b0f] text-[#f1f4f8] select-none">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10 shrink-0">
          <div className="flex flex-col items-center">
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-3 py-1 rounded-full text-[#d5dbe4] mb-1">
              {slide.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {slide.headline}
            </h2>
            <p className="text-xs sm:text-sm text-[#a3adb8] max-w-4xl">{slide.lead}</p>
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <OrganogramaInteractive />
        </div>
      </div>
    );
  }

  // 4. SLIDE 06: SETE FRENTES EXECUTIVAS
  if (slide.isFronts) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-4">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {slide.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">{slide.lead}</p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">03</span>
        </div>

        <div className="flex-1 min-h-0">
          <Slide05Fronts nextLabel={slide.nextLabel} />
        </div>
      </div>
    );
  }

  // 5. SLIDE 07: ECOSSISTEMA DE 15 MARCAS
  if (slide.id === 7) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {slide.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">{slide.lead}</p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">04</span>
        </div>

        <div className="flex-1 min-h-0">
          <Slide07Marcas onRegisterNavigation={onRegisterNavigation} />
        </div>
      </div>
    );
  }

  // 6. SLIDE 08: 05 / DUAS TRILHAS DE OPERAÇÃO
  if (slide.id === 8) {
    return <Slide08Transicao slide={slide} onRegisterNavigation={onRegisterNavigation} />;
  }

  // 7. SLIDE 09: 06 / ANATOMIA DE UMA BU
  if (slide.id === 9) {
    return <Slide09BU slide={slide} onRegisterNavigation={onRegisterNavigation} />;
  }

  // 8. SLIDE 10: 07 / A JORNADA DO CLIENTE
  if (slide.id === 10) {
    const steps = [
      { num: "01", title: "Venda", desc: "Comercial qualifica, contrata e formaliza o escopo.", Icon: Layers },
      { num: "02", title: "Passagem", desc: "Comercial transfere dossiê completo ao Onboarding.", Icon: ArrowRight },
      { num: "03", title: "Implantação", desc: "Onboarding cadastra, parametriza e alinha rotinas.", Icon: Database },
      { num: "04", title: "Aceite BU", desc: "KA e líderes técnicos conferem base e assinam aceite.", Icon: CheckCircle2 },
      { num: "05", title: "Estabilização", desc: "Primeiros 90 dias com acompanhamento conjunto BU + CS.", Icon: Clock },
      { num: "06", title: "Carteira", desc: "Rotina contínua com KA e Suporte Relacional.", Icon: Users },
      { num: "07", title: "Evolução", desc: "Identificação de novas necessidades e cross-sell.", Icon: Sparkles },
      { num: "08", title: "Retenção", desc: "Tratamento de atritos, comitê de retenção ou offboarding.", Icon: ShieldCheck },
    ];

    return (
      <div className="w-full h-full flex flex-col py-10 px-8 sm:px-14 lg:px-24 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <header className="w-full max-w-6xl mx-auto shrink-0">
          <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-white/65 mb-4">
            {slide.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.02] text-white">
              A jornada é única. Os responsáveis mudam.
          </h2>
          <p className="max-w-6xl mt-4 text-white/68">
            Do primeiro contato à retenção contínua, cada transição entre equipes exige clareza de escopo, registro documental e aceite expresso.
          </p>
        </header>

        <div className="w-full max-w-6xl mx-auto flex-1 min-h-0 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 content-center py-7">
          {steps.map((st) => {
            const Icon = st.Icon;
            return (
            <article key={st.num} className="relative min-h-[10.5rem] p-5 sm:p-6 bg-white/[0.035] border border-white/15 hover:border-white/28 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-xl font-black font-mono text-white/40 block mb-3">{st.num}</span>
                <h4 className="text-xl font-semibold tracking-tight leading-tight text-white">{st.title}</h4>
              </div>
              <Icon className="absolute right-5 top-5 w-4 h-4 text-white/46" strokeWidth={1.65} aria-hidden="true" />
              <p className="text-[.96rem] text-white/68 leading-snug mt-5">{st.desc}</p>
            </article>
            );
          })}
        </div>

        <footer className="w-full max-w-6xl mx-auto shrink-0 flex items-start gap-4 pt-1 text-[#d5dbe4]">
          <span className="shrink-0 font-bold text-xs uppercase tracking-[.14em] text-white/60">GOVERNANÇA</span>
          <span className="text-sm sm:text-base leading-snug text-white/76">Nenhum cliente é considerado transferido até que a área receptora confirme o recebimento formal e valide os cadastros e dados.</span>
        </footer>
      </div>
    );
  }

  // 9. SLIDE 11: REGRA DE OURO DA TRANSIÇÃO (Light Mode Accent ⚡)
  if (slide.id === 11) {
    return (
      <div className="w-full h-full flex flex-col px-8 sm:px-14 lg:px-24 pt-16 sm:pt-20 pb-14 sm:pb-16 bg-[#f8f9fa] text-[#0a0d12] select-none">
        <header className="w-full max-w-7xl mx-auto shrink-0">
          <span className="slide-standard-tag text-sm font-bold tracking-[.14em] uppercase text-black/60 mb-4">
            {slide.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.02] text-[#0a0d12]">
            A regra que protege a entrega e o cliente.
          </h2>
        </header>

        <div className="w-full max-w-7xl mx-auto flex-1 min-h-0 flex flex-col justify-center py-8 sm:py-10">
          <blockquote className="max-w-6xl text-2xl sm:text-3xl lg:text-[2.55rem] font-normal tracking-tight text-[#0a0d12] leading-[1.08]">
            “Ninguém transfere um cliente ou uma demanda sem{' '}
            <span className="font-bold">responsável nominal</span>,{' '}
            <span className="font-bold">prazo pactuado</span>,{' '}
            <span className="font-bold">contexto completo</span> e{' '}
            <span className="font-bold">aceite registrado</span>.”
          </blockquote>

          <div className="mt-9">
            <ContentAccordion items={slide.pillars || []} tone="light" columns={4} expandAll onRegisterNavigation={onRegisterNavigation} />
          </div>
        </div>

        <footer className="w-full max-w-7xl mx-auto shrink-0 pt-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-[#0a0d12]">
            <span className="w-11 h-11 shrink-0 rounded-full bg-[#c99a37]/15 border border-[#b78624]/60 flex items-center justify-center text-[#9b701a]">
              <Award className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-base sm:text-lg font-semibold leading-tight">Regra de Ouro inegociável em todas as 15 marcas do Grupo</span>
          </div>
          <span>Coomarcas · Nossa Virada</span>
        </footer>
      </div>
    );
  }

  // 10. SLIDE 12: 08 / SUPORTE RELACIONAL
  if (slide.id === 12) {
    const satellites = ["COMERCIAL", "ONBOARDING", "BU / KA", "OPERAÇÃO TÉCNICA", "ATENDIMENTO", "QUALIDADE", "AUDITORIA", "FINANCEIRO"];

    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Suporte Relacional é o guardião da jornada.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              Atua de forma neutra e estratégica entre marcas, clientes e BUs: detecta riscos precoces, exige prazos e zela pela fidelização — sem executar tarefas técnicas.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">08</span>
        </div>

        <div className="flex-1 min-h-0 flex flex-col justify-around">
          {/* Hub & Satellites */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-2">
            <div className="p-5 rounded-2xl bg-white text-black text-center font-black shadow-2xl border-2 border-white">
              <span className="text-xl block">SUPORTE RELACIONAL</span>
              <span className="text-xs font-medium text-neutral-600 block mt-1">Jornada · Risco · Retenção</span>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xl justify-center">
              {satellites.map((sat, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-bold text-white">
                  {sat}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/15">
              <span className="text-xs font-bold text-[#a3adb8] block mb-1">PREVENIR</span>
              <h4 className="text-lg font-bold text-white mb-1">Saúde da carteira</h4>
              <p className="text-xs text-[#d5dbe4] leading-relaxed">
                Segmentação da carteira (Proteção, Performance e Evolução), Health Score ativo e detecção precoce de atritos.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/15">
              <span className="text-xs font-bold text-[#a3adb8] block mb-1">ACOMPANHAR</span>
              <h4 className="text-lg font-bold text-white mb-1">Cobrança e escalonamento</h4>
              <p className="text-xs text-[#d5dbe4] leading-relaxed">
                Cobrança de causa-raiz, plano de ação corretivo, responsável, prazo e comprovação documental das áreas.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/15">
              <span className="text-xs font-bold text-[#a3adb8] block mb-1">APRENDER</span>
              <h4 className="text-lg font-bold text-white mb-1">Voz do Cliente</h4>
              <p className="text-xs text-[#d5dbe4] leading-relaxed">
                Tratamento estruturado de reclamações, medição de NPS, análise de reincidências e blindagem contra churn.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            PAPEL ESTRATÉGICO
          </span>
          <span>O Suporte Relacional não executa lançamentos fiscais nem folha; sua missão é proteger o cliente e cobrar rigor de entrega de toda a organização.</span>
        </div>
      </div>
    );
  }

  // 11. SLIDE 13: 09 / DO CS AO KEY ACCOUNT
  if (slide.id === 13) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Do CS generalista ao Key Account da BU.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              Durante a virada, as profissionais de Customer Success evoluem de um modelo reativo e transversal para a liderança profunda e dedicada de contas dentro das BUs.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">09</span>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch my-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#a3adb8] uppercase block mb-1">MODELO ATUAL</span>
              <h3 className="text-2xl font-bold text-white mb-2">CS Generalista (Transversal)</h3>
              <p className="text-sm text-[#d5dbe4] mb-4">Atuação dispersa cobrindo toda a carteira da empresa de forma reativa.</p>
            </div>
            <ul className="space-y-2 text-sm text-[#a3adb8]">
              <li>• Apagar incêndios e encaminhar solicitações pontuais às áreas.</li>
              <li>• Contato superficial com os contratos e peculiaridades técnicas.</li>
              <li>• Alertas de cancelamento percebidos após desgaste avançado.</li>
              <li>• Foco no relacionamento, sem poder de mobilização na produção.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border-2 border-white/30 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-white uppercase block mb-1">MODELO FUTURO DA VIRADA</span>
              <h3 className="text-2xl font-bold text-white mb-2">Key Account (Gestora da BU)</h3>
              <p className="text-sm text-[#d5dbe4] mb-4">Liderança direta da carteira do nicho com autoridade e conhecimento do cliente.</p>
            </div>
            <ul className="space-y-2 text-sm text-white">
              <li>✓ Aceite formal da carteira e domínio profundo do contrato.</li>
              <li>✓ Mobilização direta de Atendimento, Fiscal, Contábil e DP da BU.</li>
              <li>✓ Gestão preventiva de prazos, pendências e devolutivas pontuais.</li>
              <li>✓ Reuniões periódicas de entrega de valor e parceria com Suporte Relacional.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            OBSERVAÇÃO CRÍTICA
          </span>
          <span>A governança transversal do Suporte Relacional permanece ativa e independente para auditar a jornada, mesmo após a alocação como KAs.</span>
        </div>
      </div>
    );
  }

  // 12. SLIDE 14: 10 / CICLO DA EXCELÊNCIA
  if (slide.id === 14) {
    const pil = [
      { tag: "REGRAS", title: "Compliance", desc: "Normas, POPs, alçadas de decisão e conformidade legal em todas as frentes." },
      { tag: "PADRÃO", title: "Qualidade", desc: "Verificação ativa de conformidade nas entregas, conferência de critérios e detecção de desvios." },
      { tag: "EVIDÊNCIA", title: "Auditoria", desc: "Investigação de causa-raiz, análise de reincidências e teste de eficácia real das correções." },
      { tag: "APRENDIZADO", title: "Suporte Técnico", desc: "Mentoria especializada para Fiscal, Contábil e DP, convertendo dúvidas em treinamentos." },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Excelência fecha o ciclo do erro.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              Compliance, Qualidade, Auditoria e Suporte Técnico atuam em sincronia para eliminar retrabalhos e transformar falhas em procedimentos blindados.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">10</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
          {pil.map((p, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/15 hover:border-white/30 transition-all">
              <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">{p.tag}</span>
              <h4 className="text-xl font-bold text-white mb-2">{p.title}</h4>
              <p className="text-xs sm:text-sm text-[#d5dbe4] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Looping Cycle Banner */}
        <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 flex flex-wrap items-center justify-around text-xs md:text-sm font-bold text-white tracking-wider">
          <span>01 DESVIO DETECTADO</span>
          <ArrowRight className="w-4 h-4 text-white" />
          <span>02 CORREÇÃO TÉCNICA</span>
          <ArrowRight className="w-4 h-4 text-white" />
          <span>03 VERIFICAÇÃO DE PADRÃO</span>
          <ArrowRight className="w-4 h-4 text-white" />
          <span>04 CAPACITAÇÃO E PREVENÇÃO</span>
        </div>
      </div>
    );
  }

  // 13. SLIDE 15: 11 / SOLUÇÕES E AUDITTAR
  if (slide.id === 15) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Produtos especializados geram valor.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              O ecossistema amplia a capacidade de atender demandas estratégicas dos clientes; a Audittar lidera essa geração de soluções de alta margem.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">11</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">SOLUÇÕES FISCAIS</span>
            <h4 className="text-2xl font-bold text-white mb-2">Soluções Tributárias</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Planejamento tributário estratégico, recuperação administrativa de créditos, apuração de benefícios fiscais e compensações legais com segurança jurídica.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">CONFIANÇA & DADOS</span>
            <h4 className="text-2xl font-bold text-white mb-2">Diagnóstico e Revisão</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Auditoria contábil e tributária independente, revisão cadastral e parametrização de produtos, saneamento de bases e modelagem de precificação.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">ALTA RENTABILIDADE</span>
            <h4 className="text-2xl font-bold text-white mb-2">Estruturação Societária</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Planejamento de holdings patrimoniais e operacionais, reorganizações societárias, sucessão familiar, governança e antecipação estratégica de recebíveis.
            </p>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            GATE DE EXECUÇÃO
          </span>
          <span><b>Oportunidade não é autorização de execução:</b> O Comercial contrata formalmente; os especialistas técnicos validam a viabilidade e entregam estritamente o escopo aprovado.</span>
        </div>
      </div>
    );
  }

  // 14. SLIDE 16: 12 / O CICLO DA EVIDÊNCIA
  if (slide.id === 16) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              O trabalho precisa deixar evidência.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              Todo colaborador deve conseguir responder com segurança: o que preciso entregar, para quem, até quando e onde está a comprovação registrada?
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">12</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">ETAPA 01</span>
            <h4 className="text-2xl font-bold text-white mb-2">Antes · Preparar</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Analisar carteira, mapear dependências, confirmar prazos, identificar riscos e certificar executor, revisor e substituto antes de iniciar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">ETAPA 02</span>
            <h4 className="text-2xl font-bold text-white mb-2">Durante · Executar</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Cumprir o processo homologado sem atalhos, comunicar bloqueios técnicos com antecedência e atualizar o sistema oficial em tempo real.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">ETAPA 03</span>
            <h4 className="text-2xl font-bold text-white mb-2">Depois · Validar</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Conduzir revisão técnica, coletar aceite formal, arquivar a evidência incontestável, dar retorno ao cliente e documentar melhorias.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white text-sm block">Demanda</strong>
            <span className="text-xs text-[#a3adb8]">Cliente + canal + impacto real do serviço.</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white text-sm block">Responsável</strong>
            <span className="text-xs text-[#a3adb8]">Executor nominal + revisor técnico.</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white text-sm block">Prazo</strong>
            <span className="text-xs text-[#a3adb8]">Compromisso pactuado + alerta preventivo.</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <strong className="text-white text-sm block">Conclusão</strong>
            <span className="text-xs text-[#a3adb8]">Evidência arquivada + devolutiva formal.</span>
          </div>
        </div>
      </div>
    );
  }

  // 15. SLIDE 17: 13 / TECNOLOGIA E MIGRAÇÃO
  if (slide.id === 17) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Migrar com segurança, não apenas trocar software.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              O plano de virada assegura que as rotinas atuais não sofram qualquer oscilação enquanto o novo ecossistema Domínio é homologado com rigor por lote.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">13</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#a3adb8] uppercase block mb-1">SUSTENTAÇÃO DO NEGÓCIO</span>
              <h3 className="text-2xl font-bold text-white mb-2">Questor & Alterdata (Continuidade)</h3>
              <p className="text-sm text-[#d5dbe4] mb-4">Manter fechamentos e obrigações sem oscilação durante a preparação do ambiente futuro.</p>
            </div>
            <ul className="space-y-2 text-sm text-[#a3adb8]">
              <li>• Conferência contínua de bases cadastrais e histórico de fechamentos.</li>
              <li>• Manutenção de prazos e SLAs vigentes sem ruído para o cliente.</li>
              <li>• Responsáveis e prazos claros para garantir conformidade diária.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/10 border-2 border-white/30 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold tracking-wider text-white uppercase block mb-1">HOMOLOGAÇÃO & DESTINO</span>
              <h3 className="text-2xl font-bold text-white mb-2">Sistema Domínio (Ambiente Futuro)</h3>
              <p className="text-sm text-[#d5dbe4] mb-4">Parametrizar ambiente, migrar cadastros, comparar fechamentos espelhados e homologar por lote seguro.</p>
            </div>
            <ul className="space-y-2 text-sm text-white">
              <li>✓ Módulos Fiscal, Contábil e DP com validações técnicas independentes.</li>
              <li>✓ Treinamento intensivo de usuários, perfis de acesso e testes.</li>
              <li>✓ Ingresso oficial da BU somente após aceite formal da diretoria técnica.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            DIRETRIZ DE TECNOLOGIA
          </span>
          <span>Datas de migração seguem estritamente o cronograma técnico aprovado; nenhum módulo é considerado ativo sem teste de espelhamento validado.</span>
        </div>
      </div>
    );
  }

  // 16. SLIDE 18: 14 / PESSOAS E CULTURA
  if (slide.id === 18) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Ninguém muda sozinho.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              A virada sustentável exige liderança presente, clareza de escopo, capacitação contínua e desenvolvimento das competências técnicas e comportamentais.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">14</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">CONDUZIR COM MÉTODO</span>
            <h4 className="text-2xl font-bold text-white mb-2">Lideranças</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Distribuir tarefas com equilíbrio, orientar tecnicamente, revisar entregas, definir prioridades com firmeza e desenvolver as equipes sob sua gestão.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">ENTREGA RESPONSÁVEL</span>
            <h4 className="text-2xl font-bold text-white mb-2">Colaboradores</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Conhecer os processos do início ao fim, cumprir os padrões homologados, comunicar riscos preventivamente e apresentar evidências documentadas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/15">
            <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">DESENVOLVIMENTO CONTÍNUO</span>
            <h4 className="text-2xl font-bold text-white mb-2">RH e Desenvolvimento</h4>
            <p className="text-sm text-[#d5dbe4] leading-relaxed">
              Mapear gaps de competência, estruturar PDIs individuais, alimentar a Universidade Corporativa e zelar pela comunicação transparente.
            </p>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            VALOR CULTURAL
          </span>
          <span><b>Compromisso com o talento:</b> Não vamos medir a virada por nomes em caixas. Vamos medir por competência demonstrada, qualidade de entrega e confiança recíproca.</span>
        </div>
      </div>
    );
  }

  // 17. SLIDE 19: 15 / ROADMAP DA VIRADA
  if (slide.id === 19) {
    const steps = [
      { num: "01", title: "Estabilizar", desc: "Tratar riscos urgentes da carteira, sanar obrigações críticas e alinhar comunicação com os colaboradores." },
      { num: "02", title: "Mapear", desc: "Mapear carteira, capacidade real de produção, fluxos de trabalho, responsabilidades nominais e gaps existentes." },
      { num: "03", title: "Preparar", desc: "Capacitar equipes, formalizar checklists de passagem, homologar sistemas e implantar cultura de revisão." },
      { num: "04", title: "Validar MVP", desc: "Medir a operação da BU Pets: qualidade técnica, capacidade de atendimento, índice de satisfação e margem." },
      { num: "05", title: "Liberar", desc: "Transferir carteiras homologadas com equipes devidamente treinadas e aceite formal da governança." },
      { num: "06", title: "Replicar", desc: "Abrir novas BUs de forma gradual, planejada e acompanhada de perto pelos indicadores de excelência." },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Expandir somente quando estiver pronto.
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              A evolução da Coomarcas é orientada por critérios objetivos de prontidão técnica e maturidade operacional, e não por datas arbitrárias no calendário.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">15</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-auto">
          {steps.map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/15 hover:border-white/30 transition-all flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black font-mono text-white/40 block mb-2">{st.num}</span>
                <h4 className="text-base font-bold text-white mb-1">{st.title}</h4>
              </div>
              <p className="text-xs text-[#a3adb8] leading-relaxed mt-2">{st.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            PRONTIDÃO TÉCNICA
          </span>
          <span>A evolução depende de prontidão técnica, capacidade comprovada, sistemas homologados e decisão formal da liderança.</span>
        </div>
      </div>
    );
  }

  // 18. SLIDE 20: 16 / NOSSOS COMPROMISSOS
  if (slide.id === 20) {
    const comp = [
      { num: "01", title: "Conhecer seu papel", desc: "Entender exatamente o que você executa, quais são seus limites de alçada, quando acionar outra área e a quem você responde." },
      { num: "02", title: "Antecipar o risco", desc: "Avisar proativamente sobre qualquer pendência, divergência técnica ou risco de atraso antes que a falha atinja o cliente." },
      { num: "03", title: "Registrar o trabalho", desc: "Garantir que histórico, prazos pactuados, protocolos e evidências de entrega estejam arquivados nos sistemas homologados." },
      { num: "04", title: "Colaborar entre áreas", desc: "Receber transições com aceite rigoroso, honrar combinados interdepartamentais e compartilhar conhecimento." },
    ];

    return (
      <div className="w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 bg-[#0a0d12] text-[#f1f4f8] select-none">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase bg-white/5 border border-white/15 px-4 py-1 rounded-full text-[#d5dbe4] mb-2">
              {slide.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              O que esperamos de cada um de nós?
            </h2>
            <p className="text-sm sm:text-base text-[#a3adb8] max-w-4xl mt-1">
              A transformação de toda a empresa se constrói na integridade, zelo e disciplina com que cada colaborador cumpre seus compromissos diários.
            </p>
          </div>
          <span className="text-4xl sm:text-6xl font-black text-white/10">16</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
          {comp.map((c, i) => (
            <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/15 hover:border-white/30 transition-all">
              <span className="text-xs font-bold text-[#a3adb8] uppercase block mb-1">COMPROMISSO {c.num}</span>
              <h4 className="text-xl font-bold text-white mb-2">{c.title}</h4>
              <p className="text-xs sm:text-sm text-[#d5dbe4] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3 text-sm text-[#d5dbe4]">
          <span className="px-3 py-1 rounded-md bg-white text-black font-bold text-xs uppercase tracking-wider shrink-0">
            POSTURA COOMARCAS
          </span>
          <span>Uma equipe de alta performance se constrói na confiança: faça o que foi combinado, no prazo combinado, com a qualidade combinada.</span>
        </div>
      </div>
    );
  }

  // 19. SLIDE 21: MANIFESTO E ENCERRAMENTO (Light Mode Accent ✦)
  if (slide.id === 21 || slide.isClosing) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-10 px-10 md:px-16 lg:px-24 bg-[#f8f9fa] text-[#0a0d12] select-none">
        <div>
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase bg-black/5 border border-black/15 px-4 py-1.5 rounded-full text-[#0a0d12] mb-4">
            {slide.eyebrow}
          </span>
        </div>

        <div className="my-auto max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0a0d12] leading-none mb-6">
            Uma Coomarcas.<br />
            Uma experiência melhor.
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#0a0d12] mb-6 border-l-4 border-black pl-5">
            Disciplina hoje. Qualidade amanhã. Crescimento com consistência.
          </p>

          <p className="text-base sm:text-lg md:text-xl text-[#49525c] leading-relaxed max-w-3xl">
            Construído para valorizar o trabalho de cada colaborador, blindar nossos clientes e estabelecer o padrão definitivo de excelência contábil no Brasil.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button
              onClick={() => onGoToSlide(0)}
              className="px-6 py-3 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-colors shadow-lg"
            >
              Reiniciar Apresentação (Início)
            </button>
            <button
              onClick={() => onGoToSlide(5)}
              className="px-6 py-3 rounded-full bg-white text-black border border-black/20 font-bold text-sm hover:bg-black/5 transition-colors"
            >
              Ver Organograma Institucional
            </button>
          </div>
        </div>

        <div className="text-xs text-[#717d8a] border-t border-black/10 pt-3 flex justify-between">
          <span>Obrigado a todos os colaboradores do Grupo Coomarcas</span>
          <span>Nossa Virada 2026</span>
        </div>
      </div>
    );
  }

  // DEFAULT / SLIDES GENÉRICOS DE CARDS (ex: Slide 02, Slide 04)
  return (
    <div
      className={`w-full h-full flex flex-col justify-between py-6 px-8 md:px-14 lg:px-20 select-none ${
        slide.isLight ? 'bg-[#f8f9fa] text-[#0a0d12]' : 'bg-[#0a0d12] text-[#f1f4f8]'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span
            className={`inline-block text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full mb-2 ${
              slide.isLight
                ? 'bg-black/5 border border-black/15 text-[#0a0d12]'
                : 'bg-white/5 border border-white/15 text-[#d5dbe4]'
            }`}
          >
            {slide.eyebrow}
          </span>
          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight ${
              slide.isLight ? 'text-[#0a0d12]' : 'text-white'
            }`}
          >
            {slide.headline}
          </h2>
          {slide.lead && (
            <p
              className={`text-sm sm:text-base max-w-4xl mt-1 ${
                slide.isLight ? 'text-[#49525c]' : 'text-[#a3adb8]'
              }`}
            >
              {slide.lead}
            </p>
          )}
        </div>
        <span
          className={`text-4xl sm:text-6xl font-black ${
            slide.isLight ? 'text-black/10' : 'text-white/10'
          }`}
        >
          {slide.num || String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {slide.cards && (
        <div
          className={`grid gap-5 my-auto ${
            slide.cards.length === 3
              ? 'grid-cols-1 md:grid-cols-3'
              : slide.cards.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {slide.cards.map((c, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                slide.isLight
                  ? 'bg-white border-[#dbe0e6] shadow-sm'
                  : 'bg-white/5 border-white/15 hover:border-white/30'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                    slide.isLight ? 'text-neutral-500' : 'text-[#a3adb8]'
                  }`}
                >
                  {c.tag}
                </span>
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-2 ${
                    slide.isLight ? 'text-[#0a0d12]' : 'text-white'
                  }`}
                >
                  {c.title}
                </h3>
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  slide.isLight ? 'text-[#49525c]' : 'text-[#d5dbe4]'
                }`}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      )}

      {slide.statusBand && (
        <div
          className={`mt-4 p-3.5 rounded-xl border flex items-center gap-3 text-sm ${
            slide.isLight
              ? 'bg-white border-[#dbe0e6] text-[#49525c]'
              : 'bg-white/5 border-white/15 text-[#d5dbe4]'
          }`}
        >
          <span
            className={`px-3 py-1 rounded-md font-bold text-xs uppercase tracking-wider shrink-0 ${
              slide.isLight ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {slide.statusBand.tag}
          </span>
          <span>{slide.statusBand.text}</span>
        </div>
      )}
    </div>
  );
}
