import React from 'react';
import { useApp } from '../context/AppContext';
import DocumentCard from '../components/documents/DocumentCard';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import { 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DocumentCheck() {
  const { documents, currentProfile, addToast, t } = useApp();
  const navigate = useNavigate();

  const readyCount = documents.filter(d => d.status === 'ready').length;
  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const missingCount = documents.filter(d => d.status === 'missing').length;
  const progressPercent = Math.round((readyCount / documents.length) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Progress Bar */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <FileCheck2 className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {t('documentHub') || 'Document Readiness Hub'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
              {t('documentSubtitle') || 'Verify and prepare required certificates to accelerate your loan appraisal & capital subsidy claims.'}
            </p>
          </div>

          {/* Quick Summary Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-xs font-bold text-emerald-300 flex items-center gap-2 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{readyCount} / {documents.length} {t('percentReady') || 'Ready'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">{t('verificationReadiness') || 'Verification Readiness Level'}</span>
            <span className="font-black text-amber-400">{progressPercent}% {t('percentReady') || 'Ready'}</span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Document Status Mini-Chips */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-xl font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {readyCount} {t('readyAndVerified') || 'Ready & Verified'}
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-xl font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            {pendingCount} {t('actionNeeded') || 'Action Needed'}
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded-xl font-bold">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            {missingCount} {t('missingDoc') || 'Missing Document'}
          </span>
        </div>
      </div>

      {/* DPR Assistance Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-amber-950/80 rounded-3xl p-6 border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{t('missingDocAssistance') || 'Missing Document Assistance'}</span>
          </div>
          <h3 className="text-base font-black text-white">{t('needDprTitle') || 'Need a Detailed Project Report (DPR)?'}</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {t('dprAssistanceDesc')} <strong className="text-amber-300">{currentProfile.sector}</strong>.
          </p>
        </div>

        <button
          onClick={() => addToast('Sample DPR Template downloaded! Fill details and upload.', 'success')}
          className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t('downloadDprSample') || 'Download DPR Sample (.DOCX)'}</span>
        </button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((docItem) => (
          <DocumentCard key={docItem.id} document={docItem} />
        ))}
      </div>

      {/* Disclaimer Notice */}
      <DisclaimerNotice />
    </div>
  );
}
