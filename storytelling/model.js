import View from "./view.js";

let story = "";
let initialStory = "";
let currentLanguage = "en-US"; // language code
let currentLanguageName = "English";

const translations = {
    "en-US": "Help me build a story! Start a sentence and I will continue it.",
    "ar-SA": "ساعدني في بناء قصة! ابدأ جملة وسأكملها.",
    "bg-BG": "Помогни ми да изградя история! Започни изречение и аз ще го продължа.",
    "zh-CN": "帮我编一个故事吧！你先开始一句话，我会继续下去。",
    "hr-HR": "Pomozi mi da izgradim priču! Započni rečenicu i ja ću je nastaviti.",
    "cs-CZ": "Pomoz mi vytvořit příběh! Začni větu a já ji doplním.",
    "nl-NL": "Help me een verhaal te bouwen! Begin een zin en ik zal het vervolgen.",
    "fr-FR": "Aidez-moi à construire une histoire ! Commencez une phrase et je la continuerai.",
    "de-DE": "Hilf mir, eine Geschichte zu erzählen! Beginne einen Satz und ich werde ihn fortsetzen.",
    "el-GR": "Βοήθησέ με να χτίσω μια ιστορία! Ξεκίνα μια πρόταση και εγώ θα την συνεχίσω.",
    "hi-IN": "मुझे एक कहानी बनाने में मदद करें! एक वाक्य शुरू करें और मैं इसे जारी रखूंगा।",
    "id-ID": "Bantu saya membuat sebuah cerita! Mulailah sebuah kalimat dan saya akan melanjutkannya.",
    "it-IT": "Aiutami a costruire una storia! Inizia una frase e io la continuerò.",
    "ja-JP": "物語を作る手伝いをして！文を始めてくれれば、私が続けます。",
    "ko-KR": "이야기를 만드는 데 도와주세요! 문장을 시작하면 제가 계속할게요.",
    "ms-MY": "Bantu saya membina sebuah cerita! Mulakan sebuah ayat dan saya akan meneruskannya.",
    "nb-NO": "Hjelp meg med å lage en historie! Start en setning, så skal jeg fortsette den.",
    "fa-IR": "به من کمک کن تا یک داستان بسازم! یک جمله را شروع کن و من آن را ادامه خواهم داد.",
    "pl-PL": "Pomóż mi stworzyć historię! Zacznij zdanie, a ja je dokończę.",
    "pt-BR": "Ajude-me a construir uma história! Comece uma frase e eu a continuarei.",
    "ro-RO": "Ajută-mă să construiesc o poveste! Începe o propoziție și eu o voi continua.",
    "ru-RU": "Помоги мне создать историю! Начни предложение, и я продолжу его.",
    "es-ES": "¡Ayúdame a construir una historia! Comienza una oración y yo la continuaré.",
    "sv-SE": "Hjälp mig att bygga en historia! Börja med en mening så fortsätter jag.",
    "th-TH": "ช่วยฉันสร้างเรื่องราว! เริ่มประโยคหนึ่งและฉันจะต่อมันไป.",
    "tr-TR": "Bana bir hikaye oluşturmamda yardım et! Bir cümle başla, ben onu devam ettireceğim.",
    "uk-UA": "Допоможи мені створити історію! Почни речення, і я його продовжу.",
    "vi-VN": "Giúp tôi dựng một câu chuyện! Bắt đầu một câu và tôi sẽ tiếp tục."

};

function getWelcomeMessage(lang) {
    return translations[lang] || translations["en-US"];
}

async function generateStory(prompt) {
    const GEMINI_API_KEY = View.getKey();
    if (!GEMINI_API_KEY) {
        alert("Your key is empty!")
        return;
    }    
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const body = {
        contents: [{
            parts: [{
                text: `Continue the story in ${currentLanguage}:\n${prompt}`
            }]
        }]
    };
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    });
    const data = await response.json();
    return data.candidates[0]?.content?.parts?.[0]?.text || "no response";;
}

function appendLine(role, text) {
    story += `\n${role}: ${text}`;
    return story;
}

function getStory() {
    return story;
}

function getLanguage() {
    return {lang: currentLanguage, name: currentLanguageName};
}

function setLanguage(lang, name) {
    currentLanguage = lang;
    currentLanguageName = name;
}

function resetStory() {
    story = initialStory;
    return story;
}

function initializeStory(initialText) {
    story = initialText;
    initialStory = initialText;
    return story;

}

export default {
    generateStory,
    appendLine,
    getStory,
    setLanguage,
    getLanguage,
    resetStory,
    initializeStory,
    getWelcomeMessage
}