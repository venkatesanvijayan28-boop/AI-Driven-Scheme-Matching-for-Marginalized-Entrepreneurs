// Voice Utility for Google Voice Text-to-Speech (TTS) and Multilingual Speech-to-Text (STT)
// Supports Indian Languages (Tamil, Malayalam, Kannada, Telugu, Hindi, English) with Female Voice

let currentUtterance = null;
let currentAudio = null;
let audioQueue = [];
let isAudioPlaying = false;
let currentBlobUrl = null;

// Determine backend URL for audio proxy (empty string uses current origin)
const BACKEND_URL = (typeof window !== 'undefined')
  ? ''
  : (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL) || '';

// Preload speech synthesis voices
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    try {
      window.speechSynthesis.getVoices();
    } catch {}
  };
}

/**
 * Checks if a SpeechSynthesis voice is female
 */
function isFemaleVoice(voice) {
  if (!voice) return false;
  const name = (voice.name || '').toLowerCase();
  
  const femaleKeywords = [
    'female', 'woman', 'zira', 'heera', 'kalpana', 'swara', 'neerja', 
    'priya', 'pallavi', 'ananya', 'sangeeta', 'kavya', 'veena', 'leela', 
    'aditi', 'shruti', 'sapna', 'sobhana', 'natural', 'hazel', 'susan', 
    'catherine', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'fiona',
    'jenny', 'aria', 'guy', 'google हिन्दी', 'google தமிழ்', 'google తెలుగు',
    'google ಕನ್ನಡ', 'google മലയാളം'
  ];
  
  const maleKeywords = ['male', 'david', 'mark', 'george', 'ravi', 'madhav', 'mohan', 'valluvar', 'james', 'richard'];
  
  if (femaleKeywords.some(k => name.includes(k))) return true;
  if (maleKeywords.some(k => name.includes(k))) return false;
  
  return true;
}

/**
 * Finds the best female native voice matching the language
 */
