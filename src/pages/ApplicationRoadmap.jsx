import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getLocalizedRoadmapData } from '../data/roadmapTranslations';
import BankFinderModal from '../components/roadmap/BankFinderModal';
import CSCFinderModal from '../components/roadmap/CSCFinderModal';
import Modal from '../components/common/Modal';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import { 
  Milestone, 
  Building2, 
  Building, 
  FileText, 
  Sparkles, 
  Check,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApplicationRoadmap() {
  const { currentProfile, appliedSchemeIds, schemes, addToast, t, currentLangCode } = useApp();
  const [showBankModal, setShowBankModal] = useState(false);
  const [showCSCModal, setShowCSCModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const navigate = useNavigate();

  const activeAppliedSchemes = schemes.filter(s => appliedSchemeIds.includes(s.id));
  const roadmapData = getLocalizedRoadmapData(currentLangCode);

  const statuses = [
    'completed',
    'completed',
    'completed',
    'in_progress',
    'upcoming',
    'upcoming',
    'upcoming'
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <Milestone className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('roadmapTitle') || 'Your Application Roadmap'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
            {t('roadmapSubtitle') || 'Visual step-by-step milestone journey for your enterprise.'} ({currentProfile.name} · {currentProfile.businessName}).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Active Enterprise Journey</span>
          </span>
        </div>
      </div>

      {/* Recommended Next Action Floating Glass Box */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('nextAction') || 'Next Recommended Action'} (Stage 4)</span>
          </div>
          <span className="text-xs font-bold text-amber-400">
            {roadmapData.targetCompletionText}
          </span>
        </div>

        <div>
          <h3 className="text-base font-black text-white">
            {typeof roadmapData.nextActionTitle === 'function' ? roadmapData.nextActionTitle(currentProfile.sector) : roadmapData.nextActionTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {roadmapData.nextActionDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => navigate('/documents')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition cursor-pointer"
          >
            {t('openDocumentHub') || 'Open Document Hub'} →
          </button>
          <button
            onClick={() => setShowBankModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('findBank') || 'Find Nearby Bank'}</span>
          </button>
          <button
            onClick={() => setShowCSCModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Building className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('findCSC') || 'Find Nearby CSC'}</span>
          </button>
          <button
            onClick={() => setShowInstructionsModal(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>{t('instructions') || 'View Instructions'}</span>
          </button>
        </div>
      </div>

      {/* 7-Step Vertical Roadmap Progression */}
      <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
        <h2 className="text-base font-black text-white mb-6 flex items-center gap-2">
          <Milestone className="w-4 h-4 text-amber-400" />
          <span>{roadmapData.lifecycleTitle}</span>
        </h2>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-800">
          {roadmapData.steps.map((step, idx) => {
            const status = statuses[idx] || 'upcoming';
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in_progress';

            return (
              <div key={step.stepNumber} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Step Circle Marker */}
                <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 relative z-10 shadow-lg ${
                  isCompleted 
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-slate-900' 
                    : isInProgress 
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 animate-pulse' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700 ring-4 ring-slate-900'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4" /> : step.stepNumber}
                </div>

                {/* Step Content Card */}
                <div className={`flex-1 p-5 rounded-2xl border transition ${
                  isInProgress 
                    ? 'bg-slate-800/90 border-amber-400/50 shadow-xl' 
                    : isCompleted 
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                    : 'bg-slate-900/40 border-slate-800/60 opacity-60'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                        STAGE {step.stepNumber}
                      </span>
                      <h4 className="text-sm font-black text-white">{step.title}</h4>
                    </div>

                    <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${
                      isCompleted 
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' 
                        : isInProgress 
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/40' 
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="capitalize">{status.replace('_', ' ')}</span>
                    {isInProgress && (
                      <button
                        onClick={() => navigate('/documents')}
                        className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t('openDocumentHub') || 'Take Action'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer Notice */}
      <DisclaimerNotice />

      {/* Nearby Bank Finder Modal */}
      <BankFinderModal
        isOpen={showBankModal}
        onClose={() => setShowBankModal(false)}
        district={currentProfile.state}
      />

      {/* Nearby CSC Center Finder Modal */}
      <CSCFinderModal
        isOpen={showCSCModal}
        onClose={() => setShowCSCModal(false)}
        district={currentProfile.state}
      />

      {/* Instructions Modal */}
      <Modal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        title={t('instructions') || 'Official Scheme Application Instructions'}
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p className="font-bold text-white">How to apply through Government Portals:</p>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Visit the designated portal (e.g. <strong>kviconline.gov.in</strong> or <strong>jansamarth.in</strong>).</li>
            <li>Register with your <strong>Aadhaar registered Mobile number</strong>.</li>
            <li>Select applicant category (Special category for 35% subsidy: SC/ST/Women/OBC/Rural).</li>
            <li>Enter your Enterprise details and upload DPR & Udyam certificate.</li>
            <li>Select your preferred financing bank branch.</li>
          </ol>
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 font-medium">
            💡 Tip: Keep digital copies of all 6 documents under 2MB each in PDF format.
          </div>
        </div>
      </Modal>
    </div>
  );
}
