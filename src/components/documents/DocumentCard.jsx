import React, { useState } from 'react';
import MockUploadModal from './MockUploadModal';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  UploadCloud, 
  FileText, 
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function DocumentCard({ document: docItem }) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { addToast, t } = useApp();

  const isReady = docItem.status === 'ready';
  const isPending = docItem.status === 'pending';
  const isMissing = docItem.status === 'missing';

  return (
    <>
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all duration-200 backdrop-blur-xl ${
        isReady 
          ? 'bg-slate-900/85 border-slate-800 hover:border-emerald-500/50 shadow-xl' 
          : isPending
          ? 'bg-slate-900/85 border-amber-500/40 hover:border-amber-400 shadow-xl'
          : 'bg-slate-900/85 border-rose-500/40 hover:border-rose-400 shadow-xl'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className={`p-3 rounded-2xl shrink-0 ${
              isReady 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                : isPending 
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' 
                : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-black text-white">{docItem.title}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 border border-slate-700">
                  {docItem.category}
                </span>
                {docItem.isMandatory && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-wider">
                    Mandatory
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {docItem.description}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="shrink-0 flex items-center">
            {isReady && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {t('readyAndVerified') || 'Ready & Verified'}
              </span>
            )}
            {isPending && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                {t('actionNeeded') || 'Action Needed'}
              </span>
            )}
            {isMissing && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-500/15 text-rose-300 border border-rose-500/40 shadow-sm">
                <XCircle className="w-4 h-4 text-rose-400" />
                {t('missingDoc') || 'Missing Document'}
              </span>
            )}
          </div>
        </div>

        {/* Required for & file status details */}
        <div className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              {t('requiredForSchemes') || 'Required for Matching Schemes:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {docItem.requiredFor?.map((schemeName, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-slate-800/90 border border-slate-700/80 rounded-lg text-[11px] font-semibold text-amber-200">
                  {schemeName}
                </span>
              ))}
            </div>
          </div>

          {isReady && (
            <div className="text-left md:text-right">
              <p className="text-slate-400 text-[10.5px] font-bold">{t('uploadedFileLabel') || 'Uploaded File:'}</p>
              <p className="font-bold text-white text-xs flex items-center md:justify-end gap-1.5 mt-0.5">
                <span className="truncate max-w-xs">{docItem.fileName}</span>
                <span className="text-[10.5px] text-emerald-400 font-extrabold">({docItem.uploadedAt})</span>
              </p>
            </div>
          )}
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
          {isReady && (
            <button
              onClick={() => addToast(`Opening preview for ${docItem.fileName}`, 'info')}
              className="px-3.5 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('viewDocument') || 'View Document'}</span>
            </button>
          )}

          <button
            onClick={() => setShowUploadModal(true)}
            className={`px-4 py-2 text-xs font-black rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              isReady 
                ? 'text-amber-400 hover:text-slate-950 bg-slate-800 hover:bg-amber-400 border border-slate-700' 
                : 'text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-md shadow-amber-500/20'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>{isReady ? (t('reUpload') || 'Re-upload') : (t('uploadDoc') || 'Upload Document')}</span>
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      <MockUploadModal
        document={docItem}
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </>
  );
}
