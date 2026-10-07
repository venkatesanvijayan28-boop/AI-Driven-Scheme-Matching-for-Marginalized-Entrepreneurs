export const CHATBOT_GREETINGS = {
  en: 'Namaste! I am your AI Scheme Advisor. Tell me about your business idea, required funding, or state to discover eligible government subsidies and credit schemes.',
  ml: 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI സ്കീം അഡ്വൈസറാണ്. നിങ്ങളുടെ ബിസിനസ്സ് ആശയം, ആവശ്യമായ വായ്പ, പ്രായം എന്നിവ വ്യക്തമാക്കൂ; യോജിച്ച സർക്കാർ സബ്‌സിഡികളും വായ്പകളും ഞങ്ങൾ കണ്ടെത്താം.',
  ta: 'வணக்கம்! நான் உங்கள் AI திட்ட ஆலோசகர். உங்கள் தொழில் திட்டம், தேவையான கடன் தொகை, வயது அல்லது இருப்பிடம் பற்றி கூறுங்கள்; தகுதியான அரசு மானியங்களை கண்டறிவோம்.',
  hi: 'नमस्ते! मैं आपका AI योजना सलाहकार हूँ। अपने व्यवसाय के विचार, आवश्यक ऋण राशि या आयु के बारे में बताएं ताकि हम उपयुक्त सरकारी सब्सिडी और ऋण योजनाओं की पहचान कर सकें।',
  kn: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AI ಯೋಜನೆ ಸಲಹೆಗಾರ. ನಿಮ್ಮ ವ್ಯಾಪಾರ ಕಲ್ಪನೆ, ಅಗತ್ಯವಿರುವ ಸಾಲದ ಮೊತ್ತ ಅಥವಾ ವಯಸ್ಸಿನ ಬಗ್ಗೆ ತಿಳಿಸಿ; ಸೂಕ್ತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕೋಣ.',
  te: 'నమస్కారం! నేను మీ AI స్కీమ్ సలహాదారుని. మీ వ్యాపార ఆలోచన, అవసరమైన రుణ మొత్తం లేదా వయస్సు గురించి చెప్పండి; తగిన ప్రభుత్వ పథకాలను మేము గుర్తిస్తాము.'
};

