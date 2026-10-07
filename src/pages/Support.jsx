import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getLocalizedFaqs } from '../data/mockFaqs';
import { NEARBY_BANKS, NEARBY_CSC_CENTERS } from '../data/mockCenters';
import BankFinderModal from '../components/roadmap/BankFinderModal';
import CSCFinderModal from '../components/roadmap/CSCFinderModal';
import DisclaimerNotice from '../components/common/DisclaimerNotice';
import { 
  HelpCircle, 
  Building2, 
  Building, 
  PhoneCall, 
  Mail, 
  Send, 
  ChevronDown, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Headphones,
  MapPin,
  Navigation
} from 'lucide-react';
import { getBrowserGeolocation, sortCentersByProximity } from '../utils/geoUtils';

export default function Support() {
  const { currentProfile, addToast, t, currentLangCode } = useApp();
  const [activeTab, setActiveTab] = useState('faqs'); // 'faqs' | 'banks' | 'csc' | 'contact'
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const [ticketForm, setTicketForm] = useState({
    subject: `Assistance with ${currentProfile.sector} Scheme Matching`,
    category: 'Eligibility Verification',
    message: ''
  });

  // Channel Finance Partner Geo-Router Filters (SIH Solution 3)
  const [channelCategoryFilter, setChannelCategoryFilter] = useState('ALL'); // 'ALL' | 'SCA' | 'PSB' | 'RRB' | 'NBFC-MFI'
  const [onlySafeRouters, setOnlySafeRouters] = useState(true);

  // Live GPS Geolocation State (Phase 8: Real Location)
  const [userCoords, setUserCoords] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState(null);

  const handleAcquireLocation = async () => {
    setIsLocating(true);
    setLocationNotice(null);
    try {
      const pos = await getBrowserGeolocation();
      setUserCoords({ latitude: pos.latitude, longitude: pos.longitude });
      addToast('Live GPS coordinates acquired! Centers sorted by nearest Haversine distance.', 'success');
      setLocationNotice(`GPS Live: ${pos.latitude.toFixed(4)}°N, ${pos.longitude.toFixed(4)}°E (±${Math.round(pos.accuracy)}m)`);
    } catch (err) {
      console.warn('Geolocation notice:', err.message);
      setLocationNotice(err.message);
      addToast(err.message, 'info');
    } finally {
      setIsLocating(false);
    }
  };

  const sortedPartners = React.useMemo(() => {
    return sortCentersByProximity(NEARBY_BANKS, userCoords);
  }, [userCoords]);


  const filteredChannelPartners = sortedPartners.filter(bank => {
    const matchesCategory = channelCategoryFilter === 'ALL' || bank.categoryCode === channelCategoryFilter;
    const matchesSafe = !onlySafeRouters || bank.routingEligibility === 'eligible';
    return matchesCategory && matchesSafe;
  });

  const [showBankModal, setShowBankModal] = useState(false);
  const [showCSCModal, setShowCSCModal] = useState(false);

  const localizedFaqs = getLocalizedFaqs(currentLangCode);

  const filteredFaqs = localizedFaqs.filter(f =>
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const ticketId = `TKT-SIH-${Math.floor(100000 + Math.random() * 900000)}`;
    addToast(`Support Ticket ${ticketId} created! Our MSME Desk Officer will respond within 24 hours.`, 'success');
    setTicketForm({ subject: '', category: 'Eligibility Verification', message: '' });
  };


  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t('support') || 'Support & Center Locator'}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
            Get personalized assistance, explore FAQs, or locate accredited Bank Desks and CSC Centers in {currentProfile.district}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3.5 py-2 rounded-2xl bg-slate-800 text-amber-300 border border-slate-700 flex items-center gap-2 shadow-sm">
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>Toll-Free: 1800-180-6763</span>
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'faqs'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{t('faqTab') || 'Frequently Asked Questions'}</span>
        </button>

        <button
          onClick={() => setActiveTab('banks')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'banks'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>{t('banksTab') || 'Participating Bank Desks'} ({NEARBY_BANKS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('csc')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'csc'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>{t('cscTab') || 'Nearby CSC Centers'} ({NEARBY_CSC_CENTERS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t('grievanceTab') || 'Submit Grievance / Query'}</span>
        </button>
      </div>

      {/* Tab 1: FAQs */}
      {activeTab === 'faqs' && (
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder={t('searchFaqPlaceholder') || 'Search scheme questions, subsidies, margin money, bank loans...'}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-slate-800/90 text-white border border-slate-700/80 rounded-2xl focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-medium"
            />
          </div>

          <div className="divide-y divide-slate-800 space-y-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="pt-3">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left py-2 gap-3 cursor-pointer group"
                  >
                    <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="py-2.5 px-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs text-slate-300 leading-relaxed mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Channel Partners (SCAs, PSBs, RRBs, NBFC-MFIs) */}
      {activeTab === 'banks' && (
        <div className="space-y-4">
          {/* Live GPS Proximity Router Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/30">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white">Live Haversine Proximity Router</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {locationNotice || `Showing centers for ${currentProfile.district}, ${currentProfile.state}. Click to pinpoint via device GPS.`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAcquireLocation}
              disabled={isLocating}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              {isLocating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span>Acquiring GPS...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{userCoords ? 'Refresh Live GPS' : 'Acquire Live Location'}</span>
                </>
              )}
            </button>
          </div>

          {/* Partner Category Filter Bar & Safe Router Safeguard */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex flex-wrap items-center gap-1.5">

              {[
                { id: 'ALL', label: 'All 100+ Partners' },
                { id: 'SCA', label: 'State Channelizing (SCAs)' },
                { id: 'PSB', label: 'Public Sector Banks' },
                { id: 'RRB', label: 'Regional Rural Banks' },
                { id: 'NBFC-MFI', label: 'NBFC-MFIs' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChannelCategoryFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    channelCategoryFilter === tab.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-xs'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer select-none bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <input
                type="checkbox"
                checked={onlySafeRouters}
                onChange={(e) => setOnlySafeRouters(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Only Verified Safe Routers (NPA &lt; 5%)</span>
            </label>
          </div>

          {/* Channel Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChannelPartners.map((bank, idx) => {
              const isRestricted = bank.routingEligibility === 'restricted';
              return (
                <div 
                  key={idx} 
                  className={`p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border shadow-xl space-y-3 transition ${
                    isRestricted ? 'border-rose-500/40 opacity-75' : 'border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0 ${
                        isRestricted ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-400/10 text-amber-400'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-white truncate">{bank.name || bank.bankName}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-amber-300 font-semibold">{bank.type}</span>
                          <span className="text-[10px] text-slate-400">• {bank.district || 'Coimbatore'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                      {bank.distance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{bank.address}</span>
                  </p>

                  {/* Fund Utilization & NPA Health Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-left">
                      <span className="text-[10px] font-bold text-slate-400 block">Fund Utilization</span>
                      <span className="text-xs font-black text-emerald-300 font-mono">{bank.fundUtilization || '92.0% (Normal)'}</span>
                    </div>
                    <div className={`p-2 rounded-xl border text-left ${
                      isRestricted 
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' 
                        : 'bg-slate-800/80 border-slate-700/60 text-amber-300'
                    }`}>
                      <span className="text-[10px] font-bold text-slate-400 block">NPA Status</span>
                      <span className="text-xs font-black font-mono">{bank.npaLabel || `${bank.npaRate}%`}</span>
                    </div>
                  </div>

                  {/* Supported Schemes Tags */}
                  {bank.supportedSchemes && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {bank.supportedSchemes.map((s, sIdx) => (
                        <span key={sIdx} className="text-[9.5px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Routing Status Banner */}
                  <div className={`py-1.5 px-3 rounded-xl text-[10.5px] font-bold flex items-center justify-between border ${
                    isRestricted 
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}>
                    <span>{bank.routingStatus || 'Active Verified Channel Router'}</span>
                    <span>{isRestricted ? '⚠️ Excluded' : '✓ Eligible'}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium truncate max-w-[60%]">
                      Officer: <strong className="text-white">{bank.contactPerson || bank.officer || 'Desk Head'}</strong>
                    </span>
                    <span className="text-amber-400 font-bold">{bank.phone}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: CSC Centers */}
      {activeTab === 'csc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEARBY_CSC_CENTERS.map((csc, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{csc.centerName}</h4>
                    <p className="text-xs text-emerald-300">VLE: {csc.vleName}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {csc.distance}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{csc.address}</span>
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Services: <strong className="text-white">{csc.services?.join(', ')}</strong></span>
                <span className="text-emerald-400 font-bold">{csc.phone}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Grievance / Query */}
      {activeTab === 'contact' && (
        <div className="bg-slate-900/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl max-w-2xl mx-auto space-y-5">
          <h3 className="text-base font-black text-white">Submit Direct Query to District MSME Desk</h3>
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                <option value="Eligibility Verification">Eligibility Verification</option>
                <option value="DPR Preparation Help">DPR Preparation Help</option>
                <option value="Bank Subsidy Claim">Bank Subsidy Claim</option>
                <option value="Technical Portal Issue">Technical Portal Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Your Message</label>
              <textarea
                rows="4"
                value={ticketForm.message}
                onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                placeholder="Describe your issue or query..."
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      )}

      {/* Disclaimer Notice */}
      <DisclaimerNotice />
    </div>
  );
}
