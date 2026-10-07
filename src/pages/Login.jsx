import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  KeyRound,
  Workflow,
  Globe,
  ChevronDown,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  X,
  User,
  Send,
  ArrowLeft,
  ExternalLink,
  MailCheck,
  AlertCircle
} from 'lucide-react';
import ArchitecturePipelineModal from '../components/common/ArchitecturePipelineModal';
import { getLoginTranslation } from '../data/loginTranslations.js';

export default function Login() {
  const [selectedPersonaId, setSelectedPersonaId] = useState(null); // No persona pre-selected by default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showSampleLogins, setShowSampleLogins] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Forgot password modal state: 'input_user' | 'link_sent' | 'reset_password'
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState('input_user');
  const [forgotEmail, setForgotEmail] = useState('');
  const [targetUserObj, setTargetUserObj] = useState(null);
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const { login, resetPassword, profiles, sampleProfiles, registeredUsers, addToast, languages, currentLangCode, setLanguage, selectedLang } = useApp();
  const navigate = useNavigate();

  const handleOpenForgotPassword = () => {
    setForgotEmail(email || '');
    setForgotNewPassword('');
    setForgotConfirmPassword('');
    setForgotError('');
    setForgotSuccess('');
    setForgotStep('input_user');
    setTargetUserObj(null);
    setShowForgotModal(true);
  };

  const handleSendResetLink = (e) => {
    e.preventDefault();
    setForgotError('');
    const cleanInput = forgotEmail.trim().toLowerCase();
    if (!cleanInput) {
      setForgotError('Please enter your User ID or registered Email.');
      return;
    }

    const userMatch = (registeredUsers || []).find(u => 
      (u.email || '').toLowerCase() === cleanInput || 
      (u.id || '').toLowerCase() === cleanInput
    );
    const profMatch = profiles.find(p => 
      p.id.toLowerCase() === cleanInput || 
      (p.email || '').toLowerCase() === cleanInput ||
      p.name.toLowerCase() === cleanInput
    );

    const found = userMatch || profMatch;
    if (!found) {
      setForgotError('No account found with this User ID or Email. Please check your spelling or register.');
      return;
    }

    const resolvedEmail = userMatch?.email || profMatch?.email || `${found.id}@schemematch.ai`;
    const resolvedId = found.id || found.profileId || cleanInput;
    const resolvedName = found.name || resolvedId;

    setTargetUserObj({
      id: resolvedId,
      email: resolvedEmail,
      name: resolvedName
    });

    addToast(`Password reset link sent to ${resolvedEmail}`, 'success');
    setForgotStep('link_sent');
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');

    if (!forgotNewPassword) {
      setForgotError('Please enter your new password.');
      return;
    }
    if (forgotNewPassword.length < 4) {
      setForgotError('Password must be at least 4 characters long.');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      setForgotError('Passwords do not match. Please verify.');
      return;
    }

    const targetAccountEmail = targetUserObj?.email || forgotEmail.trim();

    setIsResetting(true);
    const result = resetPassword(targetAccountEmail, forgotNewPassword);
    setIsResetting(false);

    if (result && result.success) {
      setForgotSuccess(result.message || 'Password updated successfully!');
      addToast('Password has been successfully updated! You can now log in.', 'success');
      setEmail(targetAccountEmail);
      setPassword(forgotNewPassword);
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep('input_user');
      }, 1400);
    } else {
      setForgotError(result?.error || 'Failed to reset password. Please check your credentials.');
    }
  };

  const tLogin = (key) => getLoginTranslation(key, currentLangCode);

  const handleSelectPersona = (profileId) => {
    setLoginError('');
    setSelectedPersonaId(profileId);
    setEmail(`${profileId}@schemematch.ai`);
    setPassword('password123');
    const target = profiles.find(p => p.id === profileId);
    if (target?.preferredLanguage) {
      const codeMap = { English: 'en', Tamil: 'ta', Hindi: 'hi', Kannada: 'kn', Malayalam: 'ml', Telugu: 'te' };
      if (codeMap[target.preferredLanguage]) {
        setLanguage(codeMap[target.preferredLanguage]);
      }
    }
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();
    
    // Strict Admin Credentials: ID: admin@123 or admin, Password: admin123
    if (cleanEmail === 'admin@123' || cleanEmail === 'admin' || cleanEmail === 'admin@schemematch.gov.in') {
      if (cleanPassword === 'admin123') {
        setLoginError('');
        await login('admin@123', 'admin123', 'admin', 'admin');
        navigate('/admin');
      } else {
        const errMsg = 'Invalid admin password. Please enter the correct password (admin123).';
        setLoginError(errMsg);
        addToast(errMsg, 'error');
      }
      return;
    }

    // Call async login with bcrypt verification & JWT issuance
    const result = await login(cleanEmail, cleanPassword);
    if (result && result.success) {
      setLoginError('');
      if (result.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      return;
    }

    const errMsg = result?.error || 'Account not found or incorrect credentials. Please verify or click "Create Account" below to register.';
    setLoginError(errMsg);
    addToast(errMsg, 'error');
  };

  const handlePersonaDirectLogin = async (profileId) => {
    const target = profiles.find(p => p.id === profileId);
    if (target?.preferredLanguage) {
      const codeMap = { English: 'en', Tamil: 'ta', Hindi: 'hi', Kannada: 'kn', Malayalam: 'ml', Telugu: 'te' };
      if (codeMap[target.preferredLanguage]) {
        setLanguage(codeMap[target.preferredLanguage]);
      }
    }
    await login(`${profileId}@schemematch.ai`, 'password123', 'user', profileId);
    navigate('/dashboard');
  };


  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col justify-start sm:justify-center py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto overscroll-contain">
      {/* Top Sovereign Tiranga Line */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF671F] via-[#F59E0B] to-[#046A38] z-50"></div>

      {/* Top Portal Banner */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            National AI Scheme Matching Portal
          </span>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden">
        
        {/* Left Side: Brand Narrative in Sovereign Slate & Gold */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-amber-500/20">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-slate-700/30 rounded-full blur-2xl"></div>

          <div>
            <div className="flex items-center gap-3">
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
                  SchemeMatch <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-extrabold">AI</span>
                </h1>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {tLogin('findSchemeHeading')}
              </h2>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {tLogin('leftSubtitle')}
              </p>
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{tLogin('feature1')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{tLogin('feature2')}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{tLogin('feature3')}</span>
              </div>
            </div>

            {/* HOW THIS PROJECT WORKS BUTTON */}
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowPipelineModal(true)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-300 font-bold text-xs transition group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Workflow className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition" />
                  <span>{tLogin('howItWorksBtn')}</span>
                </div>
                <span className="text-[11px] text-amber-200">{tLogin('viewDiagram')}</span>
              </button>
            </div>

            {/* CORE VALUE PROPOSITION CARD */}
            <div className="mt-4 p-3.5 bg-blue-50/90 border border-blue-200/80 rounded-2xl text-slate-800 shadow-2xs">
              <p className="font-extrabold text-xs text-blue-950 flex items-center gap-1.5">
                {tLogin('coreValProp')}
              </p>
              <p className="text-[11.5px] text-slate-700 leading-relaxed mt-1">
                {tLogin('coreValText')}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Portal Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {tLogin('accessPortal')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {tLogin('accessPortalSubtitle')}
                </p>
              </div>

              {/* Language Switcher & Evaluation Tag */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLangDropdown(!showLangDropdown)}
                    className="px-3 py-1.5 text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-amber-400 rounded-xl transition flex items-center gap-1.5 font-bold text-xs cursor-pointer shadow-xs"
                    aria-label="Select Language"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    <span>{selectedLang?.nativeName || 'English'}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showLangDropdown && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {tLogin('regionalLanguages')}
                      </div>
                      <div className="max-h-60 overflow-y-auto py-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              setLanguage(lang.code);
                              setShowLangDropdown(false);
                            }}
                            className={`w-full px-3 py-1.5 text-left text-xs font-semibold flex items-center justify-between hover:bg-amber-50/70 transition ${
                              currentLangCode === lang.code ? 'text-amber-900 bg-amber-100/60 font-bold' : 'text-slate-700'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className="text-xs">{lang.nativeName}</span>
                              <span className="text-[10px] text-slate-400">{lang.name}</span>
                            </div>
                            {currentLangCode === lang.code && (
                              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MULTIPLE SAMPLE ENTREPRENEUR LOGINS SECTION (COLLAPSIBLE / HIDDEN BY DEFAULT) */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowSampleLogins(!showSampleLogins)}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-400/30 text-slate-800 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <span>{tLogin('sampleLoginsHeader')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                  <span>{showSampleLogins ? 'Hide Profiles' : 'Choose Sample Profile'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showSampleLogins ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {showSampleLogins && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 animate-in fade-in duration-200">
                  {(sampleProfiles || profiles).map((p) => {
                    const isSelected = selectedPersonaId === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelectPersona(p.id)}
                        className={`group text-left p-2.5 rounded-2xl transition-all duration-150 flex items-start gap-2.5 relative overflow-hidden cursor-pointer ${
                          isSelected 
                            ? 'border-2 border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/30' 
                            : 'bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0 transition ${
                          isSelected ? 'bg-amber-400 text-slate-950 scale-105' : 'bg-amber-50 border border-amber-200 text-slate-800'
                        }`}>
                          {p.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs font-bold transition truncate ${
                              isSelected ? 'text-amber-950 font-black' : 'text-slate-900 group-hover:text-amber-800'
                            }`}>
                              {p.name}
                            </p>
                            {isSelected ? (
                              <span className="text-[9.5px] font-extrabold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-md border border-emerald-300">
                                {tLogin('selectedBadge')}
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePersonaDirectLogin(p.id);
                                }}
                                className="text-[10px] font-bold text-amber-600 opacity-0 group-hover:opacity-100 transition hover:underline"
                              >
                                {tLogin('loginArrow')}
                              </button>
                            )}
                          </div>
                          <p className="text-[10.5px] font-medium text-slate-600 truncate">
                            {p.businessName}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1 text-[9.5px] text-slate-500">
                            <span className="bg-slate-100 px-1.5 py-0.2 rounded text-slate-700 font-medium">
                              {p.state}
                            </span>
                            <span className="bg-amber-50 text-amber-900 px-1.5 py-0.2 rounded font-semibold border border-amber-200/60">
                              {p.fundingRequired}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {showSampleLogins && (
              <div className="my-5 relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-slate-50 px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider absolute">
                  {tLogin('orSignInWithCreds')}
                </span>
              </div>
            )}

            {/* Standard Form Login */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5" autoComplete="off">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tLogin('userIdLabel')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    id="portal_user_id_input"
                    name="portal_user_id_input"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder={tLogin('userIdPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {tLogin('passwordLabel')}
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenForgotPassword}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline cursor-pointer transition"
                  >
                    {tLogin('forgotPassword')}
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="portal_password_input"
                    name="portal_password_input"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder={tLogin('passwordPlaceholder')}
                    className={`w-full pl-10 pr-10 py-2.5 text-xs bg-white border rounded-xl focus:bg-white focus:outline-none transition font-medium ${
                      loginError 
                        ? 'border-rose-500 text-rose-950 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 bg-rose-50/20' 
                        : 'border-slate-200 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500'
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 transition focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-slate-400" />}
                  </button>
                </div>
                {loginError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold mt-1.5 animate-in fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600 cursor-pointer">
                  {tLogin('rememberMe')}
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/30 shadow-sm transition cursor-pointer"
              >
                <span>{tLogin('loginButton')}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            {tLogin('newEntrepreneur')}{' '}
            <Link to="/register" className="font-bold text-amber-700 hover:underline">
              {tLogin('createAccount')}
            </Link>
          </p>
        </div>

      </div>

      {/* Forgot / Reset Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative overflow-hidden">
            {/* Top Accent Stripe */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 absolute top-0 left-0 right-0"></div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setForgotStep('input_user');
              }}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STEP 1: Enter User ID / Email */}
            {forgotStep === 'input_user' && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Forgot Password</h3>
                    <p className="text-xs text-slate-500">Enter your User ID or Email to receive your reset link</p>
                  </div>
                </div>

                {forgotError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span>{forgotError}</span>
                  </div>
                )}

                <form onSubmit={handleSendResetLink} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      User ID or Registered Email
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="Enter your user ID (e.g. ravi) or email"
                        className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition font-medium"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/30 shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Reset Link</span>
                      <Send className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* STEP 2: Link Sent to Mail with Clickable Reset Button */}
            {forgotStep === 'link_sent' && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <MailCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Reset Link Sent to Mail</h3>
                    <p className="text-xs text-slate-500">A password change link was dispatched</p>
                  </div>
                </div>

                <div className="mb-4 p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-amber-900">
                    <span>Target Email:</span>
                    <span className="font-bold text-slate-900">{targetUserObj?.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-amber-900">
                    <span>User ID:</span>
                    <span className="font-mono bg-white px-1.5 py-0.5 rounded text-amber-800 border border-amber-200">
                      {targetUserObj?.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-800 pt-1">
                    We've simulated sending the secure reset link to your inbox. Click the verified link below to set your new password.
                  </p>
                </div>

                {/* Clickable Password Reset Link */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotError('');
                      setForgotStep('reset_password');
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-amber-950 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 hover:from-amber-200 hover:to-amber-300 border border-amber-300 shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-700" />
                    <span>Click Here to Reset Password →</span>
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setForgotStep('input_user')}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Try another User ID</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3: Set New Password */}
            {forgotStep === 'reset_password' && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Set New Password</h3>
                    <p className="text-xs text-slate-500">
                      For <span className="font-semibold text-slate-800">{targetUserObj?.email || forgotEmail}</span>
                    </p>
                  </div>
                </div>

                {forgotError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span>{forgotError}</span>
                  </div>
                )}

                {forgotSuccess && (
                  <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{forgotSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showForgotPass ? 'text' : 'password'}
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="Enter at least 4 characters"
                        className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition font-medium"
                        required
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotPass(!showForgotPass)}
                        className="absolute right-3.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 transition focus:outline-none cursor-pointer"
                      >
                        {showForgotPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showForgotPass ? 'text' : 'password'}
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setForgotStep('link_sent')}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isResetting}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-amber-500/30 shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isResetting ? 'Saving...' : 'Set New Password'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* 14-Step Decision Pipeline Architecture Modal */}
      <ArchitecturePipelineModal
        isOpen={showPipelineModal}
        onClose={() => setShowPipelineModal(false)}
      />
    </div>
  );
}