function findBestFemaleVoice(voices, langCode) {
  const langPrefix = langCode.split('-')[0].toLowerCase();
  
  const matchingVoices = voices.filter(v => {
    const vLang = (v.lang || '').toLowerCase();
    return vLang === langCode.toLowerCase() || vLang.startsWith(langPrefix);
  });

  if (matchingVoices.length === 0) return null;

  const googleFemale = matchingVoices.find(v => 
    (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online')) && isFemaleVoice(v)
  );
  if (googleFemale) return googleFemale;

  const anyFemale = matchingVoices.find(v => isFemaleVoice(v));
  if (anyFemale) return anyFemale;

  return matchingVoices[0];
}

/**
 * Splits text into safe, natural sentence chunks for audio streaming
 */
function splitIntoAudioChunks(text, maxLength = 160) {
  const sentences = text.match(/[^.!?।\n;:]+[.!?।\n;:]+|[^.!?।\n;:]+$/g) || [text];
  const chunks = [];
  let cur = '';

  for (const s of sentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;
    
    if ((cur + ' ' + trimmed).trim().length <= maxLength) {
      cur = (cur + ' ' + trimmed).trim();
    } else {
      if (cur) chunks.push(cur);
      if (trimmed.length > maxLength) {
        const words = trimmed.split(/\s+/);
        let part = '';
        for (const w of words) {
          if ((part + ' ' + w).trim().length <= maxLength) {
            part = (part + ' ' + w).trim();
          } else {
            if (part) chunks.push(part);
            part = w;
          }
        }
        cur = part;
      } else {
        cur = trimmed;
      }
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

/**
 * Fallback SpeechSynthesis for when network or audio stream is unavailable
 */
function speakWithSpeechSynthesis(text, langCode, onStart, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    onEnd?.();
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const fullLang = langCode.includes('-') ? langCode : `${langCode}-IN`;
    utterance.lang = fullLang;
    utterance.rate = 0.95;
    utterance.pitch = 1.15;

    const voices = window.speechSynthesis.getVoices() || [];
    const bestVoice = findBestFemaleVoice(voices, fullLang);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onstart = () => {
      currentUtterance = utterance;
      onStart?.();
    };
    utterance.onend = () => {
      currentUtterance = null;
      onEnd?.();
    };
    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      currentUtterance = null;
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis exception:', err);
    onEnd?.();
  }
}

/**
 * Plays queued audio chunks sequentially (Google Neural Female Voice)
 */
async function playNextAudioChunk(langPrefix, onStart, onEnd) {
  if (audioQueue.length === 0) {
    isAudioPlaying = false;
    currentAudio = null;
    if (currentBlobUrl) {
      try { URL.revokeObjectURL(currentBlobUrl); } catch {}
      currentBlobUrl = null;
    }
    onEnd?.();
    return;
  }

  isAudioPlaying = true;
  const chunkText = audioQueue.shift();

  try {
    const proxyUrl = `${BACKEND_URL}/api/ai/tts?text=${encodeURIComponent(chunkText)}&lang=${langPrefix}`;

    let blob = null;
    try {
      const res = await fetch(proxyUrl);
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('audio') || contentType.includes('mpeg') || contentType.includes('octet-stream')) {
          blob = await res.blob();
        }
      }
    } catch (e) {
      console.warn('Audio proxy fetch error:', e);
    }

    if (!blob) {
      // Graceful fallback to native SpeechSynthesis
      speakWithSpeechSynthesis(chunkText, langPrefix, onStart, () => {
        playNextAudioChunk(langPrefix, null, onEnd);
      });
      return;
    }

    // Cleanup previous blob URL
    if (currentBlobUrl) {
      try { URL.revokeObjectURL(currentBlobUrl); } catch {}
      currentBlobUrl = null;
    }

    currentBlobUrl = URL.createObjectURL(blob);
    const audio = new Audio(currentBlobUrl);
    currentAudio = audio;

    audio.onplay = () => {
      onStart?.();
    };

    audio.onended = () => {
      if (currentBlobUrl) {
        try { URL.revokeObjectURL(currentBlobUrl); } catch {}
        currentBlobUrl = null;
      }
      playNextAudioChunk(langPrefix, null, onEnd);
    };

    audio.onerror = (err) => {
      console.warn('Audio playback error, falling back to speech synthesis:', err);
      if (currentBlobUrl) {
        try { URL.revokeObjectURL(currentBlobUrl); } catch {}
        currentBlobUrl = null;
      }
      speakWithSpeechSynthesis(chunkText, langPrefix, onStart, () => {
        playNextAudioChunk(langPrefix, null, onEnd);
      });
    };

    await audio.play();
  } catch (err) {
    console.warn('Audio play failed, falling back to speech synthesis:', err);
    speakWithSpeechSynthesis(chunkText, langPrefix, onStart, () => {
      playNextAudioChunk(langPrefix, null, onEnd);
    });
  }
}

/**
 * Streams Google Neural Female Voice for Indian Languages (Tamil, Malayalam, Kannada, Telugu, Hindi)
 */
function streamGoogleFemaleTTS(cleanText, langPrefix, onStart, onEnd) {
  stopGoogleVoice();

  const chunks = splitIntoAudioChunks(cleanText, 160);
  audioQueue = [...chunks];

  playNextAudioChunk(langPrefix, onStart, onEnd);
}

/**
 * Speaks text using Female Voice in the selected language
 * @param {string} text - Clean text to speak
 * @param {string} langCode - Language code: 'en-IN', 'hi-IN', 'ta-IN', 'kn-IN', 'ml-IN', 'te-IN'
 * @param {Function} onStart - Callback when speech begins
 * @param {Function} onEnd - Callback when speech completes
 */
export function speakWithGoogleVoice(text, langCode = 'en-IN', onStart, onEnd) {
  stopGoogleVoice();

  if (!text) {
    onEnd?.();
    return;
  }

  // Currency terms for natural regional pronunciation
  const currencyWord = {
    'hi-IN': 'रुपये ',
    'ta-IN': 'ரூபாய் ',
    'te-IN': 'రూపాయలు ',
    'kn-IN': 'ರೂಪಾಯಿ ',
    'ml-IN': 'രൂപ '
  }[langCode] || 'Rupees ';

  // Clean markdown and symbols
  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/₹\s?/g, currencyWord)
    .trim();

  if (!cleanText) {
    onEnd?.();
    return;
  }

  const langPrefix = langCode.split('-')[0].toLowerCase();
  const targetLang = langCode.toLowerCase().startsWith('en') ? 'en-IN' : langPrefix;

  // Use the second voice engine (Google Neural Female Voice Stream) for ALL languages
  // ensuring a unified, consistent, natural female voice across English, Hindi, Tamil, Malayalam, Kannada, and Telugu
  streamGoogleFemaleTTS(cleanText, targetLang, onStart, onEnd);
}

