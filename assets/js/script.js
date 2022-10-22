let time = 60;
let quizRun = true;
let clockId;
let qI = 0;
let score = 0;
let quizDone = false;
var allHighScores = [];
const questionArea = document.querySelector("#question-area");
const questionTitle = document.querySelector("#question-title");
const questionText = document.querySelector("#question-text");
const answerChoices = document.querySelector("#answer-choices");
const takeQuizBtn = document.querySelector("#takeQuiz");
const restartBtn = document.querySelector("#restart");
const message = document.querySelector("#message");
const scoreBox = document.querySelector("#scoreBox");
const info = document.getElementById("info");
const timerBox = document.getElementById("timerBox");
const highScoresBox = document.getElementById("highScoresBox");

const init = () => {
  restartBtn.style.display = "none";
  questionArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  document.querySelector("#total-score").innerHTML = questions.length;
  takeQuizBtn.addEventListener("click", takeQuiz);
  highScoresBox.addEventListener("click", displayHighScores);
  restartBtn.addEventListener("click", restart);
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
  if (qI < questions.length) {
    if (choice == correct) {
      console.log("Correct!");
      message.innerHTML = "<h2>Correct! (+1 score)</h2>";
      score++;
    } else {
      console.log("Incorrect!");
      message.innerHTML = "<h2>Incorrect! (-10 sec)</h2>";
      time = time - 10;
    }
    qI++;
    document.querySelector("#user-score").innerHTML = score;
    showQuestion();
    quizDone = false;
  } else {
    quizDone = true;
    clearInterval(clockId);
    message.style.display = "none";
    scoreBox.style.display = "none";
    displayHighScores();
  }
  //   if (quizDone)
};

const displayHighScores = () => {
  quizDone = true;
  takeQuizBtn.style.display = "none";
  info.style.display = "none";
  questionArea.style.display = "inline";
  answerChoices.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  timerBox.style.display = "none";
  highScoresBox.style.display = "none";
  let player = prompt("Please enter your name:");
  questionTitle.textContent = "High Scores";
  const highScore = [player, score, time];
  if (allHighScores.length === 0) {
    questionText.textContent = highScore;
    allHighScores = highScore;
  } else {
    const currentHighScores = localStorage.getItem("allHighScores");
    allHighScores = currentHighScores.concat(currentHighScores);
    questionText.textContent = allHighScores;
  }
  localStorage.setItem("allHighScores", allHighScores);
  restartBtn.style.display = "inline";
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
  info.style.display = "none";
  questionArea.style.display = "inline";
  message.style.display = "inline";
  scoreBox.style.display = "inline";
  showQuestion();
  quizRun = false;
};

const restart = () => {
  restartBtn.style.display = "none";
  questionArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  quizDone = false;
  takeQuizBtn.style.display = "inline";
  info.style.display = "inline";
  answerChoices.style.display = "none";
  timerBox.style.display = "block";
  highScoresBox.style.display = "block";
}

init();
