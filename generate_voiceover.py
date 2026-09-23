import asyncio
import edge_tts

VOICE = "en-IN-NeerjaNeural"  # Professional Indian English Female Voice
OUTPUT_FILE = "schemematch_ai_official_voiceover.mp3"

SCRIPT = """
Every year, thousands of aspiring micro-entrepreneurs in India miss out on life-changing government subsidies simply because of complex jargon, language barriers, and fragmented portals.

Welcome to SchemeMatch AI, engineered for Smart India Hackathon SIH26092.

Our platform bridges this gap with an explainable fourteen-step AI pipeline, native voice intelligence, and complete multilingual access across six Indian languages, including English, Hindi, Tamil, Kannada, Malayalam, and Telugu.

Upon logging in, entrepreneurs see their personalized command center. Rather than overwhelming users with raw policy text, our algorithm calculates their exact subsidy entitlement.

Watch as our real-time Capital Forecaster recalculates instant bank EMI, five percent own margin contribution, and capital subsidies up to thirty-five percent under PMEGP as we adjust the project scale.

For first-time founders who cannot type complex queries, we introduce the AI Scheme Finder, powered by Google Gemini 3.6 Flash.

Entrepreneurs can simply speak in their native tongue or tap regional query chips. Our system performs multi-parameter retrieval-augmented matching and reads the solution aloud in their native dialect, turning complex policy into conversational guidance.

Under Recommendations, users explore nineteen verified Central and State programs, each connected directly to official ministry application portals with zero middleman risk.

Uniquely, SchemeMatch AI includes a Dual-Engine Investor Matcher, seamlessly pairing businesses with both government grants and vetted Tier A, B, and C angel networks for holistic capital growth.

Over seventy percent of subsidy applications fail due to documentation errors. Our Document Hub validates required certificates and generates bank-ready Detailed Project Reports.

The seven-stage Roadmap guides entrepreneurs step-by-step to the nearest Common Service Center and Lead Bank branch until funds are deposited into their account.

For government and nodal officers, our secure Admin Console provides end-to-end scheme lifecycle management. Backed by a live Supabase cloud database, administrators can introduce new state incentives, update subsidy guidelines, and audit citizen applications in real time.

From rural women artisans to tech innovators, SchemeMatch AI turns government welfare into real economic momentum.

Inclusive. Explainable. Sovereign.

Thank you!
"""

async def main():
    print(f"Generating official voiceover using {VOICE}...")
    communicate = edge_tts.Communicate(SCRIPT.strip(), VOICE, rate="-4%", pitch="+0Hz")
    await communicate.save(OUTPUT_FILE)
    print(f"Voiceover saved successfully to {OUTPUT_FILE}!")

if __name__ == "__main__":
    asyncio.run(main())
