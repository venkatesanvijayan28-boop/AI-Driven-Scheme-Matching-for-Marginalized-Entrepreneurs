import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  UserCircle2, 
  Sparkles, 
  Compass, 
  FileCheck2, 
  Milestone, 
  HelpCircle, 
  Building2,
  ChevronRight,
  ShieldCheck,
  Zap,
  X,
  Briefcase
} from 'lucide-react';
import { getInvestorUITranslation } from '../../data/investorTranslations';

export default function Sidebar({ isOpen, onClose }) {
  const { currentProfile, currentLangCode, t } = useApp();

  const navItems = [
    { label: t('dashboard'), path: '/dashboard', icon: LayoutDashboard },
    { label: t('myProfile'), path: '/profile', icon: UserCircle2, badge: `${currentProfile.completionPercentage}%` },
    { label: t('schemeFinder'), path: '/scheme-finder', icon: Sparkles, highlight: true },
    { label: t('recommendations'), path: '/recommendations', icon: Compass },
    { label: getInvestorUITranslation('investorMatching', currentLangCode), path: '/recommendations?tab=investors', icon: Briefcase },
    { label: t('documents'), path: '/documents', icon: FileCheck2, badge: `${currentProfile.documentsReadyCount}/${currentProfile.documentsTotalCount}` },
    { label: t('roadmap'), path: '/roadmap', icon: Milestone },
    { label: t('support'), path: '/support', icon: HelpCircle },
  ];

  return (
    <>
      {/* Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/75 z-40 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Slide-out Navigation Drawer */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50
          w-80 bg-slate-900/95 backdrop-blur-2xl border-r border-slate-800/90 shadow-2xl
          flex flex-col justify-between py-6 px-5 shrink-0 overflow-y-auto overscroll-contain
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="space-y-5">
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Menu & Profile
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Profile Status Glass Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 border border-amber-500/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner shrink-0">
                {currentProfile.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-black text-white truncate">{currentProfile.name}</p>
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <p className="text-[11px] font-bold text-amber-300 truncate mt-0.5">
                  {currentProfile.businessName}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {currentProfile.category} · {currentProfile.state}
                </p>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="mt-3.5 pt-3 border-t border-slate-700/60">
              <div className="flex justify-between items-center text-[10.5px] mb-1.5 font-bold">
                <span className="text-slate-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  {t('profileReadiness')}
                </span>
                <span className="text-amber-400">{currentProfile.completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${currentProfile.completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1.5">
            <div className="px-3 pb-2 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
              {t('menuNav')}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-1.5 rounded-xl transition
                          ${isActive 
                            ? 'bg-slate-950/20 text-slate-950' 
                            : item.highlight 
                              ? 'bg-amber-400/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950' 
                              : 'text-slate-400 group-hover:text-amber-300'
                          }
                        `}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="tracking-tight">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`
                          text-[10px] font-bold px-2 py-0.5 rounded-full transition
                          ${isActive
                            ? 'bg-slate-950 text-amber-300 font-extrabold'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 group-hover:border-slate-600'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sovereign & Security Badges */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 text-[11px] text-slate-400">
            <div className="flex items-center gap-2 font-bold text-slate-200 mb-1">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>{t('moMsmeLeadBank')}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              {t('deterministicDesc')}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
