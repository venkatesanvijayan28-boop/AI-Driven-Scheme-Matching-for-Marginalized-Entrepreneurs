import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/schemeTranslations.js');
let content = fs.readFileSync(filePath, 'utf8');

const newSchemes = `
  // 9. ASPIRE Scheme
  'aspire-scheme': {
    en: {
      name: 'A Scheme for Promotion of Innovation, Rural Industries & Entrepreneurship (ASPIRE)',
      shortName: 'ASPIRE Scheme',
      department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      nodalAgency: 'SIDBI / NSIC / Coir Board / KVIC',
      sector: 'Agro-rural Industry, Rural Entrepreneurship & Technology Incubation',
      maxFunding: 'Up to ₹1 Crore for LBI setup / ₹1.5 Crore for TBI setup',
      potentialBenefit: 'Free hands-on incubation training, access to high-tech agro-processing machinery, seed funding, and market mentorship for rural youth.',
      subsidyRate: '100% one-time grant of up to ₹1 Crore for plant and machinery procurement for Livelihood Business Incubators (LBIs)',
      marginMoney: 'Host institution provides space and utilities',
      description: 'Facilitates market-driven enterprise creation and employment generation by establishing Livelihood Business Incubators (LBIs) and Technology Business Incubators (TBIs) in agro-rural industries.',
      whyMatchedReasons: [
        'Enables rural entrepreneurs and youth to incubate micro-enterprises with zero upfront machinery cost.',
        '100% financial grant for setting up specialized incubation centres in agro-rural clusters.',
        'Provides structured skill development, commercialization support, and seed capital.',
        'Strong focus on automation, rural manufacturing, and food value addition.'
      ],
      requiredDocuments: [
        'Host Institution registration / charter certificate',
        'DPR detailing proposed incubation infrastructure and budget outlay',
        'Land / space allotment proof',
        'Institutional audited accounts for the past 3 years'
      ]
    },
    ml: {
      name: 'നവീകരണവും ഗ്രാമീണ വ്യവസായങ്ങളും പ്രോത്സാഹിപ്പിക്കുന്നതിനുള്ള പദ്ധതി (ASPIRE)',
      shortName: 'അസ്പയർ പദ്ധതി (ASPIRE)',
      department: 'സൂക്ഷ്മ, ചെറുകിട, ഇടത്തരം സംരംഭ മന്ത്രാലയം (MSME)',
      nodalAgency: 'SIDBI / NSIC / കയർ ബോർഡ് / KVIC',
      sector: 'കാർഷിക-ഗ്രാമീണ വ്യവസായം, ഗ്രാമീണ സംരംഭകത്വം & സാങ്കേതിക ഇൻകുബേഷൻ',
      maxFunding: 'LBI സജ്ജീകരണത്തിന് ₹1 കോടി വരെ / TBI സജ്ജീകരണത്തിന് ₹1.5 കോടി വരെ',
      potentialBenefit: 'സൗജന്യ ഇൻകുബേഷൻ പരിശീലനം, അത്യാധുനിക അഗ്രോ-പ്രോസസ്സിംഗ് മെഷിനറി, സീഡ് ഫണ്ടിംഗ്, വിപണി മാർഗ്ഗനിർദ്ദേശം.',
      subsidyRate: 'ലൈവ്‌ലിഹുഡ് ബിസിനസ്സ് ഇൻകുബേറ്ററുകൾക്കായി (LBI) പ്ലാന്റും മെഷിനറിയും വാങ്ങാൻ ₹1 കോടി വരെ 100% ഒറ്റത്തവണ ഗ്രാന്റ്',
      marginMoney: 'ഹോസ്റ്റ് സ്ഥാപനം സ്ഥലവും സൗകര്യങ്ങളും നൽകുന്നു',
      description: 'കാർഷിക-ഗ്രാമീണ വ്യവസായങ്ങളിൽ ബിസിനസ്സ് ഇൻകുബേറ്ററുകൾ സ്ഥാപിച്ച് തൊഴിലവസരങ്ങളും പുതിയ സംരംഭങ്ങളും സൃഷ്ടിക്കുന്നു.',
      whyMatchedReasons: [
        'ഗ്രാമീണ സംരംഭകർക്ക് മുൻകൂർ മെഷിനറി ചെലവില്ലാതെ മൈക്രോ സംരംഭങ്ങൾ ആരംഭിക്കാൻ സഹായിക്കുന്നു.',
        'അഗ്രോ-റൂറൽ ക്ലസ്റ്ററുകളിൽ ഇൻകുബേഷൻ കേന്ദ്രങ്ങൾ സ്ഥാപിക്കുന്നതിന് 100% സാമ്പത്തിക ഗ്രാന്റ്.',
        'ഘടനാപരമായ നൈപുണ്യ വികസനം, വാണിജ്യവൽക്കരണ പിന്തുണ, സീഡ് കാപ്പിറ്റൽ എന്നിവ നൽകുന്നു.',
        'ഓട്ടോമേഷൻ, ഗ്രാമീണ നിർമ്മാണം, ഭക്ഷ്യ മൂല്യവർദ്ധനവ് എന്നിവയിൽ ശക്തമായ ശ്രദ്ധ.'
      ],
      requiredDocuments: [
        'ഹോസ്റ്റ് സ്ഥാപന രജിസ്ട്രേഷൻ / ചാർട്ടർ സർട്ടിഫിക്കറ്റ്',
        'നിർദ്ദിഷ്ട ഇൻകുബേഷൻ ഇൻഫ്രാസ്ട്രക്ചറും ബജറ്റും വ്യക്തമാക്കുന്ന ഡിപിആർ (DPR)',
        'സ്ഥലം / കെട്ടിട അനുവദിച്ചതിന്റെ രേഖ',
        'കഴിഞ്ഞ 3 വർഷത്തെ ഓഡിറ്റ് ചെയ്ത സാമ്പത്തിക കണക്കുകൾ'
      ]
    },
    ta: {
      name: 'புதுமை, கிராமப்புற தொழில்கள் & தொழில்முனைவோர் மேம்பாட்டுத் திட்டம் (ASPIRE)',
      shortName: 'அஸ்பயர் திட்டம் (ASPIRE)',
      department: 'நுண், சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)',
      nodalAgency: 'SIDBI / NSIC / கயிறு வாரியம் / KVIC',
      sector: 'வேளாண்-கிராமப்புற தொழில், கிராமப்புற தொழில்முனைவு & தொழில்நுட்ப இன்குபேஷன்',
      maxFunding: 'LBI அமைப்பதற்கு ₹1 கோடி வரை / TBI அமைப்பதற்கு ₹1.5 கோடி வரை',
      potentialBenefit: 'இலவச தொழில் இன்குபேஷன் பயிற்சி, உயர் தொழில்நுட்ப வேளாண் இயந்திரங்கள் மற்றும் விதை மூலதன ஆதரவு.',
      subsidyRate: 'இயந்திரங்கள் வாங்குவதற்கு ₹1 கோடி வரை 100% நேரடி மானிய நிதி உதவி',
      marginMoney: 'நிறுவனம் இடம் மற்றும் அடிப்படை வசதிகளை வழங்குகிறது',
      description: 'வேளாண் மற்றும் கிராமப்புற தொழில்களில் இன்குபேட்டர்களை நிறுவி வேலைவாய்ப்பை உருவாக்குகிறது.',
      whyMatchedReasons: [
        'கிராமப்புற இளைஞர்கள் இயந்திர முதலீடின்றி புதிய தொழில் தொடங்க உதவுகிறது.',
        'சிறப்பு இன்குபேஷன் மையங்களை அமைக்க 100% நேரடி மானியம்.',
        'திறன் மேம்பாடு, சந்தைப்படுத்தல் மற்றும் ஆரம்ப நிதி வழங்குகிறது.'
      ],
      requiredDocuments: [
        'நிறுவனப் பதிவுச் சான்றிதழ்',
        'விரிவான திட்ட அறிக்கை (DPR)',
        'இட ஒதுக்கீட்டு ஆவணம்',
        'கடந்த 3 ஆண்டுகளுக்கான தணிக்கை கணக்குகள்'
      ]
    },
    hi: {
      name: 'नवाचार, ग्रामीण उद्योग और उद्यमिता संवर्धन योजना (ASPIRE)',
      shortName: 'एस्पायर योजना (ASPIRE)',
      department: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME)',
      nodalAgency: 'SIDBI / NSIC / कॉयर बोर्ड / KVIC',
      sector: 'कृषि-ग्रामीण उद्योग, ग्रामीण उद्यमिता एवं प्रौद्योगिकी ऊष्मायन',
      maxFunding: 'LBI हेतु ₹1 करोड़ तक / TBI हेतु ₹1.5 करोड़ तक',
      potentialBenefit: 'मुफ्त व्यावहारिक ऊष्मायन प्रशिक्षण, उन्नत मशीनरी तक पहुंच, सीड फंडिंग और बाजार मेंटरशिप।',
      subsidyRate: 'संयंत्र और मशीनरी की खरीद के लिए ₹1 करोड़ तक 100% वित्तीय अनुदान',
      marginMoney: 'होस्ट संस्थान स्थान और सुविधाएं प्रदान करता है',
      description: 'कृषि-ग्रामीण उद्योगों में बिजनेस इनक्यूबेटरों की स्थापना के माध्यम से रोजगार और उद्यमिता का सृजन।',
      whyMatchedReasons: [
        'ग्रामीण उद्यमियों को बिना किसी अग्रिम मशीनरी लागत के सूक्ष्म उद्यम शुरू करने में सक्षम बनाता है।',
        'विशेष इनक्यूबेशन केंद्र स्थापित करने के लिए 100% वित्तीय अनुदान।'
      ],
      requiredDocuments: [
        'संस्थान पंजीकरण प्रमाण पत्र',
        'विस्तृत परियोजना रिपोर्ट (DPR)',
        'भूमि / भवन आवंटन प्रमाण',
        'पिछले 3 वर्षों के लेखापरीक्षित खाते'
      ]
    },
    kn: {
      name: 'ನಾವೀನ್ಯತೆ, ಗ್ರಾಮೀಣ ಕೈಗಾರಿಕೆಗಳು ಮತ್ತು ಉದ್ಯಮಶೀಲತೆ ಉತ್ತೇಜನ ಯೋಜನೆ (ASPIRE)',
      shortName: 'ಆಸ್ಪೈರ್ ಯೋಜನೆ (ASPIRE)',
      department: 'ಸೂಕ್ಷ್ಮ, ಸಣ್ಣ ಮತ್ತು ಮಧ್ಯಮ ಕೈಗಾರಿಕೆಗಳ ಸಚಿವಾಲಯ (MSME)',
      nodalAgency: 'SIDBI / NSIC / ಕಾಯರ್ ಬೋರ್ಡ್ / KVIC',
      sector: 'ಕೃಷಿ-ಗ್ರಾಮೀಣ ಕೈಗಾರಿಕೆ, ಗ್ರಾಮೀಣ ಉದ್ಯಮಶೀಲತೆ & ತಂತ್ರಜ್ಞಾನ ಇನ್‌ಕ್ಯುಬೇಶನ್',
      maxFunding: 'LBI ಸ್ಥಾಪನೆಗೆ ₹1 ಕೋಟಿವರೆಗೆ / TBI ಸ್ಥಾಪನೆಗೆ ₹1.5 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: 'ಉಚಿತ ಪ್ರಾಯೋಗಿಕ ತರಬೇತಿ, ಉನ್ನತ ತಂತ್ರಜ್ಞಾನದ ಕೃಷಿ ಯಂತ್ರೋಪಕರಣಗಳು ಮತ್ತು ಬೀಜ ಬಂಡವಾಳ ಬೆಂಬಲ.',
      subsidyRate: 'ಯಂತ್ರೋಪಕರಣ ಖರೀದಿಗೆ ₹1 ಕೋಟಿವರೆಗೆ 100% ಆರ್ಥಿಕ ಅನುದಾನ',
      marginMoney: 'ಸಂಸ್ಥೆಯು ಸ್ಥಳ ಮತ್ತು ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ',
      description: 'ಕೃಷಿ ಮತ್ತು ಗ್ರಾಮೀಣ ಕೈಗಾರಿಕೆಗಳಲ್ಲಿ ಇನ್‌ಕ್ಯುಬೇಟರ್‌ಗಳನ್ನು ಸ್ಥಾಪಿಸಿ ಉದ್ಯೋಗಾವಕಾಶಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ.'
    },
    te: {
      name: 'ఆవిష్కరణ, గ్రామీణ పరిశ్రమలు & వ్యవస్థాపకత ప్రోత్సాహక పథకం (ASPIRE)',
      shortName: 'ఆస్పైర్ పథకం (ASPIRE)',
      department: 'సూక్ష్మ, చిన్న మరియు మధ్యతరహా పరిశ్రమల మంత్రిత్వ శాఖ (MSME)',
      nodalAgency: 'SIDBI / NSIC / కాయిర్ బోర్డు / KVIC',
      sector: 'వ్యవసాయ-గ్రామీణ పరిశ్రమ, గ్రామీణ వ్యవస్థాపకత & సాంకేతిక ఇంక్యుబేషన్',
      maxFunding: 'LBI కోసం ₹1 కోటి వరకు / TBI కోసం ₹1.5 కోట్లు వరకు',
      potentialBenefit: 'ఉచిత శిక్షణ, అధునాతన యంత్రాలు, సీడ్ ఫండ్ మరియు మార్కెట్ మెంటార్‌షిప్.',
      subsidyRate: 'యంత్రాల కొనుగోలుకు ₹1 కోటి వరకు 100% గ్రాంట్',
      marginMoney: 'సంస్థ స్థలం మరియు సౌకర్యాలను అందిస్తుంది',
      description: 'గ్రామీణ పరిశ్రమలలో వ్యాపార ఇంక్యుబేటర్లను ఏర్పాటు చేయడం ద్వారా ఉపాధి కల్పిస్తుంది.'
    }
  },

  // 10. Agri Infra Fund
  'agri-infra-fund': {
    en: {
      name: 'Agriculture Infrastructure Fund (AIF)',
      shortName: 'Agri Infra Fund',
      department: 'Ministry of Agriculture and Farmers Welfare',
      nodalAgency: 'NABARD / Scheduled Commercial Banks',
      sector: 'Post-Harvest Management & Agri Infrastructure',
      maxFunding: 'Up to ₹2 Crore per project',
      potentialBenefit: '3% per annum interest subvention for loans up to ₹2 Crore and CGTMSE credit guarantee coverage.',
      subsidyRate: '3% per annum interest subvention on bank loan interest rate for up to 7 years',
      marginMoney: '10% to 20% promoter contribution based on project category',
      description: 'Medium-long term debt financing facility for post-harvest management infrastructure and community farming assets.'
    },
    ml: {
      name: 'അഗ്രികൾച്ചർ ഇൻഫ്രാസ്ട്രക്ചർ ഫണ്ട് (AIF)',
      shortName: 'അഗ്രി ഇൻഫ്രാ ഫണ്ട്',
      department: 'കൃഷി, കർഷക ക്ഷേമ മന്ത്രാലയം',
      nodalAgency: 'നബാർഡ് / വാണിജ്യ ബാങ്കുകൾ',
      sector: 'വിളവെടുപ്പാനന്തര പരിപാലനം & കാർഷിക പശ്ചാത്തല സൗകര്യം',
      maxFunding: 'ഒരു പ്രോജക്റ്റിന് ₹2 കോടി വരെ',
      potentialBenefit: '₹2 കോടി വരെയുള്ള വായ്പകൾക്ക് പ്രതിവർഷം 3% പലിശ ഇളവും CGTMSE ക്രെഡിറ്റ് ഗ്യാരന്റിയും.',
      subsidyRate: '7 വർഷം വരെ ബാങ്ക് വായ്പാ പലിശയിൽ പ്രതിവർഷം 3% സബ്‌സിഡി',
      marginMoney: '10% മുതൽ 20% വരെ സ്വന്തം വിഹിതം',
      description: 'കോൾഡ് സ്റ്റോറേജുകൾ, വെയർഹൗസുകൾ, സംസ്കരണ യൂണിറ്റുകൾ എന്നിവയ്ക്കുള്ള ദീർഘകാല വായ്പാ പിന്തുണ.'
    },
    ta: {
      name: 'வேளாண் உட்கட்டமைப்பு நிதி (AIF)',
      shortName: 'வேளாண் உட்கட்டமைப்பு நிதி',
      department: 'வேளாண்மை மற்றும் உழவர் நலத்துறை அமைச்சகம்',
      nodalAgency: 'நபார்டு / வணிக வங்கிகள்',
      sector: 'அறுவடைக்குப் பிந்தைய மேலாண்மை & வேளாண் உட்கட்டமைப்பு',
      maxFunding: 'திட்டத்திற்கு ₹2 கோடி வரை',
      potentialBenefit: '₹2 கோடி வரை கடன் தொகையில் ஆண்டுக்கு 3% வட்டி மானியம் மற்றும் கடன் உத்தரவாதம்.',
      subsidyRate: '7 ஆண்டுகளுக்கு ஆண்டுக்கு 3% வட்டி மானியம்',
      marginMoney: '10% முதல் 20% வரை சொந்த முதலீடு'
    },
    hi: {
      name: 'कृषि अवसंरचना कोष (AIF)',
      shortName: 'कृषि अवसंरचना कोष',
      department: 'कृषि एवं किसान कल्याण मंत्रालय',
      nodalAgency: 'नाबार्ड / अनुसूचित वाणिज्यिक बैंक',
      sector: 'कटाई उपरांत प्रबंधन एवं कृषि अवसंरचना',
      maxFunding: 'प्रति परियोजना ₹2 करोड़ तक',
      potentialBenefit: '₹2 करोड़ तक के ऋण पर 3% प्रति वर्ष ब्याज छूट और CGTMSE क्रेडिट गारंटी कवर।',
      subsidyRate: '7 वर्षों तक 3% प्रति वर्ष ब्याज छूट'
    },
    kn: {
      name: 'ಕೃಷಿ ಮೂಲಸೌಕರ್ಯ ನಿಧಿ (AIF)',
      shortName: 'ಕೃಷಿ ಮೂಲಸೌಕರ್ಯ ನಿಧಿ',
      department: 'ಕೃಷಿ ಮತ್ತು ರೈತರ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ',
      nodalAgency: 'ನಬಾರ್ಡ್ / ವಾಣಿಜ್ಯ ಬ್ಯಾಂಕುಗಳು',
      maxFunding: 'ಪ್ರತಿ ಯೋಜನೆಗೆ ₹2 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: '₹2 ಕೋಟಿವರೆಗಿನ ಸಾಲಕ್ಕೆ ವಾರ್ಷಿಕ 3% ಬಡ್ಡಿ ಸಹಾಯಧನ.'
    },
    te: {
      name: 'వ్యవసాయ మౌలిక సదుపాయాల నిధి (AIF)',
      shortName: 'వ్యవసాయ మౌలిక నిధి',
      department: 'వ్యవసాయం మరియు రైతు సంక్షేమ మంత్రిత్వ శాఖ',
      nodalAgency: 'నాబార్డ్ / వాణిజ్య బ్యాంకులు',
      maxFunding: 'ప్రాజెక్ట్‌కు ₹2 కోట్ల వరకు',
      potentialBenefit: '₹2 కోట్ల వరకు రుణాలపై సంవత్సరానికి 3% వడ్డీ రాయితీ.'
    }
  },

  // 11. SFURTI Scheme
  'sfurti-scheme': {
    en: {
      name: 'Scheme of Fund for Regeneration of Traditional Industries (SFURTI)',
      shortName: 'SFURTI Scheme',
      department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      nodalAgency: 'KVIC / Coir Board / IIE',
      sector: 'Traditional Industries, Agro-processing, Handloom, Handicrafts & Rural Clusters',
      maxFunding: 'Up to ₹2.5 Crore (Regular Clusters) / ₹5 Crore (Major Clusters)',
      potentialBenefit: '100% financial grant for Common Facility Centres (CFC), advanced machinery, packaging, and global market linkage.',
      subsidyRate: '100% grant for machinery, physical infrastructure, and market promotion'
    },
    ml: {
      name: 'പാരമ്പര്യ വ്യവസായ പുനരുജ്ജീവന ഫണ്ട് പദ്ധതി (SFURTI)',
      shortName: 'സ്ഫൂർത്തി പദ്ധതി (SFURTI)',
      department: 'സൂക്ഷ്മ, ചെറുകിട, ഇടത്തരം സംരംഭ മന്ത്രാലയം (MSME)',
      nodalAgency: 'KVIC / കയർ ബോർഡ് / IIE',
      sector: 'പാരമ്പര്യ വ്യവസായങ്ങൾ, കൈത്തറി, കരകൗശലം & ഗ്രാമീണ ക്ലസ്റ്ററുകൾ',
      maxFunding: 'സാധാരണ ക്ലസ്റ്ററുകൾക്ക് ₹2.5 കോടി വരെ / പ്രധാന ക്ലസ്റ്ററുകൾക്ക് ₹5 കോടി വരെ',
      potentialBenefit: 'കോമൺ ഫെസിലിറ്റി സെന്റർ (CFC), ആധുനിക മെഷിനറി, പാക്കേജിംഗ്, വിപണി സൗകര്യം എന്നിവയ്ക്ക് 100% സാമ്പത്തിക ഗ്രാന്റ്.',
      subsidyRate: 'മെഷിനറികൾക്കും പശ്ചാത്തല സൗകര്യങ്ങൾക്കും 100% സൗജന്യ ഗ്രാന്റ്'
    },
    ta: {
      name: 'பாரம்பரிய தொழில்கள் மறுமலர்ச்சி நிதித் திட்டம் (SFURTI)',
      shortName: 'ஸ்பூர்த்தி திட்டம் (SFURTI)',
      department: 'நுண், சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம் (MSME)',
      maxFunding: '₹2.5 கோடி முதல் ₹5 கோடி வரை',
      potentialBenefit: 'பொது வசதி மையங்கள் மற்றும் நவீன இயந்திரங்களுக்கு 100% முழு மானியம்.'
    },
    hi: {
      name: 'पारंपरिक उद्योगों के पुनरुद्धार के लिए कोष योजना (SFURTI)',
      shortName: 'स्फूर्ति योजना (SFURTI)',
      department: 'सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (MSME)',
      maxFunding: '₹2.5 करोड़ से ₹5 करोड़ तक',
      potentialBenefit: 'सामान्य सुविधा केंद्रों और उन्नत मशीनरी के लिए 100% वित्तीय अनुदान।'
    },
    kn: {
      name: 'ಸಾಂಪ್ರದಾಯಿಕ ಕೈಗಾರಿಕೆಗಳ ಪುನರುಜ್ಜೀವನ ನಿಧಿ ಯೋಜನೆ (SFURTI)',
      shortName: 'ಸ್ಫೂರ್ತಿ ಯೋಜನೆ (SFURTI)',
      maxFunding: '₹2.5 ಕೋಟಿಯಿಂದ ₹5 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: 'ಸಾಮಾನ್ಯ ಸೌಲಭ್ಯ ಕೇಂದ್ರಗಳು ಮತ್ತು ಯಂತ್ರೋಪಕರಣಗಳಿಗೆ 100% ಅನುದಾನ.'
    },
    te: {
      name: 'సాంప్రదాయ పరిశ్రమల పునరుద్ధరణ నిధి పథకం (SFURTI)',
      shortName: 'స్ఫూర్తి పథకం (SFURTI)',
      maxFunding: '₹2.5 కోట్ల నుండి ₹5 కోట్ల వరకు',
      potentialBenefit: 'కామన్ ఫెసిలిటీ సెంటర్లు మరియు ఆధునిక యంత్రాల కోసం 100% గ్రాంట్.'
    }
  },

  // 12. PM SVANidhi
  'pm-svanidhi': {
    en: {
      name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
      shortName: 'PM SVANidhi',
      department: 'Ministry of Housing and Urban Affairs (MoHUA)',
      nodalAgency: 'SIDBI / Scheduled Commercial Banks',
      sector: 'Street Vending, Micro Retail, Small Food Services',
      maxFunding: '₹10,000 (1st Tranche), ₹20,000 (2nd Tranche), ₹50,000 (3rd Tranche)',
      potentialBenefit: 'Collateral-free working capital loan with 7% interest subsidy and cashback incentives up to ₹1,200 per annum for digital transactions.',
      subsidyRate: '7% per annum interest subsidy credited directly to bank account quarterly'
    },
    ml: {
      name: 'പി.എം തെരുവ് കച്ചവടക്കാരുടെ ആത്മനിർഭർ നിധി (PM SVANidhi)',
      shortName: 'പി.എം സ്വനിധി (PM SVANidhi)',
      department: 'ഭവന, നഗരകാര്യ മന്ത്രാലയം (MoHUA)',
      nodalAgency: 'SIDBI / വാണിജ്യ ബാങ്കുകൾ',
      sector: 'തെരുവ് കച്ചവടം, മൈക്രോ റീട്ടെയിൽ, ചെറുകിട ഭക്ഷ്യ സേവനങ്ങൾ',
      maxFunding: '₹10,000 (ഒന്നാം ഘട്ടം), ₹20,000 (രണ്ടാം ഘട്ടം), ₹50,000 (മൂന്നാം ഘട്ടം)',
      potentialBenefit: '7% പലിശ സബ്‌സിഡിയോടെ ഈടില്ലാത്ത പ്രവർത്തന മൂലധന വായ്പയും ഡിജിറ്റൽ ഇടപാടുകൾക്ക് പ്രതിവർഷം ₹1,200 വരെ ക്യാഷ്ബാക്കും.',
      subsidyRate: 'പ്രതിവർഷം 7% പലിശ സബ്‌സിഡി നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിലേക്ക്'
    },
    ta: {
      name: 'பிரதமரின் தெருவோர வியாபாரிகள் ஆத்மநிர்பார் நிதி (PM SVANidhi)',
      shortName: 'பி.எம் ஸ்வநிதி',
      maxFunding: '₹10,000 முதல் ₹50,000 வரை',
      potentialBenefit: '7% வட்டி மானியத்துடன் பிணையில்லா நடைமுறை மூலதன கடன்.'
    },
    hi: {
      name: 'पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)',
      shortName: 'पीएम स्वनिधि',
      maxFunding: '₹10,000 से ₹50,000 तक',
      potentialBenefit: '7% ब्याज सब्सिडी के साथ संपार्श्विक-मुक्त कार्यशील पूंजी ऋण।'
    },
    kn: {
      name: 'ಪಿಎಂ ಬೀದಿ ವ್ಯಾಪಾರಿಗಳ ಆತ್ಮನಿರ್ಭರ್ ನಿಧಿ (ಪಿಎಂ ಸ್ವನಿಧಿ)',
      shortName: 'ಪಿಎಂ ಸ್ವನಿಧಿ',
      maxFunding: '₹10,000 ರಿಂದ ₹50,000 ವರೆಗೆ',
      potentialBenefit: '7% ಬಡ್ಡಿ ಸಹಾಯಧನದೊಂದಿಗೆ ಮೇಲಾಧಾರ ರಹಿತ ಸಾಲ.'
    },
    te: {
      name: 'పీఎం స్ట్రీట్ వెండర్స్ ఆత్మనిర్భర్ నిధి (పీఎం స్వనిధి)',
      shortName: 'పీఎం స్వనిధి',
      maxFunding: '₹10,000 నుండి ₹50,000 వరకు',
      potentialBenefit: '7% వడ్డీ రాయితీతో పూచీకత్తు లేని వ్యాపార రుణం.'
    }
  },

  // 13. MSME Champions
  'msme-champions': {
    en: {
      name: 'MSME Champions Scheme (Innovative / ZED / Lean)',
      shortName: 'MSME Champions',
      department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      nodalAgency: 'Development Commissioner (MSME)',
      sector: 'Manufacturing & Services in MSME Sector',
      maxFunding: 'Up to ₹15 Lakh for Incubator Idea / ₹1 Crore for Plant Upgradation',
      potentialBenefit: 'Up to 80% financial assistance for zero-defect zero-effect (ZED) certification and patent/design registration grants.',
      subsidyRate: 'Up to 80% subsidy for micro enterprises on quality and green certifications'
    },
    ml: {
      name: 'എംഎസ്എംഇ ചാമ്പ്യൻസ് പദ്ധതി (നവീനത / ZED / ലീൻ)',
      shortName: 'എംഎസ്എംഇ ചാമ്പ്യൻസ്',
      department: 'സൂക്ഷ്മ, ചെറുകിട, ഇടത്തരം സംരംഭ മന്ത്രാലയം (MSME)',
      nodalAgency: 'ഡെവലപ്‌മെന്റ് കമ്മീഷണർ (MSME)',
      sector: 'നിർമ്മാണം & സേവന മേഖല',
      maxFunding: 'ഐഡിയ ഇൻകുബേഷന് ₹15 ലക്ഷം / പ്ലാന്റ് നവീകരണത്തിന് ₹1 കോടി വരെ',
      potentialBenefit: 'സീറോ ഡിഫെക്ട് സീറോ ഇഫക്ട് (ZED) സർട്ടിഫിക്കേഷനും പേറ്റന്റ് രജിസ്ട്രേഷനും 80% വരെ സാമ്പത്തിക സഹായം.',
      subsidyRate: 'ക്വാളിറ്റി സർട്ടിഫിക്കേഷനുകൾക്ക് 80% വരെ സബ്‌സിഡി'
    },
    ta: {
      name: 'MSME சாம்பியன்ஸ் திட்டம் (ZED / Lean)',
      shortName: 'MSME சாம்பியன்ஸ்',
      maxFunding: '₹15 லட்சம் முதல் ₹1 கோடி வரை',
      potentialBenefit: 'தரச்சான்றிதழ் மற்றும் பேடன்ட் பதிவுக்கு 80% வரை மானிய உதவி.'
    },
    hi: {
      name: 'एमएसएमई चैंपियंस योजना (इनोवेटिव / ZED)',
      shortName: 'एमएसएमई चैंपियंस',
      maxFunding: '₹15 लाख से ₹1 करोड़ तक',
      potentialBenefit: 'ZED प्रमाणन और पेटेंट पंजीकरण के लिए 80% तक वित्तीय सहायता।'
    },
    kn: {
      name: 'ಎಂಎಸ್‌ಎಂಇ ಚಾಂಪಿಯನ್ಸ್ ಯೋಜನೆ (ZED)',
      shortName: 'ಎಂಎಸ್‌ಎಂಇ ಚಾಂಪಿಯನ್ಸ್',
      maxFunding: '₹15 ಲಕ್ಷದಿಂದ ₹1 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: 'ಗುಣಮಟ್ಟ ಪ್ರಮಾಣೀಕರಣಕ್ಕಾಗಿ 80% ವರೆಗೆ ಆರ್ಥಿಕ ನೆರವು.'
    },
    te: {
      name: 'ఎంఎస్‌ఎంఈ ఛాంపియన్స్ పథకం',
      shortName: 'ఎంఎస్‌ఎంఈ ఛాంపియన్స్',
      maxFunding: '₹15 లక్షల నుండి ₹1 కోటి వరకు',
      potentialBenefit: 'నాణ్యతా ధృవీకరణ మరియు పేటెంట్ రిజిస్ట్రేషన్ కోసం 80% గ్రాంట్.'
    }
  },

  // 14. CGSS Startup Guarantee
  'cgss-startup-guarantee': {
    en: {
      name: 'Credit Guarantee Scheme for Startups (CGSS)',
      shortName: 'CGSS Scheme',
      department: 'DPIIT & Ministry of Commerce and Industry',
      nodalAgency: 'NCGTC',
      sector: 'DPIIT-Recognized Startups in Tech, Biotech, Agtech & Deeptech',
      maxFunding: 'Up to ₹10 Crore per startup borrower',
      potentialBenefit: 'Collateral-free loans up to ₹10 Crore with credit guarantee backing from NCGTC for venture-backed and innovation startups.',
      subsidyRate: 'Credit guarantee coverage up to 85% for loans up to ₹5 Crore'
    },
    ml: {
      name: 'സ്റ്റാർട്ടപ്പുകൾക്കായുള്ള ക്രെഡിറ്റ് ഗ്യാരന്റി പദ്ധതി (CGSS)',
      shortName: 'സിജിഎസ്എസ് പദ്ധതി (CGSS)',
      department: 'DPIIT & വാണിജ്യ വ്യവസായ മന്ത്രാലയം',
      nodalAgency: 'NCGTC',
      sector: 'DPIIT അംഗീകൃത സാങ്കേതിക, കാർഷിക, ബയോടെക് സ്റ്റാർട്ടപ്പുകൾ',
      maxFunding: 'ഒരു സ്റ്റാർട്ടപ്പിന് ₹10 കോടി വരെ',
      potentialBenefit: 'NCGTC യുടെ ക്രെഡിറ്റ് ഗ്യാരന്റിയോടെ ₹10 കോടി വരെയുള്ള ഈടില്ലാത്ത വായ്പകൾ.',
      subsidyRate: '₹5 കോടി വരെയുള്ള വായ്പകൾക്ക് 85% വരെ ഗ്യാരന്റി പരിരക്ഷ'
    },
    ta: {
      name: 'ஸ்டார்ட்அப்களுக்கான கடன் உத்தரவாதத் திட்டம் (CGSS)',
      shortName: 'CGSS திட்டம்',
      maxFunding: '₹10 கோடி வரை',
      potentialBenefit: 'தொழில்நுட்ப ஸ்டார்ட்அப்களுக்கான பிணையில்லா கடன் உத்தரவாதம்.'
    },
    hi: {
      name: 'स्टार्टअप्स के लिए क्रेडिट गारंटी योजना (CGSS)',
      shortName: 'सीजीएसएस योजना',
      maxFunding: '₹10 करोड़ तक',
      potentialBenefit: 'डीपीआईआईटी-मान्यता प्राप्त स्टार्टअप्स के लिए ₹10 करोड़ तक संपार्श्विक-मुक्त ऋण।'
    },
    kn: {
      name: 'ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಗಾಗಿ ಸಾಲ ಖಾತರಿ ಯೋಜನೆ (CGSS)',
      shortName: 'CGSS ಯೋಜನೆ',
      maxFunding: '₹10 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: 'ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಗೆ ₹10 ಕೋಟಿವರೆಗೆ ಮೇಲಾಧಾರ ರಹಿತ ಸಾಲ.'
    },
    te: {
      name: 'స్టార్టప్‌ల కోసం క్రెడిట్ గ్యారెంటీ పథకం (CGSS)',
      shortName: 'CGSS పథకం',
      maxFunding: '₹10 కోట్ల వరకు',
      potentialBenefit: 'స్టార్టప్‌ల కోసం ₹10 కోట్ల వరకు పూచీకత్తు లేని రుణ మద్దతు.'
    }
  },

  // 15. SRI Fund
  'sri-fund': {
    en: {
      name: 'Self Reliant India (SRI) Fund',
      shortName: 'SRI Fund',
      department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
      nodalAgency: 'NSIC Venture Capital Fund Limited (NVCFL)',
      sector: 'Manufacturing, High Growth & Export-Oriented MSMEs',
      maxFunding: 'Equity infusion up to ₹50 Crore per MSME',
      potentialBenefit: 'Growth capital equity investment up to ₹50 Crore through Daughter Funds to expand manufacturing and export capacity.',
      subsidyRate: 'Non-debt equity infusion with patient capital horizon'
    },
    ml: {
      name: 'ആത്മനിർഭർ ഭാരത് ഫണ്ട് (SRI Fund)',
      shortName: 'എസ്ആർഐ ഫണ്ട് (SRI Fund)',
      department: 'സൂക്ഷ്മ, ചെറുകിട, ഇടത്തരം സംരംഭ മന്ത്രാലയം (MSME)',
      nodalAgency: 'NVCFL / NSIC',
      sector: 'നിർമ്മാണം, ഉയർന്ന വളർച്ചയുള്ള കയറ്റുമതി സംരംഭങ്ങൾ',
      maxFunding: '₹50 കോടി വരെ ഇക്വിറ്റി നിക്ഷേപം',
      potentialBenefit: 'ഉൽപ്പാദന ശേഷിയും കയറ്റുമതിയും വർദ്ധിപ്പിക്കുന്നതിന് ₹50 കോടി വരെയുള്ള ഇക്വിറ്റി മൂലധന നിക്ഷേപം.',
      subsidyRate: 'കടബാധ്യതയില്ലാത്ത നേരിട്ടുള്ള ഇക്വിറ്റി പങ്കാളിത്തം'
    },
    ta: {
      name: 'சுயசார்பு இந்தியா நிதி (SRI Fund)',
      shortName: 'SRI நிதி',
      maxFunding: '₹50 கோடி வரை',
      potentialBenefit: 'ஏற்றுமதி மற்றும் உற்பத்தி விரிவாக்கத்திற்கு சமபங்கு முதலீடு.'
    },
    hi: {
      name: 'आत्मनिर्भर भारत (SRI) फंड',
      shortName: 'एसआरआई फंड',
      maxFunding: '₹50 करोड़ तक',
      potentialBenefit: 'विकासशील एमएसएमई के लिए ₹50 करोड़ तक का इक्विटी निवेश।'
    },
    kn: {
      name: 'ಆತ್ಮನಿರ್ಭರ ಭಾರತ ನಿಧಿ (SRI Fund)',
      shortName: 'SRI ನಿಧಿ',
      maxFunding: '₹50 ಕೋಟಿವರೆಗೆ',
      potentialBenefit: 'ಉತ್ಪಾದನೆ ಮತ್ತು ರಫ್ತು ವಿಸ್ತರಣೆಗೆ ಇಕ್ವಿಟಿ ಬಂಡವಾಳ.'
    },
    te: {
      name: 'సెల్ఫ్ రిలయంట్ ఇండియా (SRI) ఫండ్',
      shortName: 'SRI ఫండ్',
      maxFunding: '₹50 కోట్ల వరకు',
      potentialBenefit: 'ఎగుమతి మరియు తయారీ విస్తరణకు ఈక్విటీ పెట్టుబడి.'
    }
  },

  // 16. JioGenNext
  'jiogennext': {
    en: {
      name: 'JioGenNext Startup Program',
      shortName: 'JioGenNext',
      department: 'Reliance Industries Innovation Hub',
      nodalAgency: 'JioGenNext / Reliance Corporate Advisory',
      sector: 'Technology, AgriTech, Retail Tech & Digital Logistics',
      maxFunding: 'PoC grants, Mentorship & Reliance Ecosystem Access',
      potentialBenefit: 'Direct commercial pilot opportunities across Reliance Jio and retail networks with enterprise mentorship and seed network access.',
      subsidyRate: 'Corporate innovation partnership and pilot grant funding'
    },
    ml: {
      name: 'ജിയോജെൻനെക്സ്റ്റ് സ്റ്റാർട്ടപ്പ് പ്രോഗ്രാം (JioGenNext)',
      shortName: 'ജിയോജെൻനെക്സ്റ്റ്',
      department: 'റിലയൻസ് ഇൻഡസ്ട്രീസ് ഇന്നൊവേഷൻ ഹബ്ബ്',
      nodalAgency: 'റിലയൻസ് കോർപ്പറേറ്റ് അഡ്വൈസറി',
      sector: 'സാങ്കേതികവിദ്യ, അഗ്രിടെക്, റീട്ടെയിൽ ടെക്',
      maxFunding: 'പൈലറ്റ് ഗ്രാന്റുകൾ, ഉപദേശം & റിലയൻസ് നെറ്റ്‌വർക്ക് പ്രവേശനം',
      potentialBenefit: 'റിലയൻസ് ജിയോ, റീട്ടെയിൽ ശൃംഖലകളിൽ വാണിജ്യ പൈലറ്റ് അവസരങ്ങളും പ്രമുഖ മാർഗ്ഗനിർദ്ദേശങ്ങളും.',
      subsidyRate: 'കോർപ്പറേറ്റ് പങ്കാളിത്തവും പൈലറ്റ് ഗ്രാന്റും'
    },
    ta: {
      name: 'ஜியோஜென்நெக்ஸ்ட் ஸ்டார்ட்அப் திட்டம் (JioGenNext)',
      shortName: 'ஜியோஜென்நெக்ஸ்ட்',
      maxFunding: 'வணிக பைலட் வாய்ப்புகள் மற்றும் வழிகாட்டுதல்',
      potentialBenefit: 'ரிலையன்ஸ் சுற்றுச்சூழல் அமைப்பில் நேரடி வணிக வாய்ப்புகள்.'
    },
    hi: {
      name: 'जियोजेननेक्स्ट स्टार्टअप कार्यक्रम',
      shortName: 'जियोजेननेक्स्ट',
      maxFunding: 'पायलट अनुदान और रिलायंस नेटवर्क पहुंच',
      potentialBenefit: 'रिलायंस रिटेल और जियो नेटवर्क में प्रत्यक्ष वाणिज्यिक पायलट अवसर।'
    },
    kn: {
      name: 'ಜಿಯೋಜೆನ್‌ನೆಕ್ಸ್‌ಟ್ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಕಾರ್ಯಕ್ರಮ',
      shortName: 'ಜಿಯೋಜೆನ್‌ನೆಕ್ಸ್‌ಟ್',
      maxFunding: 'ಪೈಲಟ್ ಅನುದಾನಗಳು ಮತ್ತು ಉದ್ಯಮ ಬೆಂಬಲ',
      potentialBenefit: 'ರಿಲಯನ್ಸ್ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ವಾಣಿಜ್ಯ ಅವಕಾಶಗಳು.'
    },
    te: {
      name: 'జియోజెన్‌నెక్స్ట్ స్టార్టప్ ప్రోగ్రామ్',
      shortName: 'జియోజెన్‌నెక్స్ట్',
      maxFunding: 'పైలట్ గ్రాంట్లు మరియు మెంటార్‌షిప్',
      potentialBenefit: 'రిలయన్స్ నెట్‌వర్క్‌లో వాణిజ్య పైలట్ అవకాశాలు.'
    }
  },

  // 17. Reliance Foundation Women
  'reliance-foundation-women': {
    en: {
      name: 'Reliance Foundation Women Entrepreneurship Initiative',
      shortName: 'Reliance Women',
      department: 'Reliance Foundation CSR',
      nodalAgency: 'Reliance Foundation Livelihood Division',
      sector: 'Women Entrepreneurship, Rural Livelihoods & Artisan Enterprises',
      maxFunding: 'Grants up to ₹5 Lakh & Direct Market Access Support',
      potentialBenefit: 'Direct financial seed grants, advanced skill development, digital literacy, and forward market linkages for women-led enterprises.',
      subsidyRate: '100% CSR grant with no repayment liability'
    },
    ml: {
      name: 'റിലയൻസ് ഫൗണ്ടേഷൻ വനിതാ സംരംഭകത്വ പദ്ധതി',
      shortName: 'റിലയൻസ് വനിതാ പദ്ധതി',
      department: 'റിലയൻസ് ഫൗണ്ടേഷൻ സി.എസ്.ആർ',
      nodalAgency: 'റിലയൻസ് ഫൗണ്ടേഷൻ ലൈവ്‌ലിഹുഡ് ഡിവിഷൻ',
      sector: 'വനിതാ സംരംഭകത്വം, ഗ്രാമീണ ഉപജീവനമാർഗ്ഗം & കരകൗശല സംരംഭങ്ങൾ',
      maxFunding: '₹5 ലക്ഷം വരെ ഗ്രാന്റും വിപണി പ്രവേശന പിന്തുണയും',
      potentialBenefit: 'സ്ത്രീ സംരംഭകർക്കായി തിരിച്ചടവില്ലാത്ത സാമ്പത്തിക വിത്ത് ഗ്രാന്റുകൾ, വിപണി ബന്ധങ്ങൾ, ഡിജിറ്റൽ പരിശീലനം.',
      subsidyRate: 'തിരിച്ചടവില്ലാത്ത 100% സി.എസ്.ആർ ഗ്രാന്റ്'
    },
    ta: {
      name: 'ரிலையன்ஸ் அறக்கட்டளை மகளிர் தொழில்முனைவோர் திட்டம்',
      shortName: 'ரிலையன்ஸ் மகளிர் திட்டம்',
      maxFunding: '₹5 லட்சம் வரை மானியம் மற்றும் சந்தை ஆதரவு',
      potentialBenefit: 'பெண் தொழில்முனைவோருக்கு நேரடி நிதி உதவி மற்றும் சந்தை இணைப்பு.'
    },
    hi: {
      name: 'रिलायंस फाउंडेशन महिला उद्यमिता पहल',
      shortName: 'रिलायंस महिला पहल',
      maxFunding: '₹5 लाख तक अनुदान और बाजार पहुंच',
      potentialBenefit: 'महिला उद्यमियों के लिए 100% सीएसआर सीड ग्रांट और डिजिटल साक्षरता।'
    },
    kn: {
      name: 'ರಿಲಯನ್ಸ್ ಫೌಂಡೇಶನ್ ಮಹಿಳಾ ಉದ್ಯಮಶೀಲತೆ ಉಪಕ್ರಮ',
      shortName: 'ರಿಲಯನ್ಸ್ ಮಹಿಳಾ ಉಪಕ್ರಮ',
      maxFunding: '₹5 ಲಕ್ಷದವರೆಗೆ ಅನುದಾನ',
      potentialBenefit: 'ಮಹಿಳಾ ಉದ್ಯಮಿಗಳಿಗೆ ಆರ್ಥಿಕ ಅನುದಾನ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಸಂಪರ್ಕ.'
    },
    te: {
      name: 'రిలయన్స్ ఫౌండేషన్ మహిళా వ్యవస్థాపకత కార్యక్రమం',
      shortName: 'రిలయన్స్ మహిళా పథకం',
      maxFunding: '₹5 లక్షల వరకు గ్రాంట్ మరియు మార్కెట్ మద్దతు',
      potentialBenefit: 'మహిళా వ్యాపారాలకు ఆర్థిక గ్రాంట్లు మరియు మార్కెట్ లింకేజీలు.'
    }
  },

  // 18. Swayamshree Scheme
  'swayamshree-scheme': {
    en: {
      name: 'Swayamshree Rural Women Livelihood Program',
      shortName: 'Swayamshree',
      department: 'Reliance Foundation & Bill and Melinda Gates Foundation',
      nodalAgency: 'State Rural Livelihood Missions (SRLM)',
      sector: 'Rural Women Collectives, Self-Help Groups (SHGs) & Micro-Enterprises',
      maxFunding: 'Revolving fund grants up to ₹3 Lakh per SHG enterprise',
      potentialBenefit: 'Community investment fund grants, financial literacy, micro-enterprise training, and digital payment enablement.',
      subsidyRate: 'Revolving community fund grant and enterprise capital'
    },
    ml: {
      name: 'സ്വയംശ്രീ ഗ്രാമീണ വനിതാ ഉപജീവന പദ്ധതി',
      shortName: 'സ്വയംശ്രീ പദ്ധതി',
      department: 'റിലയൻസ് ഫൗണ്ടേഷൻ & ഗേറ്റ്സ് ഫൗണ്ടേഷൻ പങ്കാളിത്തം',
      nodalAgency: 'സംസ്ഥാന ഗ്രാമീണ ഉപജീവന മിഷൻ (കുടുംബശ്രീ/SRLM)',
      sector: 'ഗ്രാമീണ വനിതാ കൂട്ടായ്മകൾ, അയൽക്കൂട്ടങ്ങൾ (SHG) & സൂക്ഷ്മ സംരംഭങ്ങൾ',
      maxFunding: 'ഒരു സംരംഭത്തിന് ₹3 ലക്ഷം വരെ റിവോൾവിംഗ് ഫണ്ട് ഗ്രാന്റ്',
      potentialBenefit: 'കമ്മ്യൂണിറ്റി നിക്ഷേപ ഗ്രാന്റുകൾ, സാമ്പത്തിക സാക്ഷരത, മൈക്രോ എന്റർപ്രൈസ് പരിശീലനം, വിപണി സൗകര്യം.',
      subsidyRate: 'കമ്മ്യൂണിറ്റി വികസന ഗ്രാന്റും സംരംഭക മൂലധനവും'
    },
    ta: {
      name: 'சுயம்ஸ்ரீ ஊரக மகளிர் வாழ்வாதாரத் திட்டம்',
      shortName: 'சுயம்ஸ்ரீ திட்டம்',
      maxFunding: '₹3 லட்சம் வரை சுழல் நிதி மானியம்',
      potentialBenefit: 'சுயஉதவி குழுக்களுக்கு தொழில் மூலதனம் மற்றும் பயிற்சி ஆதரவு.'
    },
    hi: {
      name: 'स्वयंश्री ग्रामीण महिला आजीविका कार्यक्रम',
      shortName: 'स्वयंश्री कार्यक्रम',
      maxFunding: '₹3 लाख तक रिवॉल्विंग फंड ग्रांट',
      potentialBenefit: 'स्वयं सहायता समूहों के लिए सामुदायिक निवेश कोष और उद्यम प्रशिक्षण।'
    },
    kn: {
      name: 'ಸ್ವಯಂಶ್ರೀ ಗ್ರಾಮೀಣ ಮಹಿಳಾ ಜೀವನೋಪಾಯ ಕಾರ್ಯಕ್ರಮ',
      shortName: 'ಸ್ವಯಂಶ್ರೀ ಯೋಜನೆ',
      maxFunding: '₹3 ಲಕ್ಷದವರೆಗೆ ಆರ್ಥಿಕ ನೆರವು',
      potentialBenefit: 'ಸ್ವಸಹಾಯ ಗುಂಪುಗಳಿಗೆ ಸಮುದಾಯ ಹೂಡಿಕೆ ನಿಧಿ ಮತ್ತು ತರಬೇತಿ.'
    },
    te: {
      name: 'స్వయంశ్రీ గ్రామీణ మహిళా జీవనోపాధి కార్యక్రమం',
      shortName: 'స్వయంశ్రీ పథకం',
      maxFunding: '₹3 లక్షల వరకు రివాల్వింగ్ ఫండ్ గ్రాంట్',
      potentialBenefit: 'స్వయం సహాయక సంఘాలకు వ్యాపార శిక్షణ మరియు నిధుల మద్దతు.'
    }
  },

  // 19. Tata Social Enterprise Challenge
  'tata-social-enterprise': {
    en: {
      name: 'Tata Social Enterprise Challenge (TSEC)',
      shortName: 'Tata Challenge',
      department: 'Tata Sons & IIM Calcutta Innovation Park',
      nodalAgency: 'IIMCIP & Tata Sustainability Group',
      sector: 'Social Impact Startups in Healthcare, Agri, Clean Tech, Water & Education',
      maxFunding: 'Cash grant prizes up to ₹10 Lakh & Seed Investment up to ₹1 Crore',
      potentialBenefit: 'Direct cash grants, equity seed incubation through IIM Calcutta Innovation Park, and corporate access to the Tata group.',
      subsidyRate: 'Equity-free cash award for top social innovators and seed commitment'
    },
    ml: {
      name: 'ടാറ്റ സോഷ്യൽ എന്റർപ്രൈസ് ചലഞ്ച് (TSEC)',
      shortName: 'ടാറ്റ ചലഞ്ച്',
      department: 'ടാറ്റാ സൺസ് & ഐ.ഐ.എം കൽക്കട്ട ഇന്നൊവേഷൻ പാർക്ക്',
      nodalAgency: 'IIMCIP & ടാറ്റാ സസ്റ്റൈനബിലിറ്റി ഗ്രൂപ്പ്',
      sector: 'സാമൂഹിക സംരംഭങ്ങൾ, കൃഷി, ആരോഗ്യം, ശുചിത്വം & വിദ്യാഭ്യാസം',
      maxFunding: '₹10 ലക്ഷം വരെ ക്യാഷ് ഗ്രാന്റ് സമ്മാനങ്ങളും ₹1 കോടി വരെ സീഡ് നിക്ഷേപവും',
      potentialBenefit: 'ഐഐഎം കൽക്കട്ട വഴി നേരിട്ടുള്ള സീഡ് ഇൻകുബേഷനും ടാറ്റാ ഗ്രൂപ്പുമായുള്ള കോർപ്പറേറ്റ് വാണിജ്യ പങ്കാളിത്തവും.',
      subsidyRate: 'സൗജന്യ ക്യാഷ് അവാർഡും സീഡ് നിക്ഷേപ വാഗ്ദാനവും'
    },
    ta: {
      name: 'டாடா சமூக தொழில்முனைவோர் சவால் (TSEC)',
      shortName: 'டாடா சேலஞ்ச்',
      maxFunding: '₹10 லட்சம் ரொக்கப் பரிசு & ₹1 கோடி விதை முதலீடு',
      potentialBenefit: 'ஐஐஎம் கல்கத்தா வழியாக நேரடி தொழில் இன்குபேஷன் மற்றும் முதலீடு.'
    },
    hi: {
      name: 'टाटा सोशल एंटरप्राइज चैलेंज (TSEC)',
      shortName: 'टाटा चैलेंज',
      maxFunding: '₹10 लाख नकद पुरस्कार और ₹1 करोड़ सीड निवेश',
      potentialBenefit: 'आईआईएम कलकत्ता इनोवेशन पार्क के माध्यम से इनक्यूबेशन और टाटा समूह से जुड़ाव।'
    },
    kn: {
      name: 'ಟಾಟಾ ಸಾಮಾಜಿಕ ಉದ್ಯಮ ಸವಾಲು (TSEC)',
      shortName: 'ಟಾಟಾ ಚಾಲೆಂಜ್',
      maxFunding: '₹10 ಲಕ್ಷ ನಗದು ಬಹುಮಾನ ಮತ್ತು ₹1 ಕೋಟಿ ಹೂಡಿಕೆ',
      potentialBenefit: 'ಐಐಎಂ ಕಲ್ಕತ್ತಾ ಮೂಲಕ ಇನ್‌ಕ್ಯುಬೇಶನ್ ಮತ್ತು ಬಂಡವಾಳ ಬೆಂಬಲ.'
    },
    te: {
      name: 'టాటా సోషల్ ఎంటర్‌ప్రైజ్ ఛాలెంజ్ (TSEC)',
      shortName: 'టాటా ఛాలెంజ్',
      maxFunding: '₹10 లక్షల నగదు బహుమతి & ₹1 కోటి సీడ్ పెట్టుబడి',
      potentialBenefit: 'ఐఐఎం కలకత్తా ద్వారా ఇంక్యుబేషన్ మరియు టాటా గ్రూప్‌తో భాగస్వామ్యం.'
    }
  }
`;

// Insert new schemes before closing brace
content = content.replace(/\n\s*\}\s*;\s*\n\s*\/\*\*\s*\n\s*\* Localizes/, `${newSchemes}\n};\n\n/**\n * Localizes`);

// Update getLocalizedScheme to also support requiredDocuments
const oldReturn = `    description: schemeTrans.description || scheme.description,
    whyMatchedReasons: schemeTrans.whyMatchedReasons && schemeTrans.whyMatchedReasons.length > 0
      ? schemeTrans.whyMatchedReasons
      : scheme.whyMatchedReasons
  };`;

const newReturn = `    description: schemeTrans.description || scheme.description,
    whyMatchedReasons: schemeTrans.whyMatchedReasons && schemeTrans.whyMatchedReasons.length > 0
      ? schemeTrans.whyMatchedReasons
      : scheme.whyMatchedReasons,
    requiredDocuments: schemeTrans.requiredDocuments && schemeTrans.requiredDocuments.length > 0
      ? schemeTrans.requiredDocuments
      : scheme.requiredDocuments
  };`;

content = content.replace(oldReturn, newReturn);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated schemeTranslations.js with all 18 schemes!');
