// App State Management
let completedLevels = JSON.parse(localStorage.getItem('english_habit_completed_levels')) || [];
let currentLevelId = 1;
let currentStep = 1;

// Temp level session data
let currentPhraseData = null;
let currentSelectedWord = "";
let currentPersonalizedPhrase = "";
let currentWrittenPhrase = "";
let speakCount = 0;

// Speech Recognition API
let recognition = null;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
}

// DOM Elements
const mapScreen = document.getElementById('mapScreen');
const gameScreen = document.getElementById('gameScreen');
const levelsGrid = document.getElementById('levelsGrid');
const progressText = document.getElementById('progressText');
const mainProgressBar = document.getElementById('mainProgressBar');
const btnResetProgress = document.getElementById('btnResetProgress');

const btnBackToMap = document.getElementById('btnBackToMap');
const currentLevelBadge = document.getElementById('currentLevelBadge');

const phraseEnglish = document.getElementById('phraseEnglish');
const phrasePortuguese = document.getElementById('phrasePortuguese');
const btnListenSpeech = document.getElementById('btnListenSpeech');

const stepTitle = document.getElementById('stepTitle');
const stepInstruction = document.getElementById('stepInstruction');
const stepInteractiveArea = document.getElementById('stepInteractiveArea');

const btnPrevStep = document.getElementById('btnPrevStep');
const btnNextStep = document.getElementById('btnNextStep');

const completedModal = document.getElementById('completedModal');
const summaryFinalPhrase = document.getElementById('summaryFinalPhrase');
const btnNextLevel = document.getElementById('btnNextLevel');
const btnModalMap = document.getElementById('btnModalMap');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderMapScreen();
  setupEventListeners();
  registerServiceWorker();
});

// PWA Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('PWA Service Worker Registrado!', reg.scope))
      .catch(err => console.log('Falha no Service Worker:', err));
  }
}

// Render Map Screen (30 Levels Grid)
function renderMapScreen() {
  levelsGrid.innerHTML = '';
  const totalCompleted = completedLevels.length;
  progressText.textContent = `${totalCompleted} / 30 Fases`;
  mainProgressBar.style.width = `${(totalCompleted / 30) * 100}%`;

  PHRASES.forEach((phrase) => {
    const isCompleted = completedLevels.includes(phrase.id);
    // Level 1 is always unlocked; level N is unlocked if level N-1 is completed
    const isUnlocked = phrase.id === 1 || completedLevels.includes(phrase.id - 1);

    const card = document.createElement('div');
    card.className = `level-card ${isCompleted ? 'completed' : ''} ${isUnlocked ? 'unlocked' : 'locked'}`;

    let statusIcon = '🔒';
    if (isCompleted) statusIcon = '✅';
    else if (isUnlocked) statusIcon = '▶️';

    card.innerHTML = `
      <div class="level-number">${phrase.id}</div>
      <div class="level-status-icon">${statusIcon}</div>
    `;

    if (isUnlocked) {
      card.addEventListener('click', () => startLevel(phrase.id));
    }

    levelsGrid.appendChild(card);
  });
}

// Start Game Level
function startLevel(levelId) {
  currentLevelId = levelId;
  currentPhraseData = PHRASES.find(p => p.id === levelId);
  currentStep = 1;
  speakCount = 0;
  currentSelectedWord = currentPhraseData.options[0];
  currentPersonalizedPhrase = currentPhraseData.samplePersonalized;
  currentWrittenPhrase = "";

  currentLevelBadge.textContent = `Fase ${currentLevelId} - ${currentPhraseData.title}`;

  mapScreen.classList.remove('active');
  gameScreen.classList.add('active');

  renderStep(currentStep);
}

