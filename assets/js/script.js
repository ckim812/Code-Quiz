let timeLeft = 60;
let quizRun = true;
let clockId;
let questionIndex = 0;
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
const clearHighScoresBtn = document.querySelector("#clearHighScores");
const message = document.querySelector("#message");
const scoreBox = document.querySelector("#scoreBox");
const info = document.getElementById("info");
const timerBox = document.getElementById("timerBox");
const highScoresBox = document.getElementById("highScoresBox");
const highScoresArea = document.getElementById("highScores-area");

const init = () => {
  restartBtn.style.display = "none";
  clearHighScoresBtn.style.display = "none";
  questionArea.style.display = "none";
  highScoresArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  document.querySelector("#total-score").innerHTML = questions.length;
  takeQuizBtn.addEventListener("click", takeQuiz);
  highScoresBox.addEventListener("click", displayHighScores);
  restartBtn.addEventListener("click", restart);
  clearHighScoresBtn.addEventListener("click", clearHighScores);
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
  if (questionIndex < questions.length) {
    if (choice == correct) {
      message.innerHTML = "<h2>Correct! (+1 score)</h2>";
      score++;
      document.querySelector("#user-score").innerHTML = score;
    } else {
      message.innerHTML = "<h2>Incorrect! (-10 sec)</h2>";
      timeLeft = timeLeft - 10;
    }
    questionIndex++;
  }
  if (questionIndex < questions.length) showQuestion();
  if (questionIndex == questions.length) {
    quizDone = true;
    document.querySelector("#user-score").innerHTML = score;
    player = prompt("Please enter your name or initials:");
    const highScore = { name: player, score: score, timeLeft: timeLeft };
    displayHighScores(highScore);
  }
  document.querySelector("#user-score").innerHTML = score;
};

const displayHighScores = (playerScore) => {
  const highScoresList = document.getElementById("highScores-list");
  takeQuizBtn.style.display = "none";
  info.style.display = "none";
  questionArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  timerBox.style.display = "none";
  highScoresBox.style.display = "none";
  highScoresArea.style.display = "inline";
  highScoresList.style.display = "inline";
  restartBtn.style.display = "inline";
  clearHighScoresBtn.style.display = "inline";

  clearInterval(clockId);

  document.getElementById("highScores-title").innerHTML =
    "<h1>High Scores</h1>";
  document.getElementById("highScores-title").style.color = "gray";

  const currentHighScoresRaw = localStorage.getItem("allHighScores");
  //   if currentHighScoresRaw exists, parse it into an array, if not, define it as an empty array
  let currentHighScores = currentHighScoresRaw
    ? JSON.parse(currentHighScoresRaw)
    : [];

  // if playerScore exists, push the object into currentHighScores array, then convert it into a string to store it into localStorage under the label "allHighScores"
  if (quizDone) {
    currentHighScores.push(playerScore);
    let currentHighScoresString = JSON.stringify(currentHighScores);
    localStorage.setItem("allHighScores", currentHighScoresString);

    //   while loop to remove any children currently in highScoresList
    while (highScoresList.firstChild) {
      highScoresList.removeChild(highScoresList.firstChild);
    }

    //   for loop to display each object in currentHighScores in the existing ordered list in the HTML
    for (let i = 0; i < currentHighScores.length; i++) {
      let scoreItem = document.createElement("li");
      scoreItem.setAttribute("id", "scores-list");
      scoreItem.style.color = "green";
      scoreItem.classList.add("highScoreText");
      scoreItem.innerHTML =
        "<span class='bold spacerR'>Player Name:</span>" +
        currentHighScores[i].name +
        "<span class='bold spacerR spacerL'>Number Correct:</span>" +
        currentHighScores[i].score +
        "<span class='bold spacerR spacerL'>Time Left:</span>" +
        currentHighScores[i].timeLeft;
      highScoresList.appendChild(scoreItem);
    }
  }
};

const clearHighScores = () => {
    localStorage.setItem("allHighScores", allHighScores);
    restart();
};

const showQuestion = () => {
  let { qNumber, qText, qAnswerChoices, qCorrectChoice } =
    questions[questionIndex]; //destructuring questions array
  questionTitle.innerHTML = `<h1>${qNumber}</h1>`;
  questionText.innerHTML = `<h2>${qText}</h2>`;
  answerChoices.innerHTML = "";
  qAnswerChoices.forEach((answer) => {
    answerChoices.innerHTML += `<button class="btn" onclick="handleAnswer('${qCorrectChoice}','${answer}')">${answer}</button>`;
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
  clearHighScoresBtn.style.display = "none";
  questionArea.style.display = "none";
  highScoresArea.style.display = "none";
  message.style.display = "none";
  scoreBox.style.display = "none";
  answerChoices.style.display = "none";
  takeQuizBtn.style.display = "inline";
  info.style.display = "inline";
  timerBox.style.display = "block";
  highScoresBox.style.display = "block";
  timeLeft = 60;
  quizRun = true;
  clockId;
  questionIndex = 0;
  score = 0;
  quizDone = false;
  document.querySelector(".timer-count").innerHTML = timeLeft;
};

init();
