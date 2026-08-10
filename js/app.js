// KET English Daily Check-in App - Main Application Logic

(function () {
  'use strict';

  // ===== State Management =====
  const STORAGE_KEY = 'ket_checkin_data';

  const defaultState = {
    streak_days: 0,
    energy_points: 50,
    wrong_words: [],
    last_checkin: null,
    total_days: 0,
    badges: [],
    perfect_count: 0,
    completed_passage_ids: []
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        return Object.assign({}, defaultState, saved);
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    }
    return Object.assign({}, defaultState);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Trigger cloud sync after saving
      if (typeof triggerSync === 'function') {
        triggerSync();
      }
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  let state = loadState();

  // ===== Date Helpers =====
  function getToday() {
    return new Date().toISOString().slice(0, 10);
  }

  function isTodayCheckedIn() {
    return state.last_checkin === getToday();
  }

  function getYesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }

  // ===== Screen Navigation =====
  let currentScreen = 'dashboard';
  let currentStep = 0; // Track current step (1-4)
  let currentPassage = null;
  let currentPassages = []; // Array of passages for today's session
  let quizQuestions = []; // Flattened list of questions with passage reference
  let currentQuestionIndex = 0;
  let correctCount = 0;
  let wrongQuestions = [];
  let firstAttemptWrong = []; // Track questions wrong on first attempt
  let currentQuestionFirstAttempt = true; // Track if current question is on first attempt
  const TOTAL_QUESTIONS = 6; // Number of questions per session

  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(function (s) {
      s.classList.remove('active');
    });
    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
      currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // ===== Dashboard =====
  function renderDashboard() {
    var greetingEl = document.getElementById('dashboard-greeting');
    var streakEl = document.getElementById('stat-streak');
    var energyEl = document.getElementById('stat-energy');
    var totalEl = document.getElementById('stat-total');
    var startBtn = document.getElementById('start-btn');
    var startBtnText = document.getElementById('start-btn-text');
    var checkedinArea = document.getElementById('checkedin-area');
    var startArea = document.getElementById('start-area');
    var badgeGrid = document.getElementById('badge-grid');

    var hour = new Date().getHours();
    var greeting = '';
    if (hour < 12) greeting = 'Good morning, Emma! \ud83c\udf1e';
    else if (hour < 18) greeting = 'Good afternoon, Emma! \u2600\ufe0f';
    else greeting = 'Good evening, Emma! \ud83c\udf19';

    greetingEl.textContent = greeting;
    streakEl.textContent = state.streak_days;
    energyEl.innerHTML = '<span class="energy-icon">' + getEnergyIcon() + '</span> ' + state.energy_points;
    totalEl.textContent = state.total_days;

    if (isTodayCheckedIn()) {
      checkedinArea.style.display = 'block';
      startArea.style.display = 'none';
      var checkedinEl = document.getElementById('checkedin-area');
      checkedinEl.innerHTML =
        '<div class="checkedin-banner">' +
          '<div class="checkedin-emoji">\ud83d\udc31\u2728\ud83d\udc30</div>' +
          '<div class="checkedin-text">Well done, Emma! Today\'s adventure is complete!</div>' +
          '<div class="checkedin-sub">Mimi & BunBun say: See you tomorrow! \ud83d\udc96</div>' +
        '</div>';
    } else {
      checkedinArea.style.display = 'none';
      startArea.style.display = 'block';
    }

    // Render badges
    badgeGrid.innerHTML = '';
    BADGES.forEach(function (badge) {
      var unlocked = state.badges.indexOf(badge.id) !== -1;
      var div = document.createElement('div');
      div.className = 'badge-item ' + (unlocked ? 'unlocked' : 'locked');
      div.innerHTML =
        '<span class="badge-emoji">' + badge.emoji + '</span>' +
        '<span class="badge-name">' + badge.name + '</span>';
      div.title = badge.desc;
      badgeGrid.appendChild(div);
    });
  }

  // ===== Wrong Words Notebook =====
  function renderWrongWords() {
    var listEl = document.getElementById('words-list');
    var emptyEl = document.getElementById('words-empty');

    if (state.wrong_words.length === 0) {
      emptyEl.style.display = 'block';
      emptyEl.innerHTML =
        '<div class="words-empty-emoji">\ud83d\udc31\ud83d\udc30</div>' +
        '<div class="words-empty-text">No wrong words yet! Emma is doing great! \u8fd8\u6ca1\u6709\u9519\u8bcd\u54e6\uff0cEmma\u771f\u68d2\uff01</div>';
      listEl.innerHTML = '';
      return;
    }

    emptyEl.style.display = 'none';
    listEl.innerHTML = '';

    state.wrong_words.forEach(function (w) {
      var card = document.createElement('div');
      card.className = 'word-card';
      var cardEmoji = Math.random() > 0.5 ? '\ud83d\udc3e' : '\ud83e\udd55';

      // Build examples HTML if available
      var examplesHtml = '';
      if (w.examples && w.examples.length > 0) {
        examplesHtml = '<div class="word-card-examples">';
        w.examples.forEach(function (ex) {
          // Bold the word in the example (case-insensitive)
          var boldEx = ex.replace(new RegExp('\\b' + w.word + '\\b', 'gi'), '<strong>' + w.word + '</strong>');
          examplesHtml += '<div class="word-example">\ud83d\udcad ' + boldEx + '</div>';
        });
        examplesHtml += '</div>';
      }

      card.innerHTML =
        '<span class="word-card-emoji">' + cardEmoji + '</span>' +
        '<div class="word-card-info">' +
          '<div class="word-card-word">' + w.word + '</div>' +
          '<div class="word-card-phonetic">' + w.phonetic + '</div>' +
          '<div class="word-card-meaning">' + w.meaning + '</div>' +
          examplesHtml +
        '</div>' +
        '<span class="word-card-count">Wrong ' + w.count + 'x</span>';
      listEl.appendChild(card);
    });
  }

  // ===== Helper: Mascot & Energy Icons =====
  function getEnergyIcon() {
    return state.energy_points % 2 === 0 ? '\ud83d\udc1f' : '\ud83e\udd55';
  }

  function getRandomMascot() {
    return Math.random() > 0.5 ? '\ud83d\udc31' : '\ud83d\udc30';
  }

  function getMascotName() {
    return Math.random() > 0.5 ? 'Mimi' : 'BunBun';
  }

  // ===== Pick Passages & Questions =====
  // Use date-based selection to ensure different passage every day
  function pickPassages() {
    var today = getToday();
    // Simple hash of date string to get a deterministic index
    var hash = 0;
    for (var i = 0; i < today.length; i++) {
      hash = ((hash << 5) - hash) + today.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }
    var index = Math.abs(hash) % PASSAGES.length;
    return [PASSAGES[index]];
  }

  function buildQuizQuestions(passages) {
    // Collect all questions from the passage
    var allQuestions = [];
    passages.forEach(function(p) {
      p.questions.forEach(function(q) {
        allQuestions.push({
          passage: p,
          type: q.type,
          question: q.question,
          options: q.options.slice(), // Copy options
          answer: q.answer,
          hint: q.hint
        });
      });
    });
    // Shuffle questions
    return allQuestions.sort(function() { return Math.random() - 0.5; });
  }

  // Shuffle options for a question and return new answer index
  function shuffleQuestion(q) {
    var indices = q.options.map(function(_, i) { return i; });
    // Fisher-Yates shuffle
    for (var i = indices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = indices[i];
      indices[i] = indices[j];
      indices[j] = temp;
    }
    var newOptions = indices.map(function(idx) { return q.options[idx]; });
    var newAnswer = indices.indexOf(q.answer);
    return { options: newOptions, answer: newAnswer };
  }

  // ===== Step 1: Warm-up =====
  function startCheckin() {
    // Save state snapshot before today's check-in (for reset functionality)
    var snapshotKey = 'ket_checkin_snapshot_' + getToday();
    if (!localStorage.getItem(snapshotKey)) {
      var snapshot = {
        streak_days: state.streak_days,
        energy_points: state.energy_points,
        wrong_words: JSON.parse(JSON.stringify(state.wrong_words)),
        badges: state.badges.slice(),
        perfect_count: state.perfect_count,
        completed_passage_ids: state.completed_passage_ids.slice(),
        last_checkin: state.last_checkin,
        total_days: state.total_days
      };
      localStorage.setItem(snapshotKey, JSON.stringify(snapshot));
    }

    // Pick 2 passages and build 6 questions
    currentPassages = pickPassages();
    currentPassage = currentPassages[0]; // Keep for backward compatibility
    // Save currentPassages to localStorage for retry functionality
    localStorage.setItem('ket_current_passages', JSON.stringify(currentPassages));
    quizQuestions = buildQuizQuestions(currentPassages);
    // Shuffle options for each question
    quizQuestions = quizQuestions.map(function(q) {
      var shuffled = shuffleQuestion(q);
      return Object.assign({}, q, { options: shuffled.options, answer: shuffled.answer });
    });
    
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongQuestions = [];
    firstAttemptWrong = [];
    currentQuestionFirstAttempt = true;

    document.getElementById('warmup-streak').textContent = state.streak_days;
    document.getElementById('warmup-energy').innerHTML = '<span class="energy-icon">' + getEnergyIcon() + '</span> ' + state.energy_points;

    var rewardText = '\ud83c\udfc5 All correct = +30 ' + getEnergyIcon() + ' + Badge chance!';
    document.getElementById('warmup-reward').textContent = rewardText;

    // Update mascot in warmup
    var warmupEmoji = document.getElementById('warmup-emoji');
    if (warmupEmoji) {
      warmupEmoji.innerHTML = '<span class="mascot-character">\ud83d\udc31</span> <span class="mascot-character" style="animation-delay:0.3s">\ud83d\udc30</span>';
    }

    showScreen('step1');
  }

  // ===== Step 2: Reading =====
  function renderReading() {
    // Show both passages
    var readingContent = document.getElementById('reading-content');
    var vocabList = document.getElementById('vocab-list');
    
    // Build passages HTML
    var passagesHtml = '';
    var allVocab = [];
    currentPassages.forEach(function(p, idx) {
      passagesHtml += '<div class="passage-block">' +
        '<h3 class="passage-title"><span>' + p.themeEmoji + '</span> ' + p.title + '</h3>' +
        '<div class="passage-text">' + p.text + '</div>' +
      '</div>';
      // Collect vocabulary
      p.vocabulary.forEach(function(v) {
        if (!allVocab.find(function(ev) { return ev.word === v.word; })) {
          allVocab.push(v);
        }
      });
    });
    readingContent.innerHTML = passagesHtml;
    
    // Show theme info
    document.getElementById('reading-theme').textContent = 
      currentPassages.map(function(p) { return p.themeEmoji + ' ' + p.theme; }).join(' & ') + ' · PET B1';

    // Vocabulary
    vocabList.innerHTML = '';
    allVocab.forEach(function (v) {
      var item = document.createElement('div');
      item.className = 'vocab-item';
      item.innerHTML =
        '<div>' +
          '<span class="vocab-word">' + v.word + '</span> ' +
          '<span class="vocab-phonetic">' + v.phonetic + '</span>' +
        '</div>' +
        '<span class="vocab-meaning">' + v.meaning + '</span>';
      vocabList.appendChild(item);
    });

    // Reset TTS button
    var ttsBtn = document.getElementById('tts-btn');
    ttsBtn.classList.remove('playing');
    ttsBtn.innerHTML = '\ud83d\udd0a Listen';

    // Initialize speech recognition section
    initSpeechSection();

    showScreen('step2');
  }

  // ===== TTS (Web Speech API) =====
  var currentUtterance = null;

  function toggleTTS() {
    var ttsBtn = document.getElementById('tts-btn');

    if (currentUtterance && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      ttsBtn.classList.remove('playing');
      ttsBtn.innerHTML = '\ud83d\udd0a \u542c\u6717\u8bfb';
      currentUtterance = null;
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('\u62b1\u6b49\uff0c\u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u8bed\u97f3\u529f\u80fd \ud83d\ude14');
      return;
    }

    // Strip HTML tags for TTS - combine all passages
    var plainText = currentPassages.map(function(p) {
      return p.text.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    }).join('. ');
    var utterance = new SpeechSynthesisUtterance(plainText);
    utterance.lang = 'en-GB';
    utterance.rate = 0.85;
    utterance.pitch = 1.1;

    // Try to find an English voice
    var voices = speechSynthesis.getVoices();
    var enVoice = voices.find(function (v) {
      return v.lang.startsWith('en-GB') || v.lang.startsWith('en-US');
    });
    if (enVoice) {
      utterance.voice = enVoice;
    }

    ttsBtn.classList.add('playing');
    ttsBtn.innerHTML = '\u23f8 \u6682\u505c';
    currentUtterance = utterance;

    utterance.onend = function () {
      ttsBtn.classList.remove('playing');
      ttsBtn.innerHTML = '\ud83d\udd0a \u542c\u6717\u8bfb';
      currentUtterance = null;
    };

    utterance.onerror = function () {
      ttsBtn.classList.remove('playing');
      ttsBtn.innerHTML = '\ud83d\udd0a \u542c\u6717\u8bfb';
      currentUtterance = null;
    };

    speechSynthesis.speak(utterance);
  }

  // Preload voices
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = function () {
      speechSynthesis.getVoices();
    };
  }

  // ===== Speech Recognition for Reading Assessment =====
  var recognition = null;
  var isRecording = false;
  var recognizedText = '';
  var intentionalStop = false; // Flag to prevent auto-restart

  function initSpeechSection() {
    var speechSection = document.getElementById('speech-section');
    var speechBtn = document.getElementById('speech-btn');
    var speechStatus = document.getElementById('speech-status');
    var speechFeedback = document.getElementById('speech-feedback');

    // Hide feedback initially
    speechFeedback.style.display = 'none';

    // Check browser support
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speechSection.innerHTML =
        '<div class="speech-not-supported">' +
          '\ud83d\ude14 \u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u8bed\u97f3\u8bc6\u522b\u529f\u80fd<br>' +
          '<small>\u5efa\u8bae\u4f7f\u7528 Chrome \u6216 Safari \u6d4f\u89c8\u5668</small>' +
        '</div>';
      return;
    }

    // Initialize recognition
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
      var interim = '';
      var final = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      recognizedText = final + interim;
      speechStatus.textContent = '\ud83c\udf99\ufe0f \u6b63\u5728\u542c... ' + (interim ? '"' + interim + '"' : '');
    };

    recognition.onerror = function (event) {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'no-speech') {
        speechStatus.textContent = '\ud83e\udd14 \u6ca1\u6709\u542c\u5230\u58f0\u97f3\uff0c\u8bf7\u518d\u8bd5\u4e00\u6b21~';
      } else if (event.error === 'not-allowed') {
        speechStatus.textContent = '\ud83d\ude45 \u8bf7\u5141\u8bb8\u9ea6\u514b\u98ce\u6743\u9650\u54e6~';
        stopRecording();
      } else {
        speechStatus.textContent = '\u274c \u8bc6\u522b\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5';
        stopRecording();
      }
    };

    recognition.onend = function () {
      if (isRecording && !intentionalStop) {
        // Recognition ended unexpectedly, restart
        try {
          recognition.start();
        } catch (e) {
          stopRecording();
        }
      }
      // Reset the flag after handling
      intentionalStop = false;
    };

    // Button click handler
    speechBtn.onclick = function () {
      if (isRecording) {
        stopRecording();
        showFeedback();
      } else {
        startRecording();
      }
    };
  }

  function startRecording() {
    var speechBtn = document.getElementById('speech-btn');
    var speechStatus = document.getElementById('speech-status');
    var speechAnimation = document.getElementById('speech-animation');
    var speechFeedback = document.getElementById('speech-feedback');

    intentionalStop = false; // Reset flag
    isRecording = true;
    recognizedText = '';
    speechBtn.classList.add('recording');
    speechBtn.innerHTML = '<span class="speech-btn-icon">\u23f8</span> \u505c\u6b62 Stop';
    speechStatus.textContent = '\ud83c\udf99\ufe0f \u70b9\u51fb\u5f00\u59cb\u6717\u8bfb\u5427\uff0cEmma\uff01';
    speechAnimation.style.display = 'flex';
    speechFeedback.style.display = 'none';

    try {
      recognition.start();
    } catch (e) {
      // Already started
    }
  }

  function stopRecording() {
    var speechBtn = document.getElementById('speech-btn');
    var speechStatus = document.getElementById('speech-status');
    var speechAnimation = document.getElementById('speech-animation');

    intentionalStop = true; // Set flag BEFORE stopping
    isRecording = false;
    speechBtn.classList.remove('recording');
    speechBtn.innerHTML = '<span class="speech-btn-icon">\ud83c\udf99\ufe0f</span> \u5f00\u59cb\u6717\u8bfb Start Reading';
    speechStatus.textContent = '\u2705 \u6717\u8bfb\u5b8c\u6210\uff01\u6b63\u5728\u5206\u6790...';
    speechAnimation.style.display = 'none';

    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        // Already stopped
      }
    }
  }

  function showFeedback() {
    var speechFeedback = document.getElementById('speech-feedback');
    var speechStatus = document.getElementById('speech-status');

    // Get original text (strip HTML tags) - combine all passages
    var originalText = currentPassages.map(function(p) {
      return p.text.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
    }).join('. ');
    var originalWords = originalText.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });
    var recognizedWords = recognizedText.toLowerCase().split(/\s+/).filter(function(w) { return w.length > 0; });

    // Compare words
    var correctCount = 0;
    var totalWords = originalWords.length;
    var feedbackHtml = '';

    originalWords.forEach(function (word, index) {
      // Clean word (remove punctuation)
      var cleanWord = word.replace(/[.,!?;:'"()]/g, '');
      var isCorrect = false;

      // Check if word was recognized (allow some flexibility)
      for (var i = 0; i < recognizedWords.length; i++) {
        var recWord = recognizedWords[i].replace(/[.,!?;:'"()]/g, '');
        if (recWord === cleanWord || recWord === cleanWord + 's' || cleanWord === recWord + 's') {
          isCorrect = true;
          break;
        }
        // Allow partial match for longer words
        if (cleanWord.length > 5 && (recWord.indexOf(cleanWord) >= 0 || cleanWord.indexOf(recWord) >= 0)) {
          isCorrect = true;
          break;
        }
      }

      if (isCorrect) {
        correctCount++;
        feedbackHtml += '<span class="word-correct">' + word + '</span> ';
      } else {
        feedbackHtml += '<span class="word-incorrect">' + word + '</span> ';
      }
    });

    // Calculate score
    var score = Math.round((correctCount / totalWords) * 100);
    var scoreClass = score >= 80 ? '' : (score >= 50 ? 'medium' : 'low');

    // Generate encouraging message
    var message = '';
    if (score >= 90) {
      message = '\ud83c\udf1f Amazing, Emma! \u53d1\u97f3\u8d85\u68d2\uff01Mimi \u548c BunBun \u90fd\u5728\u4e3a\u4f60\u9f13\u638c\uff01';
    } else if (score >= 70) {
      message = '\ud83d\ude0a Great job! \u5927\u90e8\u5206\u53d1\u97f3\u90fd\u5f88\u68d2\uff01\u7ee7\u7eed\u52a0\u6cb9\uff01';
    } else if (score >= 50) {
      message = '\ud83d\udcaa Good try! \u8fd9\u51e0\u4e2a\u8bcd\u518d\u7ec3\u4e60\u4e00\u4e0b\u4f1a\u66f4\u597d\u54e6~';
    } else {
      message = '\ud83e\udd17 Never mind! \u591a\u542c\u51e0\u904d\u6717\u8bfb\u5c31\u4f1a\u8d8a\u6765\u8d8a\u597d\uff01';
    }

    speechStatus.textContent = '\u2705 \u6717\u8bfb\u5b8c\u6210\uff01';

    speechFeedback.innerHTML =
      '<div class="feedback-header">' +
        '<span class="feedback-emoji">\ud83d\udcca</span>' +
        '<span class="feedback-title">\u6717\u8bfb\u53cd\u9988 Reading Feedback</span>' +
      '</div>' +
      '<div class="feedback-score ' + scoreClass + '">\u53d1\u97f3\u51c6\u786e\u7387\uff1a' + score + '%</div>' +
      '<div class="feedback-content">' + feedbackHtml + '</div>' +
      '<div class="feedback-message">' + message + '</div>';

    speechFeedback.style.display = 'block';
  }

  // ===== Step 3: Quiz =====
  function renderQuiz() {
    var q = quizQuestions[currentQuestionIndex];
    var typeLabels = {
      detail: '\ud83d\udd0d Detail',
      vocabulary: '\ud83d\udcda Vocabulary',
      inference: '\ud83e\udde0 Inference'
    };

    document.getElementById('quiz-progress').textContent =
      'Question ' + (currentQuestionIndex + 1) + ' / ' + TOTAL_QUESTIONS;

    // Show passage context
    var passageContext = document.getElementById('quiz-passage-context');
    if (passageContext) {
      passageContext.innerHTML = '<span>' + q.passage.themeEmoji + '</span> ' + q.passage.title;
    }

    var card = document.getElementById('quiz-card');
    card.innerHTML =
      '<span class="quiz-type-badge ' + q.type + '">' + typeLabels[q.type] + '</span>' +
      '<div class="quiz-question">' + q.question + '</div>' +
      '<div class="quiz-options" id="quiz-options"></div>' +
      '<div class="quiz-feedback" id="quiz-feedback"></div>';

    var optionsEl = document.getElementById('quiz-options');
    var letters = ['A', 'B', 'C'];
    q.options.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerHTML =
        '<span class="option-letter">' + letters[i] + '</span>' +
        '<span>' + opt + '</span>';
      btn.addEventListener('click', function () {
        handleAnswer(i, q.answer, btn, optionsEl);
      });
      optionsEl.appendChild(btn);
    });

    showScreen('step3');
  }

  function handleAnswer(selected, correct, btnEl, optionsEl) {
    var allBtns = optionsEl.querySelectorAll('.quiz-option');
    var feedback = document.getElementById('quiz-feedback');
    var q = quizQuestions[currentQuestionIndex];

    if (selected === correct) {
      // Correct answer
      btnEl.classList.add('correct');
      allBtns.forEach(function (b) { b.classList.add('disabled'); });

      if (currentQuestionFirstAttempt) {
        // First attempt correct
        correctCount++;
        feedback.className = 'quiz-feedback show correct';
        var mascotReact = Math.random() > 0.5 ? '\ud83d\udc31' : '\ud83d\udc30';
        feedback.innerHTML = '<span class="mascot-mini">' + mascotReact + '</span> \u2705 Correct!';
        createStarBurst(btnEl);
      } else {
        // Correct after retry - still count as correct but no star burst
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = '<span class="mascot-mini">\ud83d\udc31</span> \u2705 Yes!';
      }

      // Auto advance after delay
      setTimeout(function () {
        currentQuestionIndex++;
        currentQuestionFirstAttempt = true; // Reset for next question
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
          renderQuiz();
        } else {
          showResults();
        }
      }, 1500);
    } else {
      // Wrong answer
      btnEl.classList.add('wrong');
      btnEl.classList.add('disabled');

      if (currentQuestionFirstAttempt) {
        // First attempt wrong - mark for wrong words notebook
        firstAttemptWrong.push(currentQuestionIndex);
        currentQuestionFirstAttempt = false;
      }

      // Show hint and let user retry
      feedback.className = 'quiz-feedback show wrong';
      var mascotSad = Math.random() > 0.5 ? '\ud83d\udc31' : '\ud83d\udc30';
      feedback.innerHTML =
        '<span class="mascot-mini">' + mascotSad + '</span> \u274c Try again~' +
        '<div class="quiz-hint">' + q.hint + '</div>';
    }
  }

  // ===== Step 4: Results =====
  function showResults() {
    // Update streak
    var today = getToday();
    if (state.last_checkin !== today) {
      if (state.last_checkin === getYesterday()) {
        state.streak_days++;
      } else if (state.last_checkin !== today) {
        state.streak_days = 1;
      }
      state.total_days++;
      state.last_checkin = today;
      // Mark both passages as completed
      currentPassages.forEach(function(p) {
        if (state.completed_passage_ids.indexOf(p.id) === -1) {
          state.completed_passage_ids.push(p.id);
        }
      });
    }

    // Update energy & perfect count (based on 6 questions)
    var energyChange = 0;
    if (correctCount === TOTAL_QUESTIONS) {
      energyChange = 30;
      state.perfect_count++;
    } else if (correctCount >= 5) {
      energyChange = 10;
    } else if (correctCount >= 4) {
      energyChange = 0;
    } else if (correctCount >= 3) {
      energyChange = -10;
    } else {
      energyChange = -20;
    }
    state.energy_points = Math.max(0, state.energy_points + energyChange);

    // Check badges
    var newBadges = [];
    BADGES.forEach(function (badge) {
      if (state.badges.indexOf(badge.id) === -1 && badge.condition(state)) {
        state.badges.push(badge.id);
        newBadges.push(badge);
      }
    });

    saveState();

    // Render results
    var resultEmoji = document.getElementById('result-emoji');
    var resultTitle = document.getElementById('result-title');
    var resultSubtitle = document.getElementById('result-subtitle');
    var resultScore = document.getElementById('result-score');
    var resultEnergy = document.getElementById('result-energy');
    var resultBadgeArea = document.getElementById('result-badge-area');
    var resultEncouragement = document.getElementById('result-encouragement');
    var resultWrongArea = document.getElementById('result-wrong-area');
    var resultMnemonicArea = document.getElementById('result-mnemonic-area');

    // Emoji and title based on score (out of 6)
    if (correctCount === TOTAL_QUESTIONS) {
      resultEmoji.innerHTML = '<span class="mascot-character mascot-dance">\ud83d\udc31</span> <span class="mascot-character mascot-dance" style="animation-delay:0.2s">\ud83d\udc30</span>';
      resultTitle.textContent = 'Amazing, Emma! Perfect!';
      resultSubtitle.textContent = 'Mimi & BunBun are so proud of you!';
      launchConfetti();
    } else if (correctCount >= 5) {
      resultEmoji.innerHTML = '<span class="mascot-character">\ud83d\udc31</span>';
      resultTitle.textContent = 'Great job, Emma!';
      resultSubtitle.textContent = 'Almost perfect! Keep it up!';
    } else if (correctCount >= 4) {
      resultEmoji.innerHTML = '<span class="mascot-character">\ud83d\udc30</span>';
      resultTitle.textContent = 'Good effort, Emma!';
      resultSubtitle.textContent = 'You\'re getting better every day!';
    } else {
      resultEmoji.innerHTML = '<span class="mascot-character">\ud83d\udc30</span>';
      resultTitle.textContent = 'Keep going, Emma!';
      resultSubtitle.textContent = 'BunBun believes in you!';
    }

    // Stars (out of 6)
    resultScore.innerHTML = '';
    for (var i = 0; i < TOTAL_QUESTIONS; i++) {
      var star = document.createElement('span');
      star.className = 'result-star ' + (i < correctCount ? 'earned' : 'empty');
      star.textContent = '\u2b50';
      star.style.animationDelay = (i * 0.15) + 's';
      resultScore.appendChild(star);
    }

    // Score text
    var scoreText = document.createElement('div');
    scoreText.className = 'result-score-text';
    scoreText.textContent = correctCount + ' / ' + TOTAL_QUESTIONS + ' correct';
    resultScore.appendChild(scoreText);

    // Energy change
    var energyIcon = getEnergyIcon();
    if (energyChange >= 0) {
      resultEnergy.className = 'result-energy positive';
      resultEnergy.innerHTML = '<span class="energy-icon">' + energyIcon + '</span> +' + energyChange;
    } else {
      resultEnergy.className = 'result-energy negative';
      resultEnergy.innerHTML = '<span class="energy-icon">' + energyIcon + '</span> ' + energyChange;
    }

    // New badges
    resultBadgeArea.innerHTML = '';
    newBadges.forEach(function (badge) {
      var div = document.createElement('div');
      div.className = 'result-badge-earned';
      div.innerHTML =
        '<div class="result-badge-emoji">' + badge.emoji + '</div>' +
        '<div class="result-badge-name">' + badge.name + '</div>';
      resultBadgeArea.appendChild(div);
    });

    // Encouragement
    var encCategory = correctCount === TOTAL_QUESTIONS ? 'perfect' : (correctCount >= 4 ? 'good' : 'retry');
    var encList = ENCOURAGEMENTS[encCategory];
    var encMsg = encList[Math.floor(Math.random() * encList.length)];
    resultEncouragement.textContent = encMsg;

    // Wrong words section
    resultWrongArea.innerHTML = '';
    resultWrongArea.style.display = 'none';
    if (correctCount < TOTAL_QUESTIONS) {
      resultWrongArea.style.display = 'block';
      var html = '<h4>\ud83d\udcdd Vocabulary Review</h4>';
      // Collect vocab from wrong questions
      var wrongVocab = [];
      firstAttemptWrong.forEach(function(qi) {
        var q = quizQuestions[qi];
        if (q && q.passage) {
          q.passage.vocabulary.slice(0, 2).forEach(function(v) {
            if (!wrongVocab.find(function(wv) { return wv.word === v.word; })) {
              wrongVocab.push(v);
            }
          });
        }
      });
      wrongVocab.slice(0, 5).forEach(function(v) {
        html += '<div class="result-wrong-word-item">' +
          '\u270f\ufe0f <b>' + v.word + '</b> ' + v.phonetic + ' - ' + v.meaning +
          '</div>';
      });
      resultWrongArea.innerHTML = html;
    }

    // Mnemonic for low scores
    resultMnemonicArea.innerHTML = '';
    resultMnemonicArea.style.display = 'none';
    if (correctCount <= 2) {
      resultMnemonicArea.style.display = 'block';
      resultMnemonicArea.innerHTML =
        '<h4>\ud83c\udf1f Mimi & BunBun\'s Tips</h4>' +
        '<p>Don\'t worry, Emma! Practice makes progress!</p>' +
        '<p>\ud83d\udc31 Try reading the passage aloud</p>' +
        '<p>\ud83d\udc30 Listen to the TTS a few times</p>' +
        '<p>\u2728 Review the vocabulary words</p>' +
        '<p>Mimi & BunBun believe in you! \ud83d\ude80</p>';
    }

    // Save wrong words to state (without navigating)
    firstAttemptWrong.forEach(function (qi) {
      var q = quizQuestions[qi];
      if (!q || !q.passage) return;
      var vocab = q.passage.vocabulary;
      // Add 2-3 random vocabulary words from the passage
      var wordsToAdd = vocab.slice(0, 3);
      wordsToAdd.forEach(function (v) {
        var existing = state.wrong_words.find(function (w) {
          return w.word === v.word;
        });
        if (existing) {
          existing.count++;
        } else {
          state.wrong_words.push({
            word: v.word,
            phonetic: v.phonetic,
            meaning: v.meaning,
            examples: v.examples || [],
            count: 1
          });
        }
      });
    });

    // Final save to persist all changes
    saveState();

    showScreen('step4');
  }

  // ===== Confetti Animation =====
  function launchConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];
    var colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#34D399', '#FF8E8E', '#6EE7DB'];

    for (var i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        drift: (Math.random() - 0.5) * 2
      });
    }

    var frameCount = 0;
    var maxFrames = 180;

    function animate() {
      frameCount++;
      if (frameCount > maxFrames) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function (p) {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - frameCount / maxFrames);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ===== Star Burst Effect =====
  function createStarBurst(element) {
    var rect = element.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    var container = document.createElement('div');
    container.className = 'star-burst';
    container.style.left = cx + 'px';
    container.style.top = cy + 'px';

    var emojis = ['\u2b50', '\u2728', '\ud83c\udf1f', '\ud83d\udcab'];
    for (var i = 0; i < 6; i++) {
      var particle = document.createElement('span');
      particle.className = 'star-particle';
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      var angle = (Math.PI * 2 / 6) * i;
      var dist = 40 + Math.random() * 30;
      particle.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      particle.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      container.appendChild(particle);
    }

    document.body.appendChild(container);
    setTimeout(function () {
      container.remove();
    }, 1000);
  }

  // ===== Navigation Event Listeners =====
  function initNav() {
    // Start button
    document.getElementById('start-btn').addEventListener('click', function () {
      if (!isTodayCheckedIn()) {
        startCheckin();
      }
    });

    // Step navigation buttons
    document.getElementById('btn-step1-next').addEventListener('click', function () {
      renderReading();
    });

    document.getElementById('btn-step2-next').addEventListener('click', function () {
      if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      renderQuiz();
    });

    // Back buttons
    document.getElementById('btn-step1-back').addEventListener('click', function () {
      renderDashboard();
      showScreen('dashboard');
    });

    document.getElementById('btn-step2-back').addEventListener('click', function () {
      if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      // Stop recording if active
      if (isRecording) {
        stopRecording();
      }
      showStep1();
    });

    document.getElementById('btn-step3-back').addEventListener('click', function () {
      renderReading();
    });

    // TTS button
    document.getElementById('tts-btn').addEventListener('click', toggleTTS);

    // Result back to dashboard
    document.getElementById('btn-result-home').addEventListener('click', function () {
      renderDashboard();
      showScreen('dashboard');
    });

    // Nav buttons
    document.getElementById('nav-home').addEventListener('click', function () {
      if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      renderDashboard();
      showScreen('dashboard');
    });

    document.getElementById('nav-words').addEventListener('click', function () {
      renderWrongWords();
      showScreen('words');
    });

    // Back from words
    document.getElementById('btn-words-back').addEventListener('click', function () {
      renderDashboard();
      showScreen('dashboard');
    });

    // Retry button
    document.getElementById('btn-result-retry').addEventListener('click', function () {
      retryToday();
    });

    // Reset today - direct confirm
    document.getElementById('btn-reset-today-direct').addEventListener('click', function () {
      if (!state.last_checkin) {
        alert('Today hasn\'t been done yet! 今天还没有打卡哦~');
        return;
      }
      if (confirm('确定要重置今天的打卡吗？重置后可以重新做一遍~')) {
        resetToday();
        renderDashboard();
        showScreen('dashboard');
      }
    });
  }

  // ===== Retry Today =====
  function retryToday() {
    // Try to restore currentPassages from localStorage if empty
    if (!currentPassages || currentPassages.length === 0) {
      var savedPassages = localStorage.getItem('ket_current_passages');
      if (savedPassages) {
        currentPassages = JSON.parse(savedPassages);
      }
    }
    
    if (!currentPassages || currentPassages.length === 0) {
      alert('No passages found. Please start a new check-in.');
      return;
    }

    // Use snapshot to restore state to before today's check-in
    var snapshotKey = 'ket_checkin_snapshot_' + getToday();
    var snapshot = localStorage.getItem(snapshotKey);
    
    if (snapshot) {
      var savedState = JSON.parse(snapshot);
      state.streak_days = savedState.streak_days;
      state.energy_points = savedState.energy_points;
      state.wrong_words = savedState.wrong_words;
      state.badges = savedState.badges;
      state.perfect_count = savedState.perfect_count;
      state.completed_passage_ids = savedState.completed_passage_ids;
      state.last_checkin = savedState.last_checkin;
      state.total_days = savedState.total_days;
    }

    // Rebuild quiz questions (re-shuffle)
    quizQuestions = buildQuizQuestions(currentPassages);
    quizQuestions = quizQuestions.map(function(q) {
      var shuffled = shuffleQuestion(q);
      return Object.assign({}, q, { options: shuffled.options, answer: shuffled.answer });
    });

    // Reset quiz state but keep the same passages
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongQuestions = [];
    firstAttemptWrong = [];
    currentQuestionFirstAttempt = true;

    saveState();

    // Show Step 1 with the same passages
    showWarmup();
  }

  function showWarmup() {
    document.getElementById('warmup-streak').textContent = state.streak_days;
    document.getElementById('warmup-energy').innerHTML = '<span class="energy-icon">' + getEnergyIcon() + '</span> ' + state.energy_points;

    var rewardText = '\ud83c\udfc5 All correct = +30 ' + getEnergyIcon() + ' + Badge chance!';
    document.getElementById('warmup-reward').textContent = rewardText;

    // Update mascot in warmup
    var warmupEmoji = document.getElementById('warmup-emoji');
    if (warmupEmoji) warmupEmoji.textContent = Math.random() > 0.5 ? '\ud83d\udc31' : '\ud83d\udc30';

    currentStep = 1;
    showScreen('step1');
  }

  // ===== Admin Functions =====
  function resetToday() {
    // Restore state from snapshot (state before today's check-in)
    var snapshotKey = 'ket_checkin_snapshot_' + getToday();
    var snapshot = localStorage.getItem(snapshotKey);
    var today = getToday();
    
    if (snapshot) {
      // Restore from snapshot
      var savedState = JSON.parse(snapshot);
      state.streak_days = savedState.streak_days;
      state.energy_points = savedState.energy_points;
      state.wrong_words = savedState.wrong_words;
      state.badges = savedState.badges;
      state.perfect_count = savedState.perfect_count;
      state.completed_passage_ids = savedState.completed_passage_ids;
      state.last_checkin = savedState.last_checkin;
      state.total_days = savedState.total_days;
    } else {
      // No snapshot - do manual reset (undo today's changes)
      // Only reset if today was actually checked in
      if (state.last_checkin === today) {
        // Undo streak and total_days increment
        if (state.streak_days > 0) {
          state.streak_days--;
        }
        if (state.total_days > 0) {
          state.total_days--;
        }
        
        // Reset energy to default (we can't know exact previous value without snapshot)
        // Keep current energy but reset last_checkin
        state.last_checkin = null;
        
        // Clear wrong words added today (we can't distinguish, so clear all for safety)
        // Actually, let's keep wrong words since we don't know which were added today
        // The user can manually clear them from the words notebook if needed
      }
    }
    
    // Remove the snapshot (no longer needed)
    localStorage.removeItem(snapshotKey);
    // Clear saved passages
    localStorage.removeItem('ket_current_passages');

    // Reset quiz state
    currentStep = 0;
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongQuestions = [];
    firstAttemptWrong = [];
    currentQuestionFirstAttempt = true;
    currentPassage = null;
    // Clear passages so new ones will be selected when user starts again
    currentPassages = [];
    quizQuestions = [];

    saveState();
    
    // Re-render dashboard and go back to home
    renderDashboard();
    showScreen('dashboard');
  }

  // ===== Init =====
  function init() {
    // Check family code verification first
    if (!isFamilyCodeVerified()) {
      // Show family code screen
      showScreen('family-code');
      initFamilyCodeScreen();
      return;
    }

    // Family code verified, proceed with normal init
    initMainApp();
  }

  function initFamilyCodeScreen() {
    const input = document.getElementById('family-code-input');
    const confirmBtn = document.getElementById('family-code-confirm');
    const errorEl = document.getElementById('family-code-error');

    confirmBtn.addEventListener('click', function() {
      const code = input.value.trim();
      if (verifyFamilyCode(code)) {
        // Correct code
        markFamilyCodeVerified();
        errorEl.style.display = 'none';
        // Initialize sync and main app
        initSync().then(function() {
          initMainApp();
        });
      } else {
        // Wrong code
        errorEl.style.display = 'block';
        input.value = '';
        input.focus();
        // Re-trigger shake animation
        errorEl.style.animation = 'none';
        setTimeout(function() {
          errorEl.style.animation = '';
        }, 10);
      }
    });

    // Allow Enter key to submit
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        confirmBtn.click();
      }
    });

    // Focus input on load
    setTimeout(function() {
      input.focus();
    }, 300);
  }

  function initMainApp() {
    // Hide family code screen, show main app
    var familyCodeScreen = document.getElementById('screen-family-code');
    if (familyCodeScreen) {
      familyCodeScreen.classList.remove('active');
    }
    var mainNav = document.getElementById('main-nav');
    if (mainNav) {
      mainNav.style.display = '';
    }

    initNav();
    renderDashboard();
    showScreen('dashboard');
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions to global scope for sync.js
  window.getState = function() { return state; };
  window.saveState = saveState;
})();
