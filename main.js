// Making the variables

const mainContainer = document.querySelector('.main-container');

const totalTime = document.querySelector('.total-time');
const timerBox = document.querySelector('.timer-box');
const remainingTime = document.querySelector('.remaining-time');

const quizBoxParent = document.querySelector('.quiz-box-parent');
const quizBox = document.querySelector('.quiz-box');

const headFeatures = document.querySelector('.head-features');
const headButtons = document.querySelector('.head-buttons');
const infoIcon = document.querySelector('.info-icon');
const submitButton = document.querySelector('.submit');
const quitButton = document.querySelector('.quit-quiz');

const startButton = document.querySelector('.start-quiz');

const prevNextContainer = document.querySelector('.prev-next-button');
const prevButton = document.querySelector('.previous-button');
const nextButton = document.querySelector('.next-button');

const playAgain = document.querySelector('.play-again');
const scoreBox = document.querySelector('.score');

const informationPage = document.querySelector('.information-page');
const infoClose = document.querySelector('.info-close');

// Timer

function timerFunction() {
  let answerTime = 150;
  const timerInterval = setInterval(function () {
    answerTime--;
    if (answerTime <= 15) {
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

// Info icon

infoIcon.addEventListener('click', function () {
  informationPage.style.display = 'block';
});

// Info close

infoClose.addEventListener('click', function () {
  informationPage.style.display = 'none';
});

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
      <h3>${currentIndex + 1}. ${question}</h3>
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
        e.target.style.color = '#0398C9';
        score++;
      } else {
        e.target.style.backgroundColor = '#ff9393';
        e.target.style.color = '#0398C9';
      }

      optionButtons.forEach((btn) => {
        btn.disabled = true;
      });
    });
  });
}

// This is questions
const questionArray = [
  {
    question: 'Who is the current Secretary-General of the United Nations?',
    options: [
      { text: 'Ban Ki-moon', correct: false },
      { text: 'Javier Pérez de Cuéllar', correct: false },
      { text: 'António Guterres', correct: true },
      { text: 'Kofi Annan', correct: false },
    ],
  },
  {
    question: 'What is the largest desert in the world by area?',
    options: [
      { text: 'Sahara Desert', correct: false },
      { text: 'Arabian Desert', correct: false },
      { text: 'Antarctica Desert', correct: true },
      { text: 'Gobi Desert', correct: false },
    ],
  },
  {
    question: 'Who wrote the famous novel "To Kill a Mockingbird"?',
    options: [
      { text: 'Mark Twain', correct: false },
      { text: 'Harper Lee', correct: true },
      { text: 'F. Scott Fitzgerald', correct: false },
      { text: 'J.D. Salinger', correct: false },
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
  {
    question: 'What is the capital of Australia?',
    options: [
      { text: 'Sydney', correct: false },
      { text: 'Melbourne', correct: false },
      { text: 'Canberra', correct: true },
      { text: 'Perth', correct: false },
    ],
  },
  {
    question: 'Who wrote the novel "1984"?',
    options: [
      { text: 'George Orwell', correct: true },
      { text: 'Aldous Huxley', correct: false },
      { text: 'F. Scott Fitzgerald', correct: false },
      { text: 'Ray Bradbury', correct: false },
    ],
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: [
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Michelangelo', correct: false },
    ],
  },
  {
    question: 'What is the capital of South Korea?',
    options: [
      { text: 'Seoul', correct: true },
      { text: 'Tokyo', correct: false },
      { text: 'Pyongyang', correct: false },
      { text: 'Beijing', correct: false },
    ],
  },
  {
    question: 'Who is the author of "The Great Gatsby"?',
    options: [
      { text: 'F. Scott Fitzgerald', correct: true },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'Harper Lee', correct: false },
      { text: 'William Faulkner', correct: false },
    ],
  },
  {
    question: 'Which country is the largest by land area?',
    options: [
      { text: 'Russia', correct: true },
      { text: 'Canada', correct: false },
      { text: 'China', correct: false },
      { text: 'United States', correct: false },
    ],
  },
  {
    question: 'Who discovered penicillin?',
    options: [
      { text: 'Alexander Fleming', correct: true },
      { text: 'Marie Curie', correct: false },
      { text: 'Albert Einstein', correct: false },
      { text: 'Isaac Newton', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for water?',
    options: [
      { text: 'H2O', correct: true },
      { text: 'CO2', correct: false },
      { text: 'O2', correct: false },
      { text: 'NaCl', correct: false },
    ],
  },
  {
    question: 'Who is known as the "Father of Geometry"?',
    options: [
      { text: 'Pythagoras', correct: false },
      { text: 'Archimedes', correct: false },
      { text: 'Euclid', correct: true },
      { text: 'Aristotle', correct: false },
    ],
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
    ],
  },
  {
    question: 'Who discovered gravity?',
    options: [
      { text: 'Albert Einstein', correct: false },
      { text: 'Galileo Galilei', correct: false },
      { text: 'Nikola Tesla', correct: false },
      { text: 'Isaac Newton', correct: true },
    ],
  },
  {
    question: "Which gas makes up the majority of Earth's atmosphere?",
    options: [
      { text: 'Oxygen', correct: false },
      { text: 'Carbon dioxide', correct: false },
      { text: 'Argon', correct: false },
      { text: 'Nitrogen', correct: true },
    ],
  },
  {
    question: 'Who was the first person to walk on the moon?',
    options: [
      { text: 'Buzz Aldrin', correct: false },
      { text: 'Yuri Gagarin', correct: false },
      { text: 'Neil Armstrong', correct: true },
      { text: 'Alan Shepard', correct: false },
    ],
  },
  {
    question: 'What is the tallest mountain in the world?',
    options: [
      { text: 'K2', correct: false },
      { text: 'Mount Everest', correct: true },
      { text: 'Kangchenjunga', correct: false },
      { text: 'Lhotse', correct: false },
    ],
  },
  {
    question: 'Who was the first female Prime Minister of the United Kingdom?',
    options: [
      { text: 'Theresa May', correct: false },
      { text: 'Angela Merkel', correct: false },
      { text: 'Margaret Thatcher', correct: true },
      { text: 'Indira Gandhi', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for silver?',
    options: [
      { text: 'Au', correct: false },
      { text: 'Ag', correct: true },
      { text: 'Pt', correct: false },
      { text: 'Cu', correct: false },
    ],
  },
  {
    question: 'Who is the author of "The Catcher in the Rye"?',
    options: [
      { text: 'J.D. Salinger', correct: true },
      { text: 'F. Scott Fitzgerald', correct: false },
      { text: 'Ernest Hemingway', correct: false },
      { text: 'Harper Lee', correct: false },
    ],
  },
  {
    question: 'What is the longest river in Africa?',
    options: [
      { text: 'Congo', correct: false },
      { text: 'Niger', correct: false },
      { text: 'Zambezi', correct: false },
      { text: 'Nile', correct: true },
    ],
  },
  {
    question: 'Which is the fastest land animal in the world?',
    options: [
      { text: 'Ostrich', correct: false },
      { text: 'Lion', correct: false },
      { text: 'Giraff', correct: false },
      { text: 'Cheetah', correct: true },
    ],
  },
  {
    question: 'What is the capital of Russia?',
    options: [
      { text: 'Munich', correct: false },
      { text: 'Moscow', correct: true },
      { text: 'London', correct: false },
      { text: 'Washington DC', correct: false },
    ],
  },
];
