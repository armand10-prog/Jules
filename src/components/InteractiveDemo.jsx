import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  Mail,
  Clock,
  FileText,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Users,
  Check,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Video,
  Download,
  X,
  Info
} from 'lucide-react';
import { demoSteps } from '../data/demoContent';

export default function InteractiveDemo() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeSubStepIndex, setActiveSubStepIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Interactive email simulation state
  const [emailStatus, setEmailStatus] = useState('pending'); // 'pending' | 'accepted' | 'declined'
  const [emailTab, setEmailTab] = useState('j3'); // 'j3' | 'j7'

  const currentStep = demoSteps[currentStepIndex];
  const timerRef = useRef(null);

  // Total duration estimation: 18 + 20 + 35 + 20 + 15 = 108 seconds (~ 1m48s)
  const currentDuration = currentStep.durationSec * 1000;

  // Handle auto-advancing progress
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = 100;
    const increment = (intervalTime / currentDuration) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next step if not last
          if (currentStepIndex < demoSteps.length - 1) {
            setCurrentStepIndex((curr) => curr + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, currentDuration]);

  // When step changes, reset local step states
  useEffect(() => {
    setProgress(0);
    setActiveSubStepIndex(0);
  }, [currentStepIndex]);

  // If in step 3 (demonstration) with auto-play, synchronize sub-steps smoothly
  useEffect(() => {
    if (currentStepIndex === 2 && isPlaying) {
      const numSubsteps = currentStep.substeps.length;
      const subIndex = Math.min(
        Math.floor((progress / 100) * numSubsteps),
        numSubsteps - 1
      );
      setActiveSubStepIndex(subIndex);
    }
  }, [progress, currentStepIndex, isPlaying]);

  const goToStep = (index) => {
    setCurrentStepIndex(index);
    setProgress(0);
  };

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setProgress(0);
    setIsPlaying(true);
    setEmailStatus('pending');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141413] flex flex-col font-sans">

      {/* HEADER / NAVIGATION BAR WITH OFFICIAL ZÉDIA BRANDING */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#D6D3CD]/60 px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <a href="https://zedia-devis.ai.studio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <img
                src="/assets/zedia-logo.svg"
                alt="Logo ZÉDIA"
                className="w-8 h-8 rounded-md transition-transform group-hover:scale-105"
              />
              <span className="font-extrabold text-xl tracking-tight text-[#141413]">
                ZÉDIA
              </span>
            </a>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-[#141413]/5 text-[#141413]/70 border border-[#D6D3CD]/60">
              Démonstration Commerciale Interactive
            </span>
          </div>

          {/* Quick Step Indicators */}
          <div className="hidden lg:flex items-center gap-1.5">
            {demoSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => goToStep(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  currentStepIndex === idx
                    ? 'bg-[#141413] text-[#FAF9F6] shadow-sm'
                    : 'text-[#141413]/70 hover:bg-[#141413]/5 hover:text-[#141413]'
                }`}
              >
                <span>{step.id}.</span>
                <span>{step.badge.split('·')[1]?.trim() || step.badge}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons: Commercial Video & Site Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setShowVideoModal(true);
                setIsPlaying(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-[#9A4A12] text-white hover:bg-[#833E0E] active:scale-95 transition-all shadow-sm"
              title="Voir la vidéo commerciale MP4 Full HD 1080p"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vidéo Commerciale (82s)</span>
            </button>
            <a
              href="https://zedia-devis.ai.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg bg-[#141413] text-[#FAF9F6] hover:bg-[#292724] active:scale-95 transition-all shadow-sm"
            >
              <span>Accéder au site</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-[#E5E3DC] h-1.5 mt-3 rounded-full overflow-hidden">
          <div
            className="bg-[#2563eb] h-full transition-all duration-100 ease-linear rounded-full"
            style={{
              width: `${((currentStepIndex + progress / 100) / demoSteps.length) * 100}%`
            }}
          />
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">

        {/* Step Badge & Title */}
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-100/80 text-blue-900 border border-blue-200 mb-3">
            <span>{currentStep.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141413] tracking-tight mb-3">
            {currentStep.title}
          </h1>
          <p className="text-sm sm:text-base text-[#141413]/75 font-normal leading-relaxed">
            {currentStep.subtitle}
          </p>
        </div>

        {/* STEP-SPECIFIC VIEWS */}
        <div className="w-full animate-fade-in">
          {/* STEP 1: LE PROBLÈME */}
          {currentStepIndex === 0 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentStep.problemCards.map((card, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-[#D6D3CD]/80 bg-white shadow-sm hover:shadow-md hover:border-[#141413]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold mb-3 border border-red-100">
                        {card.icon === 'FileQuestion' && <FileText className="w-5 h-5" />}
                        {card.icon === 'UserX' && <Users className="w-5 h-5" />}
                        {card.icon === 'Clock' && <Clock className="w-5 h-5" />}
                        {card.icon === 'TrendingDown' && <AlertCircle className="w-5 h-5" />}
                      </div>
                      <h3 className="font-bold text-base text-[#141413] mb-2">{card.title}</h3>
                      <p className="text-xs sm:text-sm text-[#141413]/70 leading-relaxed">{card.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#D6D3CD]/40 flex items-center text-xs font-semibold text-red-600/90">
                      <span>Conséquence directe sur l'artisan</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Realistic quote / statistic banner */}
              <div className="bg-[#141413] text-[#FAF9F6] p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                <div className="flex items-center gap-4">
                  <div className="text-4xl sm:text-5xl font-black text-red-400 shrink-0">
                    50%
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold">1 devis sur 2 n'est jamais relancé faute de temps</h4>
                    <p className="text-xs sm:text-sm text-[#FAF9F6]/70 mt-1">
                      Chaque devis sans relance est un chantier potentiel qui s'endort chez le client.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full md:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shrink-0 shadow"
                >
                  <span>Découvrir la solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LA SOLUTION */}
          {currentStepIndex === 1 && (
            <div className="space-y-6">
              {/* 3 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {currentStep.pillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl border border-[#D6D3CD] bg-white shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black tracking-widest text-[#141413]/50">PILIER {pillar.number}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#141413] mb-2">{pillar.title}</h3>
                      <p className="text-sm text-[#141413]/70 leading-relaxed">{pillar.description}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-[#D6D3CD]/50 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                      <CheckCircle className="w-4 h-4" />
                      <span>Inclus dès l'offre gratuite</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Metrics Bar */}
              <div className="bg-[#FAF9F6] border border-[#D6D3CD] rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {currentStep.verifiedStats.map((stat, i) => (
                  <div key={i} className="p-3">
                    <div className="text-2xl sm:text-3xl font-black text-[#141413] tracking-tight">{stat.value}</div>
                    <div className="text-xs text-[#141413]/70 mt-1 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DÉMONSTRATION DU FONCTIONNEMENT (SIMULATEUR INTERACTIF) */}
          {currentStepIndex === 2 && (
            <div className="bg-white border border-[#D6D3CD] rounded-2xl shadow-sm overflow-hidden flex flex-col">

              {/* Sub-step selector tabs */}
              <div className="bg-[#FAF9F6] border-b border-[#D6D3CD] px-3 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
                {currentStep.substeps.map((sub, idx) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveSubStepIndex(idx);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      activeSubStepIndex === idx
                        ? 'bg-[#141413] text-[#FAF9F6] shadow-sm'
                        : 'text-[#141413]/70 hover:bg-[#141413]/5'
                    }`}
                  >
                    <span>{sub.stepNumber}.</span>
                    <span>{sub.tabTitle}</span>
                  </button>
                ))}
              </div>

              {/* Substep details & Live view */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">

                {/* Left explanation column */}
                <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#D6D3CD] flex flex-col justify-between bg-white">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold mb-3">
                      <span>Étape {currentStep.substeps[activeSubStepIndex].stepNumber} sur 05</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#141413] mb-3">
                      {currentStep.substeps[activeSubStepIndex].heading}
                    </h3>
                    <p className="text-sm text-[#141413]/80 leading-relaxed mb-4">
                      {currentStep.substeps[activeSubStepIndex].explanation}
                    </p>

                    {/* Tags list */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {currentStep.substeps[activeSubStepIndex].tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[#FAF9F6] text-[#141413]/80 border border-[#D6D3CD]">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Callout box */}
                  <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 font-medium leading-snug flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{currentStep.substeps[activeSubStepIndex].callout}</span>
                  </div>
                </div>

                {/* Right media / Interactive view column */}
                <div className="lg:col-span-7 p-4 sm:p-6 bg-[#FAF9F6] flex flex-col justify-center items-center">

                  {/* If substep 4: Interactive Client Email View */}
                  {currentStep.substeps[activeSubStepIndex].isInteractiveEmail ? (
                    <div className="w-full max-w-lg bg-white rounded-xl border border-[#D6D3CD] shadow-md p-4 sm:p-6 space-y-4">

                      {/* Email Tab switcher (J+3 vs J+7) */}
                      <div className="flex items-center justify-between border-b border-[#D6D3CD]/60 pb-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEmailTab('j3')}
                            className={`px-2.5 py-1 text-xs font-bold rounded ${
                              emailTab === 'j3' ? 'bg-[#141413] text-white' : 'bg-[#FAF9F6] text-[#141413]/70 hover:bg-[#E5E3DC]'
                            }`}
                          >
                            Relance J+3 (Prise de contact)
                          </button>
                          <button
                            onClick={() => setEmailTab('j7')}
                            className={`px-2.5 py-1 text-xs font-bold rounded ${
                              emailTab === 'j7' ? 'bg-[#141413] text-white' : 'bg-[#FAF9F6] text-[#141413]/70 hover:bg-[#E5E3DC]'
                            }`}
                          >
                            Relance J+7 (Planification)
                          </button>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Au nom de votre atelier
                        </span>
                      </div>

                      {/* Email Header */}
                      <div className="text-xs space-y-1 text-[#141413]/80 bg-[#FAF9F6] p-3 rounded-lg border border-[#D6D3CD]/60 font-mono">
                        <div><strong className="text-[#141413]">De :</strong> Dupont Menuiserie & Rénovation (via contact@zedia-devis.com)</div>
                        <div><strong className="text-[#141413]">À :</strong> M. Pierre Dumont &lt;p.dumont.villa@gmail.com&gt;</div>
                        <div><strong className="text-[#141413]">Objet :</strong> {emailTab === 'j3' ? 'Suivi de votre devis — Pose de menuiseries chêne (4 850,00 € TTC)' : 'Planification des travaux — Votre devis Menuiseries chêne (4 850,00 € TTC)'}</div>
                      </div>

                      {/* Email Body */}
                      <div className="text-xs sm:text-sm text-[#141413] leading-relaxed space-y-2">
                        <p>Bonjour M. Dumont,</p>
                        {emailTab === 'j3' ? (
                          <p>
                            Je me permets de revenir vers vous concernant le chiffrage transmis pour vos menuiseries extérieures en chêne massif.
                            Avez-vous eu le temps d'en prendre connaissance ou souhaitez-vous un éclaircissement technique ?
                          </p>
                        ) : (
                          <p>
                            Nous finalisons actuellement le planning des interventions pour les semaines à venir.
                            Afin de vous réserver un créneau d'intervention prioritaire pour votre chantier, je vous invite à nous confirmer votre accord ci-dessous :
                          </p>
                        )}
                        <p className="text-xs text-[#141413]/70 italic">
                          Vous pouvez simplement répondre à cet e-mail ou cliquer sur l'une des options :
                        </p>
                      </div>

                      {/* INTERACTIVE ACTION BUTTONS */}
                      <div className="pt-2">
                        {emailStatus === 'pending' && (
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={() => setEmailStatus('accepted')}
                              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>✓ Accepter ce devis</span>
                            </button>
                            <button
                              onClick={() => setEmailStatus('declined')}
                              className="px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>✕ Décliner l'offre</span>
                            </button>
                          </div>
                        )}

                        {emailStatus === 'accepted' && (
                          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex flex-col gap-1 animate-fade-in">
                            <div className="flex items-center gap-2 font-bold text-sm">
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                              <span>Devis accepté en 1 clic !</span>
                            </div>
                            <p>
                              ⚡ <strong>Sécurité anti-relance déclenchée :</strong> ZÉDIA coupe immédiatement toutes les prochaines relances et met à jour votre tableau de bord.
                            </p>
                            <button
                              onClick={() => setEmailStatus('pending')}
                              className="text-emerald-800 underline text-[11px] self-start mt-1"
                            >
                              Réinitialiser la simulation
                            </button>
                          </div>
                        )}

                        {emailStatus === 'declined' && (
                          <div className="p-3 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs flex flex-col gap-1 animate-fade-in">
                            <div className="flex items-center gap-2 font-bold text-sm">
                              <XCircle className="w-5 h-5 text-neutral-600" />
                              <span>Devis classé sans suite avec courtoisie</span>
                            </div>
                            <p>
                              Les relances sont stoppées immédiatement sans harceler le prospect. Vous restez pro et respectueux.
                            </p>
                            <button
                              onClick={() => setEmailStatus('pending')}
                              className="text-neutral-700 underline text-[11px] self-start mt-1"
                            >
                              Réinitialiser la simulation
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  ) : (
                    /* High-resolution screenshot of actual platform */
                    <div className="w-full relative group rounded-xl overflow-hidden border border-[#D6D3CD] shadow-sm bg-white">
                      <img
                        src={currentStep.substeps[activeSubStepIndex].image}
                        alt={currentStep.substeps[activeSubStepIndex].heading}
                        className="w-full h-auto object-cover max-h-[420px] transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#141413]/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-md">
                        Capture réelle ZÉDIA
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

          {/* STEP 4: LES BÉNÉFICES */}
          {currentStepIndex === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Benefits List */}
                <div className="lg:col-span-7 space-y-3">
                  {currentStep.benefitsList.map((ben, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-[#D6D3CD] bg-white shadow-sm flex items-start gap-3 hover:border-[#141413] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-[#141413]">{ben.title}</h4>
                        <p className="text-xs sm:text-sm text-[#141413]/70 mt-0.5 leading-relaxed">{ben.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#1F1E1B] to-[#141413] text-[#FAF9F6] p-7 rounded-2xl shadow-lg border border-[#3E3C36] flex flex-col justify-between min-h-[320px]">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base italic leading-relaxed text-[#FAF9F6]/90 font-light">
                      {currentStep.quote.text}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="font-bold text-sm text-[#FAF9F6]">{currentStep.quote.author}</p>
                    <p className="text-xs text-[#FAF9F6]/60">{currentStep.quote.role}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: APPEL À L'ACTION */}
          {currentStepIndex === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {currentStep.plans.map((plan, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                      i === 0
                        ? 'border-blue-500 bg-white ring-2 ring-blue-500/20 shadow-md'
                        : 'border-[#D6D3CD] bg-[#FAF9F6] shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#141413]/5 text-[#141413] border border-[#D6D3CD]">
                          {plan.badge}
                        </span>
                        {i === 0 && (
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            100% Gratuit
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-black text-[#141413]">{plan.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#141413]">{plan.price}</span>
                        <span className="text-xs text-[#141413]/70">{plan.frequency}</span>
                      </div>

                      <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-[#141413]/80">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 border-t border-[#D6D3CD]/50">
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow transition-all ${
                          i === 0
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-[#141413] hover:bg-[#292724] text-white'
                        }`}
                      >
                        <span>{plan.ctaText}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Final reassurance banner */}
              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-[#141413]/70 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sans carte bancaire · Sans engagement de durée · Vos clients restent vos clients</span>
                </p>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER CONTROLS / INTERACTIVE TIMELINE */}
      <footer className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D6D3CD] px-4 sm:px-8 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Play/Pause & Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg border border-[#D6D3CD] hover:bg-[#FAF9F6] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Étape précédente"
            >
              <ChevronLeft className="w-5 h-5 text-[#141413]" />
            </button>

            <button
              onClick={togglePlay}
              className="px-4 py-2 rounded-lg bg-[#141413] text-[#FAF9F6] hover:bg-[#292724] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Lire la démo</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === demoSteps.length - 1}
              className="p-2 rounded-lg border border-[#D6D3CD] hover:bg-[#FAF9F6] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Étape suivante"
            >
              <ChevronRight className="w-5 h-5 text-[#141413]" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-lg border border-[#D6D3CD] hover:bg-[#FAF9F6] text-[#141413]/70 hover:text-[#141413] transition-all ml-1"
              title="Recommencer depuis le début"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Current Step Status & Direct CTA */}
          <div className="flex items-center gap-4">
            <div className="text-xs text-[#141413]/70 font-semibold hidden md:block">
              Étape {currentStep.id} sur {demoSteps.length} · Durée totale ~ 1 min 45
            </div>

            <a
              href="https://zedia-devis.ai.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition-all active:scale-95"
            >
              <span>Découvrir ZÉDIA</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </footer>

      {/* MODAL LECTEUR VIDÉO COMMERCIALE (1080p Full HD) */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#141413] text-[#FAF9F6] border border-[#292724] rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#292724] bg-[#1F1E1B]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E29D5C] animate-pulse"></span>
                <div>
                  <h3 className="font-bold text-base text-[#FAF9F6] flex items-center gap-2">
                    <span>ZÉDIA — Vidéo Commerciale Officielle (82s)</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#9A4A12] text-white">1080p Full HD</span>
                  </h3>
                  <p className="text-xs text-[#A8A29E]">Prête pour la prospection par e-mail auprès des artisans et TPE du bâtiment</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/zedia-presentation-commerciale.mp4"
                  download="ZEDIA-presentation-commerciale-1080p.mp4"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] text-[#141413] hover:bg-[#EAE7DF] text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Télécharger .MP4</span>
                </a>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-1.5 rounded-lg text-[#A8A29E] hover:text-white hover:bg-white/10 transition-colors"
                  title="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative bg-black flex items-center justify-center aspect-video w-full overflow-hidden">
              <video
                src="/zedia-presentation-commerciale.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-[#292724] bg-[#191817] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A8A29E]">
              <div className="flex items-center gap-4">
                <span>⏱️ Durée : 01:22</span>
                <span>📐 Format : 1920 × 1080 (16:9)</span>
                <span>🎙️ Voix off : Français naturel</span>
              </div>
              <a
                href="https://zedia-devis.ai.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E29D5C] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Visiter https://zedia-devis.ai.studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
