/**
 * AI Chat Controller for SchemeMatch AI Backend (SIH26092)
 * Powered by Google Gemini AI (Proxy Endpoint)
 */

import dotenv from 'dotenv';
dotenv.config();

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

const LANGUAGE_NAMES = {
  en: 'English',
  hi: 'Hindi (हिंदी)',
  ta: 'Tamil (தமிழ்)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  te: 'Telugu (తెలుగు)'
};

export const handleAIChat = async (req, res) => {
  try {
    const { message, profile = {}, language = 'en', schemes = [] } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message query is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        error: 'Gemini API key is not configured on the server',
        isLiveAI: false
      });
    }

    const languageName = LANGUAGE_NAMES[language] || 'English';

    const systemPrompt = `
You are SchemeMatch AI, the official AI Government Scheme Advisor for the Ministry of MSME & Department of Financial Services (Smart India Hackathon SIH26092).
Your goal is to guide marginalized and micro-entrepreneurs (SC, ST, OBC, Women, Minorities, Rural artisans, and Startups) to the exact government subsidies, collateral-free credit schemes, and official application portals.

CURRENT ENTREPRENEUR PROFILE:
- Name: ${profile?.name || 'Entrepreneur'}
- Social Category / Caste: ${profile?.category || 'General / Special Category'}
- Gender: ${profile?.gender || 'Not specified'}
- Enterprise Sector: ${profile?.sector || 'Manufacturing / Services / Agro'}
- Location: ${profile?.location || 'Rural / Semi-urban'}, State: ${profile?.state || 'India'}
- Target Investment / Loan Need: ₹${profile?.fundingNeeded ? (profile.fundingNeeded / 100000).toFixed(1) + ' Lakh' : '5-25 Lakh'}
- Annual Turnover / Income: ₹${profile?.annualTurnover ? (profile.annualTurnover / 100000).toFixed(1) + ' Lakh' : '₹3.2 Lakh'}

KEY OFFICIAL SCHEMES KNOWLEDGE BASE & PORTAL DIRECTORY:
1. PMEGP (Prime Minister’s Employment Generation Programme): Up to 35% Capital Subsidy in Rural (25% Urban) for SC/ST/OBC/Women. Own contribution only 5%.
2. Stand-Up India Scheme: ₹10 Lakh to ₹1 Crore greenfield enterprise bank loans for SC/ST & Women entrepreneurs.
3. National SC-ST Hub (NSSH): 25% upfront capital subsidy up to ₹25 Lakh + 100% reimbursement for certifications.
4. PM SVANidhi: Micro-loans (₹10,000 to ₹50,000) with 7% interest subsidy for street vendors.
5. PMFME Scheme: 35% credit-linked capital subsidy up to ₹10 Lakh for micro food processing.
6. Pradhan Mantri MUDRA Yojana (PMMY): Shishu (up to ₹50k), Kishor (₹50k-₹5L), Tarun (up to ₹20L) collateral-free.
7. CGTMSE: Up to ₹5 Crore collateral-free credit guarantee coverage.
8. PM Vishwakarma Scheme: ₹15,000 toolkit voucher + 5% concessional credit up to ₹3 Lakh for traditional artisans.

RESPONSE GUIDELINES:
1. Address the entrepreneur warmly by name (${profile?.name || 'Entrepreneur'}).
2. Highlight specific subsidy percentages, loan limits, and own contribution based on their profile.
3. Provide 2-3 specific actionable next steps (documents required / official portal links).
4. STRICT LANGUAGE REQUIREMENT: You MUST respond in ${languageName}.
5. Keep the response concise, authoritative, and empowering (around 120-200 words).
`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${systemPrompt}\n\nUSER QUESTION: "${message}"\nPlease provide your helpful scheme advisory in ${languageName}.`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 900,
        topP: 0.95
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Gemini API HTTP Error ${response.status}:`, errText);
      return res.status(response.status).json({
        success: false,
        error: `Gemini API call failed with status ${response.status}`,
        details: errText
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return res.status(500).json({
        success: false,
        error: 'No text returned in Gemini response'
      });
    }

    // Match relevant schemes from provided schemes
    const matched = filterMatchedSchemes(message + ' ' + replyText, schemes);

    return res.status(200).json({
      success: true,
      text: replyText.trim(),
      matchedSchemes: matched,
      isLiveAI: true,
      model: GEMINI_MODEL,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error in AI Chat Controller:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error processing AI chat',
      details: err.message
    });
  }
};

/**
 * Filter matching schemes based on user query and response
 */
function filterMatchedSchemes(text, schemes = []) {
  if (!schemes || schemes.length === 0) return [];
  const lower = text.toLowerCase();

  const matched = schemes.filter(s => {
    const id = (s.id || '').toLowerCase();
    const shortName = (s.shortName || '').toLowerCase();

    if ((lower.includes('pmegp') || lower.includes('employment generation')) && (id.includes('pmegp') || shortName.includes('pmegp'))) return true;
    if ((lower.includes('svanidhi') || lower.includes('street vendor')) && (id.includes('svanidhi') || shortName.includes('svanidhi'))) return true;
    if ((lower.includes('agri') || lower.includes('aif')) && (id.includes('agri') || shortName.includes('aif'))) return true;
    if ((lower.includes('cgss') || lower.includes('startup guarantee')) && (id.includes('cgss') || shortName.includes('cgss'))) return true;
    if ((lower.includes('sfurti') || lower.includes('cluster')) && (id.includes('sfurti') || shortName.includes('sfurti'))) return true;
    if ((lower.includes('sc-st hub') || lower.includes('nssh')) && (id.includes('nssh') || shortName.includes('nssh'))) return true;
    if ((lower.includes('pmfme') || lower.includes('food')) && (id.includes('pmfme') || shortName.includes('pmfme'))) return true;
    if ((lower.includes('mudra') || lower.includes('kishor')) && (id.includes('mudra') || shortName.includes('mudra'))) return true;
    if ((lower.includes('stand-up') || lower.includes('standup')) && (id.includes('standup') || shortName.includes('standup') || id.includes('stand-up'))) return true;
    if ((lower.includes('cgtmse') || lower.includes('credit guarantee')) && (id.includes('cgtmse') || shortName.includes('cgtmse'))) return true;
    if ((lower.includes('vishwakarma') || lower.includes('artisan')) && (id.includes('vishwakarma') || shortName.includes('vishwakarma'))) return true;

    return false;
  });

  return matched.length > 0 ? matched.slice(0, 3) : schemes.slice(0, 2);
}

/**
 * Proxy Google TTS Audio Stream for Indian Languages
 */
export const handleTTSProxy = async (req, res) => {
  try {
    const { text, lang = 'en' } = req.query;
    if (!text) {
      return res.status(400).send('Text parameter is required');
    }

    const shortLang = lang.split('-')[0].toLowerCase();
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${shortLang}&client=tw-ob`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });

    if (!response.ok) {
      return res.status(response.status).send('TTS upstream error');
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error('TTS Proxy Error:', err);
    return res.status(500).send(err.message);
  }
};
