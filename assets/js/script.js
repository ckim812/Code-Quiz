let timeLeft = 60;
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
const highScoresArea = document.getElementById("highScores-area");

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
  localStorage.setItem("allHighScores", []);
};

const clock = () => {
  timeLeft--;
  if (timeLeft < 1) {
    quizDone = true;
    clearInterval(clockId);
    timeLeft = 0;
    displayHighScores();
  }
  if (!quizDone) document.querySelector(".timer-count").innerHTML = timeLeft;
};

const handleAnswer = (correct, choice) => {
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
      timeLeft = timeLeft - 10;
    }
    console.log("before show question", qI);
    console.log("question Length", questions.length);
    showQuestion();
  }
  qI++;
  if (qI > questions.length) {
    console.log("WIN triggered");
    quizDone = true;
    clearInterval(clockId);
    player = prompt("Please enter your name:");
    const highScore = { name: player, score: score, timeLeft: timeLeft };
    displayHighScores(highScore);
  }
  console.log("after if statement", qI);
  document.querySelector("#user-score").innerHTML = score;
};

const displayHighScores = (playerScore) => {
  takeQuizBtn.style.display = "none";
  info.style.display = "none";
  questionArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  timerBox.style.display = "none";
  highScoresBox.style.display = "none";
  highScoresArea.style.display = "inline";
  restartBtn.style.display = "inline";
  questionTitle.textContent = "High Scores";

  const currentHighScoresRaw = localStorage.getItem("allHighScores");
  let currentHighScores = currentHighScoresRaw
    ? JSON.parse(currentHighScoresRaw)
    : [];
  if (playerScore) {
    currentHighScores.push(playerScore);
    let currentHighScoresString = JSON.stringify(currentHighScores);
    localStorage.setItem("allHighScores", currentHighScoresString);
  }

  console.log(allHighScores);
  console.log(typeof allHighScores);
  console.log(allHighScores.length);

  const highScoresList = document.getElementById("highScores-list");

  while (highScoresList.firstChild) {
    highScoresList.removeChild(highScoresList.firstChild);
  }

  for (let i = 0; i < currentHighScores.length; i++) {
    console.log(currentHighScores[i]);
    let scoreItem = document.createElement("li");
    scoreItem.setAttribute("id", "scores-list");
    scoreItem.innerHTML =
      currentHighScores[i].name +
      ", " +
      currentHighScores[i].score +
      ", " +
      currentHighScores[i].timeLeft;
    highScoresList.appendChild(scoreItem);
  }
};

const showQuestion = () => {
  let { N, Q, A, C } = questions[qI]; //destructuring questions array
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
  timeLeft = 60;
  quizRun = true;
  clockId;
  qI = 0;
  score = 0;
  quizDone = false;
  document.querySelector(".timer-count").innerHTML = timeLeft;
};

init();
