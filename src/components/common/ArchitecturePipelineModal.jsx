import React from 'react';
import { 
  Mic, 
  Languages, 
  Sparkles, 
  UserCheck, 
  Database, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  FileSearch, 
  FileText, 
  ScanLine, 
  Calculator, 
  MapPin, 
  ExternalLink,
  X,
  Layers,
  Zap,
  ArrowRight
} from 'lucide-react';

export const PIPELINE_STEPS = [
  {
    step: 'STEP 01',
    layer: 'Input Layer',
    title: 'USER INPUT',
    desc: 'Entrepreneur expresses requirements through voice or natural language text.',
    tech: 'Web Speech API / Multi-lingual Text Capture',
    icon: Mic,
    color: 'blue'
  },
  {
    step: 'STEP 02',
    layer: 'Input Layer',
    title: 'VOICE / TEXT PROCESSING',
    desc: 'Multi-lingual audio transcription in Tamil, Hindi, and English.',
    tech: 'Whisper / Indic Acoustic Normalizer',
    icon: Languages,
    color: 'indigo'
  },
  {
    step: 'STEP 03',
    layer: 'NLP Layer',
    title: 'LANGUAGE + NLP PROCESSING',
    desc: 'Entity extraction: identifies sector, revenue, geography, demographic category.',
    tech: 'Intent & Entity Slot Filling',
    icon: Sparkles,
    color: 'amber'
  },
  {
    step: 'STEP 04',
    layer: 'Demographic State',
    title: 'USER PROFILE CREATION',
    desc: 'Structured profile synthesized (Age, Social Category, Gender, District, Turnover).',
    tech: 'Demographic Vector State Model',
    icon: UserCheck,
    color: 'blue'
  },
  {
    step: 'STEP 05',
    layer: 'Knowledge Graph',
    title: 'SCHEME KNOWLEDGE BASE',
    desc: 'Curated repository of Central & State government schemes, subsidies, and limits.',
    tech: 'Government Scheme Knowledge Base (12+ Schemes)',
    icon: Database,
    color: 'emerald'
  },
  {
    step: 'STEP 06',
    layer: 'Retrieval Layer',
    title: 'RAG / KNOWLEDGE RETRIEVAL',
    desc: 'Retrieves relevant scheme subsets using semantic & categorical indexing.',
    tech: 'Cosine Similarity & Rule-Indexed Retrieval',
    icon: Cpu,
    color: 'violet'
  },
  {
    step: 'STEP 07',
    layer: 'Core Logic',
    title: 'ELIGIBILITY ENGINE',
    desc: 'Evaluates 6 weighted criteria (Sector 20%, Income 20%, Location 15%, Purpose 20%, Demographics 10%, Capital 15%).',
    tech: 'Deterministic Multi-Factor Scoring',
    icon: ShieldCheck,
    color: 'cyan'
  },
  {
    step: 'STEP 08',
    layer: 'Classification',
    title: 'STATUS CLASSIFICATION',
    desc: 'Tri-state classification: 🟢 ELIGIBLE, 🟡 VERIFICATION NEEDED, 🔴 NOT ELIGIBLE.',
    tech: 'Automated Rule Matrix Thresholding',
    icon: CheckCircle2,
    color: 'blue'
  },
  {
    step: 'STEP 09',
    layer: 'Transparency',
    title: 'EXPLAINABILITY ENGINE',
    desc: 'Transparent checklist of why you qualify or specific reason for rejection.',
    tech: '100% Explainable Rule Tracing',
    icon: FileSearch,
    color: 'amber'
  },
  {
    step: 'STEP 10',
    layer: 'Compliance',
    title: 'REQUIRED DOCUMENTS',
    desc: 'Dynamic identification of mandatory proofs (Community Cert, DPR, Bank Statement).',
    tech: 'Scheme-Specific Document Schema Mapping',
    icon: FileText,
    color: 'rose'
  },
  {
    step: 'STEP 11',
    layer: 'Verification',
    title: 'DOCUMENT VERIFICATION (OCR)',
    desc: 'Extracts metadata from certificates to compute document readiness progress.',
    tech: 'Simulated Tesseract OCR Extraction',
    icon: ScanLine,
    color: 'indigo'
  },
  {
    step: 'STEP 12',
    layer: 'Financial Engine',
    title: 'FINANCIAL SUITABILITY (EMI)',
    desc: 'Calculates capital subsidy, promoter margin, bank loan, and monthly EMI feasibility.',
    tech: 'Amortization & Debt Burden Ratio Analysis',
    icon: Calculator,
    color: 'emerald'
  },
  {
    step: 'STEP 13',
    layer: 'Last-Mile Delivery',
    title: 'PARTNER MATCHING (Geo-Routing)',
    desc: 'Direct distance calculation to nearest Lead Bank, DIC office, and CSC centers.',
    tech: 'District Geo-Proximity Routing',
    icon: MapPin,
    color: 'amber'
  },
  {
    step: 'STEP 14',
    layer: 'Execution',
    title: 'OFFICIAL APPLY LINK',
    desc: 'Direct bridge to verified national/state portals (JanSamarth, Udyam, KVIC).',
    tech: 'Verified Government Portal Gateway',
    icon: ExternalLink,
    color: 'blue'
  }
];

export function PipelineGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {PIPELINE_STEPS.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div 
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400/80 hover:shadow-md transition-all group flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-amber-50 group-hover:border-amber-300 group-hover:text-amber-700 transition shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                  {item.step} • <span className="text-slate-500 font-semibold">{item.layer}</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                  SIH26092
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 tracking-tight mt-0.5 group-hover:text-amber-900 transition">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-snug mt-1">
                {item.desc}
              </p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-500 font-medium truncate">
                <span className="font-semibold text-slate-700">Tech:</span>
                <span className="text-slate-600 font-mono text-[9.5px] truncate">{item.tech}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ArchitecturePipelineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-50 rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white flex items-center justify-between border-b border-amber-500/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 uppercase">
                SIH26092 Architecture
              </span>
              <span className="text-xs text-amber-200/80 font-medium">SchemeMatch AI Platform</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              14-Step End-to-End Decision Pipeline
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Deterministic rule graph combined with multi-lingual conversational access
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with 14 Steps */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Full AI Pipeline Active: Natural Language Input → Multi-Factor Scored Output → Bank & Scheme Linkage.</span>
            </div>
            <span className="font-bold text-amber-800 hidden sm:inline">Zero Black-Box AI</span>
          </div>

          <PipelineGrid />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Compliant with Government of India MSME guidelines & JanSamarth portal API specifications.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-xl shadow-xs transition"
          >
            Close Pipeline Viewer
          </button>
        </div>

      </div>
    </div>
  );
}
