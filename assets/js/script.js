let time = 60;
let quizRun = true;
let clockId;
let qI = 0;
let score = 0;
let quizDone = false;
let player = "";
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
  qI = 0;
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
    quizDone = true;
    clearInterval(clockId);
    time = 0;
    displayHighScores();
  }
  if (!quizDone) document.querySelector(".timer-count").innerHTML = time;
};

const handleAnswer = (correct, choice) => {
  console.log("before if statement", qI);
  if (qI < questions.length) {
    console.log("if triggered");
    if (choice == correct) {
      console.log("Correct!");
      message.innerHTML = "<h2>Correct! (+1 score)</h2>";
      score++;
      document.querySelector("#user-score").innerHTML = score;
    } else {
      console.log("Incorrect!");
      message.innerHTML = "<h2>Incorrect! (-10 sec)</h2>";
      time = time - 10;
    }
    qI++;
    if (qI < questions.length) showQuestion();
    if (qI == questions.length) {
      console.log("else triggered");
      quizDone = true;
      clearInterval(clockId);
      player = prompt("Please enter your name:");
      displayHighScores();
    }
  }
  console.log("after if statement", qI);
  document.querySelector("#user-score").innerHTML = score;
};

const displayHighScores = () => {
  takeQuizBtn.style.display = "none";
  info.style.display = "none";
  questionArea.style.display = "inline";
  answerChoices.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  timerBox.style.display = "none";
  highScoresBox.style.display = "none";
  questionTitle.textContent = "High Scores";

  const highScore = [player, score, time];
  if (allHighScores.length === 0) {
    allHighScores = highScore;
  } else {
    var currentHighScores = localStorage.getItem("allHighScores");
    allHighScores = currentHighScores.concat(highScore);
  }
  localStorage.setItem("allHighScores", allHighScores);
  restartBtn.style.display = "inline";
  console.log(allHighScores);
  console.log(typeof allHighScores);
  console.log(allHighScores.length);

  questionText.innerHTML = "";
  for (let i = 0; i < allHighScores.length; i++) {
    console.log(allHighScores[i]);
    questionText.textContent += allHighScores[i];
  }
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
  answerChoices.style.display = "inline";
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
  takeQuizBtn.style.display = "inline";
  info.style.display = "inline";
  answerChoices.style.display = "none";
  timerBox.style.display = "block";
  highScoresBox.style.display = "block";
  time = 60;
  quizRun = true;
  clockId;
  qI = 0;
  score = 0;
  quizDone = false;
  document.querySelector(".timer-count").innerHTML = time;
};

init();
