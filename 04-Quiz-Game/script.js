// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const themeToggle = document.getElementById("theme-toggle");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

// Quiz Questions
const quizQuestions = [
  {
    question: "Who is the President of America as in 2025?",
    answers: [
      { text: "Emannuel Macron", correct: false },
      { text: "George Bush", correct: false },
      { text: "Donald Trump", correct: true },
      { text: "Giorgia Meloni", correct: false },
    ],
  },
  {
    question: "Who defeated Pain of the Akatsuki?",
    answers: [
      { text: "Kakashi Hatake", correct: false },
      { text: "Naruto Uzumaki", correct: true },
      { text: "Hinata Hyuga", correct: false },
      { text: "Minato Namikaze", correct: false },
    ],
  },
  {
    question: "How many continents are there in the world?",
    answers: [
      { text: "Three", correct: false },
      { text: "Eleven", correct: false },
      { text: "Nine", correct: false },
      { text: "Seven", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "Which song is sung by Billie Eilish?",
    answers: [
      { text: "Die With A Smile", correct: false },
      { text: "Somewhere Only We Know", correct: false },
      { text: "Happier Than Ever", correct: true },
      { text: "Seven Years Old", correct: false },
    ],
  },
];

// Game State
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

// Initialize
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
themeToggle.addEventListener("click", toggleTheme);

// Check for saved theme preference
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Functions
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = `${
    (currentQuestionIndex / quizQuestions.length) * 100
  }%`;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  // Highlight correct/incorrect answers
  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else if (btn === selected) {
      btn.classList.add("incorrect");
    }
  });

  // Update score if correct
  if (correct) {
    score++;
    scoreSpan.textContent = score;
  }

  // Move to next question or show results
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  // Calculate percentage and show appropriate message
  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius! 🎯";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff! 👍";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning! 📚";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve! 💪";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better! ✨";
  }

  progressBar.style.width = "100%";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDarkMode = document.body.classList.contains("dark");

  // Save preference to localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");

  // Change icon
  themeToggle.innerHTML = isDarkMode
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  // Add animation class
  themeToggle.classList.add("theme-toggle-animate");
  setTimeout(() => {
    themeToggle.classList.remove("theme-toggle-animate");
  }, 300);
}
