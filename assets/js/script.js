let time = 60;
let quizRun = true;
let clockId;
let qI = 0;
let score = 0;
let quizDone = false;
var allHighScores = [];
const questionTitle = document.querySelector("#question-title");
const questionText = document.querySelector("#question-text");
const answerChoices = document.querySelector("#answer-choices");
const takeQuizBtn = document.querySelector("#takeQuiz");
const submitBtn = document.querySelector("#submit");
const restartBtn = document.querySelector("#restart");
const userScore = document.querySelector("#user-score");
const totalScore = document.querySelector("#total-score");

const init = () => {
  submitBtn.style.display = "none";
  restartBtn.style.display = "none";
  document.getElementById("question-area").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("score").style.display = "none";
  totalScore.innerHTML = questions.length;
  document.getElementById("takeQuiz").addEventListener("click", takeQuiz);
};

const clock = () => {
  time--;
  if (time < 1) {
    clearInterval(clockId);
    time = 0;
  }
  if (!quizDone) document.querySelector(".timer-count").innerHTML = time;
};

const handleAnswer = (correct, choice) => {
  if (choice == correct) {
    console.log("Correct!");
    document.querySelector("#message").innerHTML = "<h2>Correct!</h2>";
    score++;
  } else {
    console.log("Incorrect!");
    document.querySelector("#message").innerHTML = "<h2>Incorrect!</h2>";
  }
  if (qI <= questions.length) {
    qI++;
    userScore.innerHTML = score;
    showQuestion();
    quizDone = false;
  } else {
    quizDone = true;
  }
  //   if (quizDone)
};

const displayHighScores = () => {
    quizDone = true;

  document.querySelector(".header").innerHTML = "<h1>Code Quiz</h1>";
  let player = prompt("Please enter your name:");
  questionTitle.textContent = "High Scores";
  const highScore = [player, score, time];
  if ((allHighScores.length === 0)) {
    questionText.textContent = highScore;
    allHighScores = highScore;
} else {
    const currentHighScores = localStorage.getItem("allHighScores");
    allHighScores = currentHighScores.concat(currentHighScores);
    questionText.textContent = allHighScores;
}
localStorage.setItem("allHighScores", allHighScores);
};

const showQuestion = () => {
  let { N, Q, A, C } = questions[qI];
  questionTitle.innerHTML = `<h1>${N}</h1>`;
  questionText.innerHTML = `<h2>${Q}</h2>`;
  answerChoices.innerHTML = "";
  A.forEach((answer) => {
    answerChoices.innerHTML += `<button class="btn" onclick="handleAnswer('${C}','${answer}')">${answer}</button>`;
  });
};

const takeQuiz = () => {
  if (!quizRun) return;
  clockId = setInterval(clock, 1000);
  takeQuizBtn.style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("question-area").style.display = "inline";
  document.getElementById("message").style.display = "inline";
  document.getElementById("score").style.display = "inline";
  showQuestion();
  quizRun = false;
};

init();