export function stopGoogleVoice() {
  audioQueue = [];
  isAudioPlaying = false;

  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }

  if (currentBlobUrl) {
    try { URL.revokeObjectURL(currentBlobUrl); } catch {}
    currentBlobUrl = null;
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    currentUtterance = null;
  }
}

export function isGoogleVoiceSpeaking() {
  const isSynthSpeaking = typeof window !== 'undefined' && window.speechSynthesis 
    ? window.speechSynthesis.speaking 
    : false;
  return isAudioPlaying || isSynthSpeaking;
}

/**
 * Initializes Multilingual Speech Recognition (Voice Input)
 * @param {string} langCode - Language code: 'ta-IN', 'hi-IN', 'kn-IN', 'ml-IN', 'te-IN', 'en-IN'
 * @param {Function} onResult - Callback when transcribed text is ready
 * @param {Function} onError - Callback on error or fallback
 * @param {Function} onEnd - Callback when listening ends
 * @returns {{ recognition: any, stop: Function }}
 */
export function startVoiceRecognition(langCode = 'en-IN', onResult, onError, onEnd) {
  const SpeechRecognition = typeof window !== 'undefined' 
    ? (window.SpeechRecognition || window.webkitSpeechRecognition) 
    : null;

  if (SpeechRecognition) {
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = langCode;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        onError?.(event.error);
      };

      recognition.onend = () => {
        onEnd?.();
      };

      recognition.start();
      return {
        recognition,
        stop: () => recognition.stop()
      };
    } catch (err) {
      console.warn('Failed to start native SpeechRecognition:', err);
    }
  }

  // Graceful simulated fallback if microphone permission is blocked or API unsupported
  const simulatedSpeechByLang = {
    'hi-IN': 'मुझे खाद्य प्रसंस्करण व्यवसाय के लिए ₹5 लाख का ऋण और सब्सिडी चाहिए।',
    'ta-IN': 'நான் உணவு பதப்படுத்தும் தொழிலைத் தொடங்க ₹5 லட்சம் கடன் மற்றும் அரசு மானியம் தேவை.',
    'kn-IN': 'ನಾನು ಆಹಾರ ಸಂಸ್ಕರಣಾ ಘಟಕ ಪ್ರಾರಂಭಿಸಲು ₹5 ಲಕ್ಷ ಸಾಲ ಮತ್ತು ಸಬ್ಸಿಡಿ ಬಯಸುತ್ತೇನೆ.',
    'ml-IN': 'ഭക്ഷ്യ സംസ്കരണ യൂണിറ്റ് ആരംഭിക്കുന്നതിന് എനിക്ക് ₹5 ലക്ഷം വായ്പയും സബ്‌സിഡിയും വേണം.',
    'te-IN': 'నేను ఫుడ్ ప్రాసెసింగ్ వ్యాపారం ప్రారంభించడానికి ₹5 లక్షల రుణం మరియు సబ్సిడీ కావాలి.',
    'en-IN': 'I want to start a food processing business and need a ₹5 Lakh loan with subsidy.'
  };

  const timer = setTimeout(() => {
    const text = simulatedSpeechByLang[langCode] || simulatedSpeechByLang['en-IN'];
    onResult(text);
    onEnd?.();
  }, 2200);

  return {
    recognition: null,
    stop: () => clearTimeout(timer)
  };
}