// Render Step Logic
function renderStep(step) {
  currentStep = step;
  updateStepperUI(step);

  // Buttons visibility
  btnPrevStep.style.display = step > 1 ? 'inline-block' : 'none';
  btnNextStep.textContent = step === 5 ? 'Concluir Fase 🏆' : 'Próximo Passo →';

  // Base Phrase Display
  phraseEnglish.textContent = `"${currentPhraseData.original}"`;

  // Clear previous interactive content
  stepInteractiveArea.innerHTML = '';

  switch (step) {
    case 1:
      stepTitle.textContent = "Minuto 1 — Listen (Ouvir sem traduzir)";
      stepInstruction.textContent = "Clique no botão abaixo para ouvir o inglês nativo. Treine seu ouvido para não traduzir mentalmente.";
      playAudio(currentPhraseData.original);
      break;

    case 2:
      stepTitle.textContent = "Minuto 2 — Speak (Repetir 3 Vezes em Voz Alta)";
      stepInstruction.textContent = "Fale a frase em voz alta pelo menos 3 vezes para ativar a sua memória muscular de pronúncia.";
      
      const repeatContainer = document.createElement('div');
      repeatContainer.className = 'text-center';
      repeatContainer.innerHTML = `
        <button id="btnCountSpeak" class="btn-primary margin-top-sm">
          🎙️ Repeti em voz alta (<span id="countNum">${speakCount}</span>/3)
        </button>
        ${recognition ? `<button id="btnVoiceRec" class="btn-secondary margin-top-sm" style="display:block; margin: 10px auto;">🎤 Testar Pronúncia por Voz</button>` : ''}
        <div class="repeat-counter">
          <div class="counter-bubble ${speakCount >= 1 ? 'done' : ''}">1</div>
          <div class="counter-bubble ${speakCount >= 2 ? 'done' : ''}">2</div>
          <div class="counter-bubble ${speakCount >= 3 ? 'done' : ''}">3</div>
        </div>
        <p id="speechRecognitionResult" style="margin-top:10px; font-size:13px; color:var(--accent); font-weight:600;"></p>
      `;
      stepInteractiveArea.appendChild(repeatContainer);

      document.getElementById('btnCountSpeak').addEventListener('click', () => {
        if (speakCount < 3) {
          speakCount++;
          document.getElementById('countNum').textContent = speakCount;
          playAudio(currentPhraseData.original);
          renderStep(2);
        }
      });

      if (recognition) {
        document.getElementById('btnVoiceRec').addEventListener('click', () => {
          const res = document.getElementById('speechRecognitionResult');
          res.textContent = "Fale agora no microfone...";
          try {
            recognition.start();
          } catch(e) {}
        });

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          const res = document.getElementById('speechRecognitionResult');
          res.textContent = `Você disse: "${transcript}"`;
          if (speakCount < 3) {
            speakCount++;
            renderStep(2);
          }
        };
      }
      break;

    case 3:
      stepTitle.textContent = "Minuto 3 — Change One Word (Alterar 1 Palavra)";
      stepInstruction.textContent = `A palavra destacada é "${currentPhraseData.changeWord}". Escolha uma nova palavra abaixo para criar uma variação da frase:`;

      const optionsDiv = document.createElement('div');
      optionsDiv.innerHTML = `<p class="options-title">Trocar <strong>${currentPhraseData.changeWord}</strong> por:</p>`;
      
      const grid = document.createElement('div');
      grid.className = 'options-grid';

      currentPhraseData.options.forEach(opt => {
        const btnOpt = document.createElement('button');
        btnOpt.className = `btn-option ${currentSelectedWord === opt ? 'selected' : ''}`;
        btnOpt.textContent = opt;
        btnOpt.addEventListener('click', () => {
          currentSelectedWord = opt;
          document.querySelectorAll('.btn-option').forEach(b => b.classList.remove('selected'));
          btnOpt.classList.add('selected');
          
          const newPhrase = currentPhraseData.original.replace(currentPhraseData.changeWord, opt);
          phraseEnglish.textContent = `"${newPhrase}"`;
          playAudio(newPhrase);
        });
        grid.appendChild(btnOpt);
      });

      optionsDiv.appendChild(grid);
      stepInteractiveArea.appendChild(optionsDiv);
      
      // Update preview immediately
      const initialNewPhrase = currentPhraseData.original.replace(currentPhraseData.changeWord, currentSelectedWord);
      phraseEnglish.textContent = `"${initialNewPhrase}"`;
      break;

    case 4:
      stepTitle.textContent = "Minuto 4 — Personalize (Moldar para o seu dia a dia)";
      stepInstruction.textContent = currentPhraseData.promptPersonalize;

      const personalizeDiv = document.createElement('div');
      personalizeDiv.innerHTML = `
        <label style="font-size:13px; color:var(--text-muted);">Digite ou ajuste a frase para a sua vida real:</label>
        <input type="text" id="inputPersonalized" class="custom-input" value="${currentPersonalizedPhrase}">
        <small style="color:var(--text-muted); display:block; margin-top:6px;">Exemplo: "${currentPhraseData.samplePersonalized}"</small>
      `;
      stepInteractiveArea.appendChild(personalizeDiv);

      const inputP = document.getElementById('inputPersonalized');
      inputP.addEventListener('input', (e) => {
        currentPersonalizedPhrase = e.target.value;
        phraseEnglish.textContent = `"${currentPersonalizedPhrase}"`;
      });
      phraseEnglish.textContent = `"${currentPersonalizedPhrase}"`;
      break;

    case 5:
      stepTitle.textContent = "Minuto 5 — Write & Lock in (Escrever e Travar)";
      stepInstruction.textContent = "Para selar essa frase no seu cérebro, digite exatamente a frase personalizada que você criou:";

      const writeDiv = document.createElement('div');
      writeDiv.innerHTML = `
        <div style="background:#0f172a; padding:12px; border-radius:8px; margin-bottom:10px; font-weight:600; color:var(--accent);">
          Meta: "${currentPersonalizedPhrase}"
        </div>
        <input type="text" id="inputWriteFinal" class="custom-input" placeholder="Digite sua frase aqui..." value="${currentWrittenPhrase}">
        <p id="writeFeedback" style="margin-top:8px; font-size:13px; font-weight:600;"></p>
      `;
      stepInteractiveArea.appendChild(writeDiv);

      const inputW = document.getElementById('inputWriteFinal');
      inputW.addEventListener('input', (e) => {
        currentWrittenPhrase = e.target.value;
      });
      break;
  }
}

