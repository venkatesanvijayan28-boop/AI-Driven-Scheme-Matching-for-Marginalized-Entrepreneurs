import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { startVoiceRecognition } from '../../utils/voiceUtils';
import { 
  Search, 
  Bell, 
  Globe, 
  LogOut, 
  ChevronDown, 
  Menu, 
  Check,
  Volume2,
  VolumeX,
  Crown,
  UserCircle2,
  FileCheck2,
  Milestone,
  Mic,
  X,
  Sparkles
} from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const { 
    currentProfile, 
    logout, 
    currentLangCode,
    selectedLangObj,
    languages,
    setLanguage,
    t,
    currentlySpeakingId,
    stopSpeech,
    addToast
  } = useApp();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceSearching, setIsVoiceSearching] = useState(false);
  const voiceRecRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recommendations?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVoiceSearchClick = () => {
    if (isVoiceSearching) {
      voiceRecRef.current?.stop();
      setIsVoiceSearching(false);
      return;
    }

    setIsVoiceSearching(true);
    addToast(`Listening for voice input in ${selectedLangObj.nativeName}... Speak now!`, 'info');

    voiceRecRef.current = startVoiceRecognition(
      selectedLangObj.voiceLang || 'en-IN',
      (transcript) => {
        if (transcript) {
          setSearchQuery(transcript);
          setIsVoiceSearching(false);
          addToast(`Voice recognized: "${transcript}"`, 'success');
          navigate(`/recommendations?search=${encodeURIComponent(transcript.trim())}`);
        }
      },
      (err) => {
        console.warn('Voice search error:', err);
        setIsVoiceSearching(false);
      },
      () => {
        setIsVoiceSearching(false);
      }
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 shadow-xl text-slate-100 shrink-0">
      {/* Top Sovereign Tri-Color Line */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF671F] via-[#F59E0B] to-[#046A38]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Left: Round Profile Avatar Trigger & Brand */}
          <div className="flex items-center gap-3">
            {/* Round Shape Profile Button (Getup Profile) */}
            <button
              onClick={onToggleSidebar}
              className="flex items-center gap-2.5 p-1 sm:p-1.5 pr-2.5 sm:pr-3 rounded-full bg-slate-800/90 hover:bg-slate-750 border-2 border-amber-400 hover:border-amber-300 text-left transition shadow-lg shadow-amber-500/15 cursor-pointer group shrink-0"
              title="Click to Open Profile & 7 Menu Features"
            >
              {/* Circular Avatar with Glowing Ring & Online Indicator */}
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-lg sm:text-xl shadow-md group-hover:scale-105 transition font-black border-2 border-slate-900 shrink-0">
                  {currentProfile.avatar}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
              </div>

              {/* Profile Details Tag */}
              <div className="flex flex-col min-w-0 pr-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-white truncate group-hover:text-amber-300 transition">
                    {currentProfile.name}
                  </span>
                  <span className="text-[9.5px] font-black px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                    {currentProfile.completionPercentage}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 truncate max-w-[100px] sm:max-w-[130px] font-medium">
                  {currentProfile.businessName}
                </span>
              </div>
              
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition ml-0.5" />
            </button>
          </div>

          {/* Center: Futuristic Voice & Text Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isVoiceSearching ? `🎙️ Listening in ${selectedLangObj.nativeName}... speak now` : t('searchPlaceholder')}
                className={`w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm bg-slate-800/80 border rounded-2xl focus:bg-slate-800 focus:outline-none focus:ring-2 transition text-white placeholder:text-slate-400 ${
                  isVoiceSearching 
                    ? 'border-amber-400 bg-amber-500/10 focus:ring-amber-400/50 text-amber-200 placeholder:text-amber-300 font-bold' 
                    : 'border-slate-700/80 focus:ring-amber-500/40 focus:border-amber-400/60'
                }`}
              />
              
              {/* Right Action Icons (Clear & Animated Microphone) */}
              <div className="absolute right-2 top-2 flex items-center gap-1.5">
                {searchQuery && !isVoiceSearching && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  onClick={handleVoiceSearchClick}
                  className={`p-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                    isVoiceSearching
                      ? 'bg-rose-500 text-white animate-pulse shadow-lg ring-2 ring-rose-300 scale-110'
                      : 'text-amber-400 hover:text-slate-950 hover:bg-amber-400 bg-slate-700/60'
                  }`}
                  title={isVoiceSearching ? 'Listening... click to stop' : `Voice search in ${selectedLangObj.nativeName}`}
                  aria-label="Voice Search"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Action Controls, Language Selector & Corner Profile Avatar */}
          <div className="flex items-center gap-2.5 sm:gap-3">

            {/* Speaking Status Pill */}
            {currentlySpeakingId && (
              <button
                onClick={stopSpeech}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold shadow-md animate-pulse cursor-pointer"
                title="Google Voice speaking. Click to stop."
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Active</span>
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            )}

            {/* MULTILINGUAL LANGUAGE SELECTOR */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowProfileDropdown(false);
                  setShowNotifications(false);
                }}
                className="px-3 py-2 text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-2xl transition flex items-center gap-2 font-bold text-xs cursor-pointer shadow-sm"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline font-semibold">{selectedLangObj.nativeName}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">
                    Regional Indian Languages
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setShowLangDropdown(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-800 transition ${
                          currentLangCode === lang.code ? 'text-amber-400 bg-amber-500/10 font-bold' : 'text-slate-200'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs">{lang.nativeName}</span>
                          <span className="text-[10px] text-slate-400">{lang.name}</span>
                        </div>
                        {currentLangCode === lang.code && (
                          <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* NOTIFICATIONS BELL */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileDropdown(false);
                  setShowLangDropdown(false);
                }}
                className="p-2.5 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-2xl transition relative cursor-pointer shadow-sm"
                aria-label="View Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Live Notifications</span>
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-800/60 max-h-64 overflow-y-auto text-xs">
                    <div className="p-3 hover:bg-slate-800/60 transition">
                      <p className="font-bold text-amber-300">PMEGP 35% Capital Subsidy Active</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Rural manufacturing category qualifies for high subsidy ceiling.</p>
                      <span className="text-[9.5px] text-slate-500 mt-1 block">10 mins ago</span>
                    </div>
                    <div className="p-3 hover:bg-slate-800/60 transition">
                      <p className="font-bold text-emerald-400">Aadhaar e-KYC Verified</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Document readiness score elevated to 85%.</p>
                      <span className="text-[9.5px] text-slate-500 mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ROUND CORNER AVATAR PROFILE BUTTON */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowLangDropdown(false);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-amber-500/40 hover:border-amber-400 transition cursor-pointer shadow-md group"
                aria-label="User Profile Menu"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-xs group-hover:scale-105 transition">
                  {currentProfile.avatar || currentProfile.name.charAt(0)}
                </div>
                <div className="text-left hidden xl:block">
                  <div className="text-xs font-bold text-white group-hover:text-amber-300 transition leading-tight">
                    {currentProfile.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-amber-400/90 font-semibold truncate max-w-[90px]">
                    {currentProfile.state}
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Entrepreneur Info Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-2xl">
                      {currentProfile.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-white truncate">{currentProfile.name}</p>
                      <p className="text-[11px] text-amber-300 font-medium truncate">{currentProfile.businessName}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                          {currentProfile.category}
                        </span>
                        <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                          {currentProfile.completionPercentage}% Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-2.5 space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                      <div className="flex items-center gap-2">
                        <UserCircle2 className="w-4 h-4 text-amber-400" />
                        <span>My Entrepreneur Profile</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400">Edit →</span>
                    </Link>

                    <Link
                      to="/documents"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-slate-400" />
                        <span>Document Readiness</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{currentProfile.documentsReadyCount}/{currentProfile.documentsTotalCount}</span>
                    </Link>

                    <Link
                      to="/roadmap"
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
                    >
                      <div className="flex items-center gap-2">
                        <Milestone className="w-4 h-4 text-slate-400" />
                        <span>Application Roadmap</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-400">Track →</span>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-slate-800 pt-2">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
