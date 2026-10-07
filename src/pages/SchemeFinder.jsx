import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MatchScoreBadge from '../components/common/MatchScoreBadge';
import { startVoiceRecognition } from '../utils/voiceUtils';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  Compass, 
  ArrowRight, 
  Volume2, 
  VolumeX,
  ShieldCheck,
  Zap,
  Cpu
} from 'lucide-react';

// Lightweight markdown text renderer for AI responses
function formatAIMessageText(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const cleanLine = line.trim();
    if (!cleanLine) return <div key={idx} className="h-1.5" />;
    
    if (cleanLine.startsWith('### ')) {
      return (
        <h4 key={idx} className="font-bold text-amber-300 text-xs sm:text-sm mt-2 mb-1">
          {cleanLine.replace('### ', '')}
        </h4>
      );
    }
    if (cleanLine.startsWith('## ')) {
      return (
        <h3 key={idx} className="font-black text-amber-400 text-sm sm:text-base mt-2.5 mb-1">
          {cleanLine.replace('## ', '')}
        </h3>
      );
    }
    if (cleanLine.startsWith('---')) {
      return <hr key={idx} className="border-slate-700/60 my-2" />;
    }

    const isBullet = cleanLine.startsWith('* ') || cleanLine.startsWith('- ') || /^\d+\.\s/.test(cleanLine);
    const content = isBullet ? cleanLine.replace(/^(\*|-|\d+\.)\s+/, '') : cleanLine;
    const parts = content.split(/(\*\*.*?\*\*)/g);

    return (
      <div key={idx} className={isBullet ? 'flex items-start gap-2 ml-1 text-slate-200' : 'text-slate-200'}>
        {isBullet && <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>}
        <span className="leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-amber-300 font-bold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      </div>
    );
  });
}

