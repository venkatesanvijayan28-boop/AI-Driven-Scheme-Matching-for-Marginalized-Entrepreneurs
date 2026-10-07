/**
 * Gemini AI Scheme Advisory Service for SchemeMatch AI (SIH26092)
 * Secure Architecture: Proxies requests through Express Backend (POST /api/ai/chat)
 * ZERO API keys exposed in the React frontend bundle.
 */

import { generateAIChatResponse } from '../data/chatbotTranslations';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Ask Google Gemini AI via Express Backend for personalized scheme matching & advisory
 * @param {string} userQuery - The user's typed or spoken question
 * @param {object} profile - Active entrepreneur persona profile
 * @param {Array} schemes - Current available schemes database
 * @param {string} langCode - Language code ('en', 'hi', 'ta', 'kn', 'ml', 'te')
 * @returns {Promise<{text: string, matchedSchemes: Array, isLiveAI: boolean, model?: string}>}
 */
export async function askGeminiSchemeAdvisor(userQuery, profile = {}, schemes = [], langCode = 'en') {
  try {
    const payload = {
      message: userQuery,
      profile,
      language: langCode,
      schemes: schemes.map(s => ({
        id: s.id,
        name: s.name,
        shortName: s.shortName,
        sector: s.sector,
        maxFunding: s.maxFunding,
        subsidyRate: s.subsidyRate
      }))
    };

    const response = await fetch(`${BACKEND_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Backend AI Chat Proxy returned HTTP ${response.status}:`, errText);
      throw new Error(`AI Gateway responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.text) {
      return {
        text: data.text.trim(),
        matchedSchemes: data.matchedSchemes || [],
        isLiveAI: data.isLiveAI !== false,
        model: data.model || 'gemini-3.6-flash'
      };
    }

    throw new Error(data.error || 'Invalid response from AI gateway');
  } catch (error) {
    console.warn('Backend AI proxy unavailable, engaging localized SchemeMatch fallback:', error.message);
    const fallback = generateAIChatResponse(userQuery, langCode, profile, schemes);
    return {
      text: fallback.text,
      matchedSchemes: fallback.matchedSchemes,
      isLiveAI: false,
      error: error.message
    };
  }
}
