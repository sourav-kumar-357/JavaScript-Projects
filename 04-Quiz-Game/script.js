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

const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

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

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
themeToggle.addEventListener("click", toggleTheme);

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

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
  progressBar.style.width =
    (currentQuestionIndex / quizQuestions.length) * 100 + "%";
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

  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    else if (btn === selected) btn.classList.add("incorrect");
  });

  if (correct) {
    score++;
    scoreSpan.textContent = score;
    correctSound.play(); // Play correct sound
  } else {
    incorrectSound.play(); // Play incorrect sound
  }

  setTimeout(() => {
    currentQuestionIndex++;
    currentQuestionIndex < quizQuestions.length
      ? showQuestion()
      : showResults();
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");
  finalScoreSpan.textContent = score;

  const pct = (score / quizQuestions.length) * 100;
  resultMessage.textContent =
    pct === 100
      ? "Perfect! You're a genius!"
      : pct >= 80
      ? "Great job! You know your stuff!"
      : pct >= 60
      ? "Good effort! Keep learning!"
      : pct >= 40
      ? "Not bad! Try again to improve!"
      : "Keep studying! You'll get better!";
  progressBar.style.width = "100%";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}
