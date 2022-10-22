let time = 60;
let quizRun = true;
let clockId;
let qI = 0;
const questionTitle = document.querySelector("#question-title");
const questionText = document.querySelector("#question-text");
const answerChoices = document.querySelector("#answer-choices");
const takeQuizBtn = document.querySelector("#takeQuiz");
const submitBtn = document.querySelector("#submit");
const restartBtn = document.querySelector("#restart");

const clock = () => {
  time--;
  if (time < 1) {
    clearInterval(clockId);
    time = 0;
  }
  document.querySelector(".timer-count").innerHTML = time;
};

const handleAnswer = (correct, choice) => {
  if (choice == correct) {
    console.log("Right!");
  } else {
    console.log("wrong!");
  }
  qI++;
  showQuestion();
};

const showQuestion = () => {
  let { N, Q, A, C } = questions[qI];
  questionTitle.innerHTML = `<h1>${N}</h1>`;
  questionText.innerHTML = `<h2>${Q}</h2>`;
  answerChoices.innerHTML = '';
  A.forEach((answer) => {
    answerChoices.innerHTML += `<button class="btn" onclick="handleAnswer('${C}','${answer}')">${answer}</button>`;
  });
};

const hideButtons = (hide) => {
  if (hide) {
    submitBtn.style.display = "none";
    restartBtn.style.display = "none";
  } else {
    submitBtn.style.display = "inline";
    restartBtn.style.display = "inline";
  }
};

const takeQuiz = () => {
  if (!quizRun) return;
  clockId = setInterval(clock, 1000);
  takeQuizBtn.style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("question-area").style.display = "inline";
  showQuestion();
  quizRun = false;
};

hideButtons(true);
document.getElementById("question-area").style.display = "none";
document.getElementById("takeQuiz").addEventListener("click", takeQuiz);