export function generateAIChatResponse(queryText, langCode, profile, schemes) {
  const q = (queryText || '').toLowerCase();
  const name = profile?.name || 'Entrepreneur';
  const business = profile?.businessName || 'Enterprise';
  const state = profile?.state || 'India';
  const top1 = schemes[0]?.shortName || 'PMEGP';
  const top1Score = schemes[0]?.matchScore || 95;
  const top2 = schemes[1]?.shortName || 'PMFME';
  const top2Score = schemes[1]?.matchScore || 90;

  // 1. Food Processing & Agriculture
  if (
    q.includes('food') || q.includes('spices') || q.includes('agro') ||
    q.includes('ഭക്ഷ്യ') || q.includes('മസാല') ||
    q.includes('உணவு') || q.includes('மசாலா') ||
    q.includes('खाद्य') || q.includes('मसाले') ||
    q.includes('ಆಹಾರ') || q.includes('ಮಸಾಲೆ') ||
    q.includes('ఆహార') || q.includes('మసాలా')
  ) {
    const textMap = {
      en: `Based on your food & agro enterprise (${business} in ${state}), I recommend **PMFME** and **PMEGP**! You are eligible for up to **35% credit-linked capital subsidy** (up to ₹10 Lakh grant under PMFME and ₹17.5 Lakh under PMEGP).`,
      ml: `നിങ്ങളുടെ ഭക്ഷ്യ സംസ്കരണ സംരംഭത്തിനായി (${business}, ${state}), **PMFME പദ്ധതിയും** **PMEGP യും** ഏറ്റവും അനുയോജ്യമാണ്! നിങ്ങൾക്ക് **35% വരെ മൂലധന സബ്‌സിഡി** (പരമാവധി ₹10 ലക്ഷം മുതൽ ₹17.5 ലക്ഷം വരെ) ലഭിക്കാൻ അർഹതയുണ്ട്.`,
      ta: `உங்கள் உணவு மற்றும் வேளாண்மை வணிகத் தேவைக்காக (${business}), **PMFME திட்டம்** மற்றும் **PMEGP** முதன்மைப் பொருத்தங்களாக கண்டறியப்பட்டுள்ளன! நீங்கள் **35% வரை மூலதன மானியம்** பெறத் தகுதியுடையவர்கள்.`,
      hi: `आपकी खाद्य प्रसंस्करण इकाई (${business}) के लिए, **PMFME योजना** और **PMEGP** शीर्ष प्राथमिकताएं हैं! आप ग्रामीण क्षेत्रों में **35% तक पूंजीगत सब्सिडी** के पात्र हैं।`,
      kn: `ನಿಮ್ಮ ಆಹಾರ ಸಂಸ್ಕರಣಾ ಘಟಕಕ್ಕಾಗಿ (${business}), **PMFME ಯೋಜನೆ** ಮತ್ತು **PMEGP** ಪ್ರಮುಖ ಆಯ್ಕೆಗಳಾಗಿವೆ! ನೀವು **35% ವರೆಗೆ ಬಂಡವಾಳ ಸಬ್ಸಿಡಿ** ಪಡೆಯಬಹುದು.`,
      te: `మీ ఫుడ్ ప్రాసెసింగ్ వ్యాపారం కోసం (${business}), **PMFME పథకం** మరియు **PMEGP** ఉత్తమ సరిపోలికలు! మీరు **35% వరకు మూలధన రాయితీ** పొందవచ్చు.`
    };
    return {
      text: textMap[langCode] || textMap.en,
      matchedSchemes: schemes.filter(s => s.id === 'pmfme-scheme' || s.id === 'pmegp')
    };
  }

  // 2. Loans / MUDRA / Collateral-Free / Funding amounts
  if (
    q.includes('loan') || q.includes('mudra') || q.includes('collateral') || q.includes('lakh') ||
    q.includes('വായ്പ') || q.includes('മുദ്ര') || q.includes('ലക്ഷം') ||
    q.includes('கடன்') || q.includes('முத்ரா') || q.includes('லட்சம்') ||
    q.includes('ऋण') || q.includes('मुद्रा') || q.includes('लाख') ||
    q.includes('ಸಾಲ') || q.includes('ಮುದ್ರಾ') || q.includes('ಲಕ್ಷ') ||
    q.includes('రుణం') || q.includes('ముద్రా') || q.includes('లక్ష')
  ) {
    const textMap = {
      en: `For collateral-free business financing, **Pradhan Mantri MUDRA Yojana (PMMY)** and **CGTMSE credit guarantee** are ideal. Under MUDRA Kishore, you can obtain loans up to ₹5 Lakh without third-party guarantee or property mortgage.`,
      ml: `ഈടില്ലാത്ത ബിസിനസ്സ് വായ്പയ്ക്കായി, **പ്രധാനമന്ത്രി മുദ്ര യോജനയും (MUDRA)** **CGTMSE ക്രെഡിറ്റ് ഗ്യാരണ്ടിയും** ഏറ്റവും അനുയോജ്യമാണ്. മുദ്ര കിഷോർ വിഭാഗത്തിൽ ₹5 ലക്ഷം വരെ യാതൊരു വസ്തു ഈടും ഇല്ലാതെ വായ്പ ലഭിക്കും.`,
      ta: `சொத்து பிணையில்லா கடன் தேவைக்கு, **பிரதான் மந்திரி முத்ரா யோஜனா** மற்றும் **CGTMSE கடன் உத்தரவாதம்** மிகவும் பொருத்தமானவை. முத்ரா திட்டத்தின் கீழ் ரூ. 5 லட்சம் வரை பிணையில்லா கடன் பெறலாம்.`,
      hi: `बिना किसी संपत्ति बंधक के ऋण के लिए, **प्रधानमंत्री मुद्रा योजना (PMMY)** और **CGTMSE क्रेडिट गारंटी** सर्वोत्तम विकल्प हैं। मुद्रा योजना में ₹5 लाख तक का ऋण बिना किसी बंधक के मिलता है।`,
      kn: `ಮೇಲಾಧಾರ ರಹಿತ ಸಾಲಕ್ಕಾಗಿ, **ಪ್ರಧಾನ ಮಂತ್ರಿ ಮುದ್ರಾ ಯೋಜನೆ (MUDRA)** ಮತ್ತು **CGTMSE ಕ್ರೆಡಿಟ್ ಗ್ಯಾರಂಟಿ** ಸೂಕ್ತವಾಗಿವೆ. ಮುದ್ರಾ ಅಡಿಯಲ್ಲಿ ₹5 ಲಕ್ಷದವರೆಗೆ ಆಸ್ತಿ ಅಡಮಾನವಿಲ್ಲದೆ ಸಾಲ ಪಡೆಯಬಹುದು.`,
      te: `హామీ లేని వ్యాపార రుణం కోసం, **ప్రధాన మంత్రి ముద్రా యోజన (PMMY)** మరియు **CGTMSE క్రెడిట్ గ్యారెంటీ** ఉత్తమమైనవి. ముద్రా కింద ₹5 లక్షల వరకు ఆస్తి తాకట్టు లేకుండా రుణం పొందవచ్చు.`
    };
    return {
      text: textMap[langCode] || textMap.en,
      matchedSchemes: schemes.filter(s => s.id === 'mudra-pmmy' || s.id === 'cgtmse')
    };
  }

  // 3. Women / SC / ST / Minorities Special Quota
  if (
    q.includes('women') || q.includes('sc') || q.includes('st') || q.includes('stand-up') ||
    q.includes('സ്ത്രീ') || q.includes('വനിത') || q.includes('പട്ടികജാതി') ||
    q.includes('பெண்') || q.includes('மகளிர்') || q.includes('ஆதிதிராவிடர்') ||
    q.includes('महिला') || q.includes('अनुसूचित') ||
    q.includes('ಮಹಿಳಾ') || q.includes('ಪರಿಶಿಷ್ಟ') ||
    q.includes('మహిళ') || q.includes('ఎస్సీ') || q.includes('ఎస్టీ')
  ) {
    const textMap = {
      en: `For Women and SC/ST entrepreneurs, **Stand-Up India** offers bank loans from ₹10 Lakh to ₹1 Crore with composite support, and **National SC-ST Hub (NSSH)** provides a 25% capital subsidy on machinery.`,
      ml: `വനിതകൾക്കും SC/ST സംരംഭകർക്കുമായി **സ്റ്റാൻഡ്-അപ്പ് ഇന്ത്യ** ₹10 ലക്ഷം മുതൽ ₹1 കോടി വരെ ബാങ്ക് വായ്പ നൽകുന്നു. കൂടാതെ **NSSH പദ്ധതി** മെഷിനറികൾക്ക് 25% മൂലധന സബ്‌സിഡി ലഭ്യമാക്കുന്നു.`,
      ta: `பெண்கள் மற்றும் SC/ST தொழில்முனைவோருக்காக, **ஸ்டாண்ட்-அப் இந்தியா திட்டம்** ரூ. 10 லட்சம் முதல் ரூ. 1 கோடி வரை கடன் வழங்குகிறது. **NSSH திட்டம்** இயந்திரங்களுக்கு 25% மானியம் வழங்குகிறது.`,
      hi: `महिला एवं SC/ST उद्यमियों के लिए, **स्टैंड-अप इंडिया** ₹10 लाख से ₹1 करोड़ तक का ऋण देती है, और **NSSH योजना** मशीनरी पर 25% पूंजीगत सब्सिडी प्रदान करती है।`,
      kn: `ಮಹಿಳೆಯರು ಮತ್ತು SC/ST ಉದ್ಯಮಿಗಳಿಗಾಗಿ **ಸ್ಟ್ಯಾಂಡ್‌-ಅಪ್ ಇಂಡಿಯಾ** ₹10 ಲಕ್ಷದಿಂದ ₹1 ಕೋಟಿವರೆಗೆ ಸಾಲ ನೀಡುತ್ತದೆ. **NSSH ಯೋಜನೆ** ಯಂತ್ರೋಪಕರಣಗಳಿಗೆ 25% ಸಬ್ಸಿಡಿ ನೀಡುತ್ತದೆ.`,
      te: `మహిళలు మరియు SC/ST వ్యవస్థాపకుల కోసం **స్టాండ్-అప్ ఇండియా** ₹10 లక్షల నుండి ₹1 కోటి వరకు రుణం అందిస్తుంది. **NSSH పథకం** యంత్రాలపై 25% సబ్సిడీ ఇస్తుంది.`
    };
    return {
      text: textMap[langCode] || textMap.en,
      matchedSchemes: schemes.filter(s => s.id === 'standup-india' || s.id === 'nssh-sc-st-hub')
    };
  }

  // 4. Age / Eligibility / General Inquiry Fallback
  const textMap = {
    en: `Based on profile evaluation for **${name}** in **${state}**, I found **${schemes.length} matching government schemes**. Top priority recommendations are **${top1}** (${top1Score}% match) and **${top2}** (${top2Score}% match). You are eligible for affirmative subsidies up to 35%!`,
    ml: `**${name}** എന്നയാളുടെ പ്രൊഫൈൽ (${state}) പരിശോധിച്ചതിൽ, **${schemes.length} യോജിച്ച സർക്കാർ പദ്ധതികൾ** കണ്ടെത്തിയിട്ടുണ്ട്. പ്രധാന ശുപാർശകൾ: **${top1}** (${top1Score}% പൊരുത്തം), **${top2}** (${top2Score}% പൊരുത്തം). നിങ്ങൾക്ക് 35% വരെ സബ്‌സിഡിക്ക് അർഹതയുണ്ട്!`,
    ta: `**${name}** அவர்களது சுயவிவரத்தின்படி (${state}), **${schemes.length} பொருத்தமான அரசு திட்டங்கள்** கண்டறியப்பட்டுள்ளன. முதன்மையான திட்டங்கள்: **${top1}** (${top1Score}% பொருத்தம்) மற்றும் **${top2}** (${top2Score}% பொருத்தம்). 35% வரை மானியம் பெற தகுதியுடையவர்கள்!`,
    hi: `**${name}** की प्रोफाइल (${state}) के विश्लेषण अनुसार, **${schemes.length} सरकारी योजनाएं** आपके अनुकूल पाई गई हैं। शीर्ष योजनाएं: **${top1}** (${top1Score}% मिलान) और **${top2}** (${top2Score}% मिलान)। आप 35% तक सब्सिडी के पात्र हैं!`,
    kn: `**${name}** ಅವರ ಪ್ರೊಫೈಲ್ (${state}) ಪ್ರಕಾರ, **${schemes.length} ಹೊಂದಾಣಿಕೆಯಾಗುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು** ಲಭ್ಯವಿವೆ. ಮುಖ್ಯ ಯೋಜನೆಗಳು: **${top1}** (${top1Score}% ಹೊಂದಾಣಿಕೆ) ಮತ್ತು **${top2}** (${top2Score}% ಹೊಂದಾಣಿಕೆ). 35% ವರೆಗೆ ಸಬ್ಸಿಡಿ ಪಡೆಯಬಹುದು!`,
    te: `**${name}** ప్రొఫైల్ (${state}) ఆధారంగా, **${schemes.length} సరిపోయే ప్రభుత్వ పథకాలు** గుర్తించబడ్డాయి. అగ్ర సిఫార్సులు: **${top1}** (${top1Score}% సరిపోలిక) మరియు **${top2}** (${top2Score}% సరిపోలిక). మీరు 35% వరకు రాయితీ పొందవచ్చు!`
  };

  return {
    text: textMap[langCode] || textMap.en,
    matchedSchemes: schemes.slice(0, 2)
  };
}