export default function SchemeFinder() {
  const { 
    chatMessages, 
    sendChatMessage, 
    isTyping, 
    currentProfile, 
    selectedLangObj, 
    currentLangCode,
    t,
    speakText,
    currentlySpeakingId,
    stopSpeech,
    addToast 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Dynamic prompts based on selected language
  const suggestedPromptsByLang = {
    en: [
      'I want to start a food processing business and need ₹5 Lakh funding',
      'Which schemes am I eligible for as an OBC/SC entrepreneur in Tamil Nadu?',
      'Are there private or CSR opportunities like JioGenNext or Reliance Foundation?',
      'What is the maximum capital subsidy for rural manufacturing under PMEGP?'
    ],
    hi: [
      'मुझे खाद्य प्रसंस्करण इकाई शुरू करने के लिए ₹5 लाख का ऋण चाहिए',
      'ग्रामीण क्षेत्र में विनिर्माण इकाई के लिए PMEGP सब्सिडी क्या है?',
      'MUDRA और CGTMSE के तहत बिना बंधक ऋण कैसे मिलेगा?',
      'महिला एवं SC/ST उद्यमियों के लिए कौन सी विशेष योजनाएं हैं?'
    ],
    ta: [
      'நான் உணவு பதப்படுத்தும் தொழிலைத் தொடங்க ₹5 லட்சம் கடன் தேவை',
      'கிராமப்புற தொழில்முனைவோருக்கு PMEGP மானியம் எவ்வளவு?',
      'முத்ரா திட்டத்தின் கீழ் பிணையில்லா கடன் பெறுவது எப்படி?',
      'தமிழ்நாட்டில் மகளிர் தொழில்முனைவோருக்கான சிறப்பு திட்டங்கள் யாவை?'
    ],
    kn: [
      'ಆಹಾರ ಸಂಸ್ಕರಣಾ ಘಟಕಕ್ಕೆ ₹5 ಲಕ್ಷ ಸಾಲ ಮತ್ತು ಸಬ್ಸಿಡಿ ಬೇಕು',
      'PMEGP ಅಡಿಯಲ್ಲಿ ಗ್ರಾಮೀಣ ಪ್ರದೇಶದ ಸಬ್ಸಿಡಿ ನಿಯಮಗಳೇನು?',
      'MUDRA ಯೋಜನೆಯಡಿ ಮೇಲಾಧಾರ ರಹಿತ ಸಾಲ ಹೇಗೆ ಪಡೆಯುವುದು?'
    ],
    ml: [
      'ഭക്ഷ്യ സംസ്കരണ യൂണിറ്റിനായി ₹5 ലക്ഷം വായ്പയും സബ്‌സിഡിയും വേണം',
      'PMEGP പ്രകാരം ഗ്രാമീണ സംരംഭങ്ങൾക്കുള്ള സബ്‌സിഡി എത്രയാണ്?',
      'മുദ്ര വായ്പയ്ക്ക് എങ്ങനെ അപേക്ഷിക്കാം?'
    ],
    te: [
      'ఫుడ్ ప్రాసెసింగ్ వ్యాపారం కోసం ₹5 లక్షల రుణం మరియు సబ్సిడీ కావాలి',
      'PMEGP పథకం కింద గ్రామీణ రాయితీ వివరాలు ఏమిటి?',
      'ముద్రా యోజన కింద హామీ లేని రుణం ఎలా పొందాలి?',
      'మహిళా మరియు SC/ST పారిశ్రామికవేత్తల కోసం ప్రత్యేక పథకాలు ఏమిటి?'
    ]
  };

  const prompts = suggestedPromptsByLang[currentLangCode] || suggestedPromptsByLang.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  const handlePromptClick = (prompt) => {
    sendChatMessage(prompt);
  };

  // Google Voice Input (Speech Recognition)
  const toggleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      addToast(`Google Voice Listening in ${selectedLangObj.nativeName} (${selectedLangObj.voiceLang})... Speak now!`, 'info');

      recognitionRef.current = startVoiceRecognition(
        selectedLangObj.voiceLang || 'en-IN',
        (transcribedText) => {
          setInputText(transcribedText);
          setIsListening(false);
          addToast(`Voice captured: "${transcribedText}"`, 'success');
        },
        (err) => {
          console.warn('Voice recognition fallback trigger:', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    }
  };

  return (
    <div className="space-y-4 pb-8 flex flex-col h-[calc(100vh-6.5rem)]">
      {/* Top Title Banner */}
      <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-amber-950/60 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {t('finderTitle') || 'AI Scheme Finder'}
                </h1>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <Zap className="w-3 h-3 text-cyan-300" />
                  Google Gemini 3.6 Flash Connected
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Voice Active ({selectedLangObj.nativeName})
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('finderSubtitle') || 'Tell us about your business in natural language and we will identify relevant government schemes.'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/recommendations')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 rounded-2xl text-xs font-bold border border-slate-700 transition shrink-0 cursor-pointer shadow-md"
        >
          <Compass className="w-4 h-4" />
          <span>{t('viewAll') || 'View All Schemes'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 shrink-0 hidden sm:inline">
          {t('suggestedQueries') || 'Suggested'}:
        </span>
        {prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptClick(prompt)}
            className="px-3.5 py-2 rounded-2xl bg-slate-900/80 hover:bg-slate-800 hover:border-amber-400/50 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 shadow-md whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 bg-slate-900/85 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-y-auto space-y-4">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeakingThis = currentlySpeakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs shrink-0 shadow-md ${
                  isUser
                    ? 'bg-amber-400 text-slate-950 font-black text-sm'
                    : 'bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 text-amber-400'
                }`}
              >
                {isUser ? currentProfile.avatar : <Bot className="w-5 h-5 text-amber-400" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-3xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-lg relative group ${
                  isUser
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold rounded-tr-xs shadow-amber-500/10'
                    : 'bg-slate-800/90 border border-slate-700/80 text-slate-200 rounded-tl-xs'
                }`}
              >
                {/* Voice Speaker Button for AI Messages */}
                {!isUser && (
                  <button
                    onClick={() => speakText(msg.text, msg.id)}
                    className={`absolute right-3 top-3 p-1.5 rounded-xl transition cursor-pointer ${
                      isSpeakingThis
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'text-slate-400 hover:text-amber-400 hover:bg-slate-700/80'
                    }`}
                    title={isSpeakingThis ? t('stopVoice') : t('listenVoice')}
                    aria-label="Read message aloud with Google Voice"
                  >
                    {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}

                {/* Live Gemini Badge */}
                {!isUser && msg.isLiveAI !== false && (
                  <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-slate-700/60">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      <Zap className="w-2.5 h-2.5 text-cyan-300" />
                      Gemini 3.6 Flash
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Live Government Scheme Advisor
                    </span>
                  </div>
                )}

                <div className="space-y-2 pr-6">
                  {isUser ? msg.text : formatAIMessageText(msg.text)}
                </div>

                {/* Embedded Schemes Cards if available in response */}
                {msg.schemes && msg.schemes.length > 0 && (
                  <div className="mt-4 pt-3.5 border-t border-slate-700/60 space-y-2.5">
                    <p className="text-[11px] font-black text-amber-300 uppercase tracking-wider">
                      {t('recommendedForYou') || 'Matched Government Schemes'}:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.schemes.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => navigate(`/schemes/${s.id}`)}
                          className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-700 hover:border-amber-400 hover:shadow-xl cursor-pointer transition flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 uppercase">
                                {s.shortName}
                              </span>
                              <MatchScoreBadge score={s.matchScore} size="sm" />
                            </div>
                            <h4 className="text-xs font-black text-white group-hover:text-amber-300 transition line-clamp-1">
                              {s.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                              {s.potentialBenefit}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10.5px] text-amber-400 font-bold">
                            <span>{t('viewDetails') || 'View Details'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => navigate('/recommendations')}
                        className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t('viewAll') || 'View All Schemes'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className={`mt-2 text-[10px] ${
                    isUser ? 'text-slate-950/70 text-right font-medium' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-300 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></div>
              <span className="font-bold text-[11px] text-amber-300">Evaluating government scheme criteria...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar with Google Voice Input Microphone */}
      <div className="bg-slate-900/90 rounded-3xl p-3 border border-slate-800 shadow-2xl shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2.5">
          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-3 rounded-2xl transition flex items-center justify-center cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-lg ring-4 ring-rose-300 scale-105'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
            }`}
            title={`Speak in ${selectedLangObj.nativeName} with Google Voice Recognition`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isListening
                ? `${t('speakInLanguage')} (${selectedLangObj.nativeName})`
                : t('typePlaceholder')
            }
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-slate-800/90 border border-slate-700/80 rounded-2xl text-white placeholder:text-slate-400 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400/60 font-medium"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 disabled:opacity-40 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t('sendQuery') || 'Send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
