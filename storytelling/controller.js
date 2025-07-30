import Model from "./model.js";
import View from "./view.js";

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = Model.getLanguage().lang;

let aiRequestInProgress = false;

async function handleVoiceInput(event) {
    const userText = event.results[0][0].transcript;
    const updateStory = Model.appendLine("Player", userText);
    View.updateStory(updateStory);
    View.toggleLoading(true);
    aiRequestInProgress = true;
    const aiResponse = await Model.generateStory(updateStory + "\nNarrator:");
    aiRequestInProgress = false;
    View.toggleLoading(false);
    const finalStory = Model.appendLine("Narrator", aiResponse);
    View.updateStory(finalStory);
    View.speakText(aiResponse, Model.getLanguage().lang);
}

function handleLanguageChange() {
    View.stopSpeaking();
    const selectOption = View.getLanguageSelect().selectedOptions[0];
    const newLang = selectOption.value;
    const newLangName = selectOption.dataset.name;
    Model.setLanguage(newLang, newLangName);
    recognition.lang = newLang;

    const welcomeMessage = Model.getWelcomeMessage(newLang);
    const newInitialStory = `Narrator: ${welcomeMessage}`;
    Model.initializeStory(newInitialStory);
    View.updateStory(newInitialStory);
    View.speakText(welcomeMessage, newLang);
}

function handleStopSpeaking() {
    View.stopSpeaking();
    if (aiRequestInProgress) {
        View.toggleLoading(false);
        aiRequestInProgress = false;
    }

    const resetStory = Model.resetStory();
    View.updateStory(resetStory);

    setTimeout(() => {
    const lang = Model.getLanguage().lang;
    const welcomeMessage = Model.getWelcomeMessage(lang);
    View.speakText(welcomeMessage, lang);
    }, 500);
}

function handlePauseResume(e) {
    const newState = View.pauseOrResumeSpeaking();
    e.target.textContent = newState === "Pause" ? "⏸️ Pause" : "▶️ Resume";
}

function init() {
    window.speechSynthesis.onvoiceschanged = () => {};
    const initialLang = Model.getLanguage().lang;
    const welcomeMessage = Model.getWelcomeMessage(initialLang);
    const initialStory = `Narrator: ${welcomeMessage}`;
    Model.initializeStory(initialStory);
    View.updateStory(initialStory);

    setTimeout(() => {
        View.speakText(welcomeMessage, initialLang);
    }, 500);

    View.getSpeakButton().onclick = () => {
        try {
            recognition.start();
        }
        catch (error) {
            console.error("Speech recognition error:", error);
        }
    };
    recognition.onresult = handleVoiceInput;
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        View.toggleLoading(false);
        aiRequestInProgress = false;
    };

    View.getLanguageSelect().addEventListener("change", handleLanguageChange);
    
    View.getStopSpeakBtn().onclick = handleStopSpeaking;

    View.getPauseSpeakButton().onclick = handlePauseResume;
}

init();