// Speech Audio TTS with Natural Voice Selection
function playAudio(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.92; // Slightly natural cadence
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural / high quality native English voices
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (
        v.name.includes('Natural') || 
        v.name.includes('Google US English') || 
        v.name.includes('Samantha') || 
        v.name.includes('Karen') || 
        v.name.includes('Daniel') || 
        v.name.includes('Enhanced')
      )
    ) || voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

// Update Stepper UI dots
function updateStepperUI(activeStep) {
  document.querySelectorAll('.step-dot').forEach(dot => {
    const s = parseInt(dot.getAttribute('data-step'));
    dot.classList.remove('active', 'completed');
    if (s === activeStep) dot.classList.add('active');
    else if (s < activeStep) dot.classList.add('completed');
  });
}

// Event Listeners Setup
function setupEventListeners() {
  btnListenSpeech.addEventListener('click', () => {
    const textToSpeak = currentStep === 4 || currentStep === 5 ? currentPersonalizedPhrase : phraseEnglish.textContent.replace(/"/g, '');
    playAudio(textToSpeak);
  });

  btnBackToMap.addEventListener('click', () => {
    gameScreen.classList.remove('active');
    mapScreen.classList.add('active');
    renderMapScreen();
  });

  btnPrevStep.addEventListener('click', () => {
    if (currentStep > 1) {
      renderStep(currentStep - 1);
    }
  });

  btnNextStep.addEventListener('click', () => {
    if (currentStep === 5) {
      // Validate step 5 typing (optional soft check)
      if (!currentWrittenPhrase.trim()) {
        const fb = document.getElementById('writeFeedback');
        if (fb) {
          fb.style.color = '#ef4444';
          fb.textContent = 'Por favor, digite a frase para concluir a fase!';
        }
        return;
      }
      completeCurrentLevel();
    } else {
      renderStep(currentStep + 1);
    }
  });

  btnNextLevel.addEventListener('click', () => {
    completedModal.classList.remove('active');
    if (currentLevelId < 30) {
      startLevel(currentLevelId + 1);
    } else {
      gameScreen.classList.remove('active');
      mapScreen.classList.add('active');
      renderMapScreen();
    }
  });

  btnModalMap.addEventListener('click', () => {
    completedModal.classList.remove('active');
    gameScreen.classList.remove('active');
    mapScreen.classList.add('active');
    renderMapScreen();
  });

  btnResetProgress.addEventListener('click', () => {
    if (confirm("Deseja realmente resetar todo o seu progresso das 30 fases?")) {
      completedLevels = [];
      localStorage.removeItem('english_habit_completed_levels');
      renderMapScreen();
    }
  });
}

// Complete Level Handler
function completeCurrentLevel() {
  if (!completedLevels.includes(currentLevelId)) {
    completedLevels.push(currentLevelId);
    localStorage.setItem('english_habit_completed_levels', JSON.stringify(completedLevels));
  }

  summaryFinalPhrase.textContent = `"${currentPersonalizedPhrase}"`;
  playAudio(`Congratulations! You completed level ${currentLevelId}!`);
  completedModal.classList.add('active');
}
