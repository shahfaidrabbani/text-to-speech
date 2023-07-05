// Fetch available voices
// function getVoices() {
//     return new Promise((resolve) => {
//         if (typeof speechSynthesis === 'undefined' || !speechSynthesis.onvoiceschanged) {
//             // Web Speech API is not supported
//             resolve([]);
//             return;
//         }

//         let voices = speechSynthesis.getVoices();
//         if (voices.length) {
//             resolve(voices);
//             return;
//         }

//         speechSynthesis.onvoiceschanged = () => {
//             voices = speechSynthesis.getVoices();
//             resolve(voices);
//         };
//     });
// }

// Rest of the code...


function getVoices() {
    return new Promise((resolve) => {
        let voices = speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
            return;
        }
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
            resolve(voices);
        };
    });
}

// Populate voice select dropdown
function populateVoiceSelect() {
    const voiceSelect = document.getElementById('voice-select');
    getVoices().then((voices) => {
        voices.forEach((voice) => {
            const option = document.createElement('option');
            option.value = voice.lang;
            option.textContent = voice.name;
            voiceSelect.appendChild(option);
        });
    });
}

// Speak the entered text
function speak() {
    const text = document.getElementById('text').value;
    const voiceSelect = document.getElementById('voice-select');
    const rate = document.getElementById('rate').value;
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voiceSelect.value;

    // Find the voice based on the selected language
    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) => v.lang === selectedVoice);

    if (voice) {
        utterance.voice = voice;
    } else {
        console.error('Voice not found');
        return;
    }

    utterance.rate = parseFloat(rate);

    speechSynthesis.speak(utterance);
}

// Initialize the app
window.addEventListener('DOMContentLoaded', () => {
    populateVoiceSelect();
});
