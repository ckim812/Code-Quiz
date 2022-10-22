// define variables
var main = document.querySelector(".main");
var header = document.querySelector(".header");

// define button variables
var takeQuizBtn = document.querySelector("#takeQuiz");
var restartBtn = document.querySelector("#restart");
var nextBtn = document.querySelector("#next");
var submitBtn = document.querySelector("#submit");

// define score variables
var userScore = document.querySelector("#user-score");
var totalScore = document.querySelector("#total-score");
var score = 0;

// define timer variables
var timerElement = document.querySelector(".timer-count");
var isWin = false;
var timer;
var timerCount = 60;

// define question title/text variables
var questionText = document.querySelector("#question-text");
var optionsText = document.querySelector("#options-text");
var currentQuestion = 0;
var questionText = "";
var optionsText = "";
var userAns = "";
var correctAns = "";

// creating an array that includes question number, question text, options, and answers
var questions = [
  {
    numb: 1,
    question: "question 1 text?",
    answer: "questions 1 option1",
    options: [
      "questions 1 option1",
      "questions 1 option2",
      "questions 1 option3",
      "questions 1 option4",
    ],
  },
  {
    numb: 2,
    question: "question 2 text?",
    answer: "questions 2 option2",
    options: [
      "questions 2 option1",
      "questions 2 option2",
      "questions 2 option3",
      "questions 2 option4",
    ],
  },
  {
    numb: 3,
    question: "question 3 text?",
    answer: "questions 3 option3",
    options: [
      "questions 3 option1",
      "questions 3 option2",
      "questions 3 option3",
      "questions 3 option4",
    ],
  },
  {
    numb: 4,
    question: "question 4 text?",
    answer: "questions 4 option4",
    options: [
      "questions 4 option1",
      "questions 4 option2",
      "questions 4 option3",
      "questions 4 option4",
    ],
  },
  {
    numb: 5,
    question: "question 5 text?",
    answer: "questions 5 option1",
    options: [
      "questions 5 option1",
      "questions 5 option2",
      "questions 5 option3",
      "questions 5 option4",
    ],
  },
  {
    numb: 6,
    question: "question 6 text?",
    answer: "questions 6 option2",
    options: [
      "questions 6 option1",
      "questions 6 option2",
      "questions 6 option3",
      "questions 6 option4",
    ],
  },
];

init();

// Add onclick events to buttons
takeQuizBtn.addEventListener("click", takeQuiz(1));
restartBtn.addEventListener("click", restart);
nextBtn.addEventListener("click", next);
submitBtn.addEventListener("click", submit);

function init() {
  // hide restart, next, and submit buttons at start
  restartBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  submitBtn.classList.add("hide");
}

// begin quiz function
function takeQuiz(index) {
  restartBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  submitBtn.classList.add("hide");

  console.log("takequiz click working");
  startTimer();
  currentQuestion = 0;

  totalScore.innerHTML = questions.length;
  console.log(totalScore);

  questionText.innerHTML = questions[currentQuestion].question;
  console.log(questionText);

  //creating a new span and div tag for question and option and passing the value using array index
  var questionTag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  var optionsTag =
    '<button class="btn option"><span>' +
    questions[index].options[0] +
    "</span></button>" +
    '<button class="btn option"><span>' +
    questions[index].options[1] +
    "</span>button>" +
    '<button class="btn option"><span>' +
    questions[index].options[2] +
    "</span>button>" +
    '<button class="btn option"><span>' +
    questions[index].options[3] +
    "</span>button>";
  console.log(questionTag);
  console.log(questionText);
  console.log(optionsTag);
  console.log(optionsText);

  // display question and options text
  questionText.textContent = questionTag;
  optionsText.textContent = optionsText;
  localStorage.setItem("questionsText", questionTag);
  localStorage.setItem("optionsText", optionsTag);
  questionText.innerHTML = questionTag;
  optionsText.innerHTML = optionsTag;

  // check if chosen answer is correct and if correct, add to score
  optionSelected();

  // go to next question
  // paste "next" function HERE;
}

//if user clicked on option
function optionSelected() {
  var userAns = answer.textContent; //getting user selected option
  var correcAns = questions[currentQuestion].answer; //getting correct answer from array
  var allOptions = questions[currentQuestion].options.length; //getting all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    score += 1; //adding +1 to score value
    
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (optionsText.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        
        console.log("Auto selected correct answer.");
      }
    }
  }
  
  // go to next question
  // paste "next" function HERE;
}

// timer function
function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      // loseGame();
    }
  }, 1000);
}

// restart quiz button function
function restart() {
  currentQuestion = 0;
  nextBtn.classList.remove("hide");
  submitBtn.classList.remove("hide");
  trueBtn.classList.remove("hide");
  falseBtn.classList.remove("hide");
  score = 0;
  userScore.innerHTML = score;
  takeQuiz();
}

// next button function
function next() {
  currentQuestion++;
  questionText.innerHTML = questions[currentQuestion].question;
}

// //  submit button function
function submit() {
  prevBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  submitBtn.classList.add("hide");
  trueBtn.classList.add("hide");
  falseBtn.classList.add("hide");
  questionText.innerHTML = "Congratulations on submitting the Quiz!";
}
