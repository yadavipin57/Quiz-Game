// This is questions
const questionArray = [
  {
    question: 'Who is the current Secretary-General of the United Nations?',
    options: [
      { text: 'António Guterres', correct: true },
      { text: 'Ban Ki-moon', correct: false },
      { text: 'Kofi Annan', correct: false },
      { text: 'Javier Pérez de Cuéllar', correct: false },
    ],
  },
  {
    question: 'What is the largest desert in the world by area?',
    options: [
      { text: 'Sahara Desert', correct: false },
      { text: 'Gobi Desert', correct: false },
      { text: 'Antarctica Desert', correct: true },
      { text: 'Arabian Desert', correct: false },
    ],
  },
  {
    question: 'Who wrote the famous novel "To Kill a Mockingbird"?',
    options: [
      { text: 'Harper Lee', correct: true },
      { text: 'J.D. Salinger', correct: false },
      { text: 'Mark Twain', correct: false },
      { text: 'F. Scott Fitzgerald', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for the element gold?',
    options: [
      { text: 'Go', correct: false },
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false },
      { text: 'Gd', correct: false },
    ],
  },
  {
    question: 'Who was the first woman to win a Nobel Prize?',
    options: [
      { text: 'Marie Curie', correct: true },
      { text: 'Mother Teresa', correct: false },
      { text: 'Rosalind Franklin', correct: false },
      { text: 'Dorothy Hodgkin', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the "Red Planet"?',
    options: [
      { text: 'Mars', correct: true },
      { text: 'Venus', correct: false },
      { text: 'Jupiter', correct: false },
      { text: 'Mercury', correct: false },
    ],
  },
  {
    question: 'What is the longest river in the world?',
    options: [
      { text: 'Amazon River', correct: false },
      { text: 'Nile River', correct: true },
      { text: 'Yangtze River', correct: false },
      { text: 'Mississippi River', correct: false },
    ],
  },
  {
    question: 'In which year did World War I begin?',
    options: [
      { text: '1914', correct: true },
      { text: '1916', correct: false },
      { text: '1918', correct: false },
      { text: '1912', correct: false },
    ],
  },
  {
    question: 'What is the smallest bone in the human body?',
    options: [
      { text: 'Stapes (in the ear)', correct: true },
      { text: 'Femur', correct: false },
      { text: 'Tibia', correct: false },
      { text: 'Radius', correct: false },
    ],
  },
  {
    question: 'Who painted the famous artwork "Starry Night"?',
    options: [
      { text: 'Vincent van Gogh', correct: true },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Leonardo da Vinci', correct: false },
      { text: 'Michelangelo', correct: false },
    ],
  },
];

// Making the variables

const totalTime = document.querySelector('.total-time');
const timerBox = document.querySelector('.timer-box');
const remainingTime = document.querySelector('.remaining-time');

const quizBoxParent = document.querySelector('.quiz-box-parent');
const quizBox = document.querySelector('.quiz-box');

const headButtons = document.querySelector('.head-buttons');
const submitButton = document.querySelector('.submit');
const quitButton = document.querySelector('.quit-quiz');

const startButton = document.querySelector('.start-quiz');

const prevNextContainer = document.querySelector('.prev-next-button');
const prevButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');

const playAgain = document.querySelector('.play-again');
const scoreBox = document.querySelector('.score');

// Timer

function timerFunction() {
  let answerTime = 150;
  const timerInterval = setInterval(function () {
    answerTime--;
    if (answerTime <= 5) {
      remainingTime.style.color = '#ff4433';
    }

    remainingTime.innerHTML = `${answerTime}`;

    if (answerTime === 0) {
      clearInterval(timerInterval);
      timerBox.style.display = 'none';
      scoreBox.innerHTML = `Your total score is ${score} out of ${questionArray.length}`;
      quizBox.style.display = 'none';
      headButtons.style.display = 'none';
      prevNextContainer.style.display = 'none';
      playAgain.style.display = 'block';
      submitFunction();
    }
  }, 1000);
}

// Giving initial values to index and score

let currentIndex = 0;
let score = 0;

// Button event listeners

startButton.addEventListener('click', function () {
  totalTime.style.display = 'none';
  timerBox.style.display = 'flex';
  startButton.style.display = 'none';
  submitButton.style.display = 'block';
  quitButton.style.display = 'block';
  quizBox.style.display = 'block';
  prevNextContainer.style.display = 'flex';
  showQuestion();
  timerFunction();
});

function submitFunction() {
  submitButton.addEventListener('click', function () {
    timerBox.style.display = 'none';
    scoreBox.innerHTML = `Your total score is ${score} out of ${questionArray.length}`;
    quizBox.style.display = 'none';
    headButtons.style.display = 'none';
    prevNextContainer.style.display = 'none';
    playAgain.style.display = 'block';
  });
}
submitFunction();

playAgain.addEventListener('click', function () {
  location.reload();
  timerFunction();
});

nextButton.addEventListener('click', function () {
  if (currentIndex === questionArray.length - 2) {
    currentIndex++;
    showQuestion();
    nextButton.setAttribute('disabled', '');
    return;
  }
  // prevButton.removeAttribute('disabled');
  currentIndex++;
  showQuestion();
});

// prevButton.addEventListener('click', function () {
//   if (currentIndex === 1) {
//     prevButton.setAttribute('disabled', '');
//     currentIndex--;
//     showQuestion();
//     return;
//   }
//   currentIndex--;
//   showQuestion();
//   const optionButtons = document.querySelectorAll('.select-option');
//   optionButtons.forEach((button) => {
//     button.disabled = true;
//   });
//   nextButton.removeAttribute('disabled');
// });

quitButton.addEventListener('click', function () {
  location.reload();
});

// Show questions

function showQuestion() {
  const { question, options } = questionArray[currentIndex];

  let optionsHTML = ''; // Initialize an empty string to store HTML for options

  options.forEach((option, index) => {
    optionsHTML += `<button class="select-option" data-correct="${
      option.correct
    }"> ${String.fromCharCode(65 + index)}. ${option.text}</button>`;
  });

  quizBox.innerHTML = `
    <div class="question-box">
      <h3>${currentIndex + 1}. ${question}?</h3>
    </div>
    <div class="option-box">
      ${optionsHTML}
    </div>
  `;

  // Add event listener to all option buttons
  const optionButtons = document.querySelectorAll('.select-option');
  optionButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const isCorrect = button.getAttribute('data-correct') === 'true';
      if (isCorrect) {
        e.target.style.backgroundColor = '#9aeabc';
        e.target.style.color = '#002765';
        score++;
      } else {
        e.target.style.backgroundColor = '#ff9393';
        e.target.style.color = '#002765';
      }

      optionButtons.forEach((btn) => {
        btn.disabled = true;
      });
    });
  });
}
