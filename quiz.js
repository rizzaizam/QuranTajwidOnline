const questions = [
    {
        question: "1. What does the word 'Tajwid' literally mean?",
        answers: [
            { text: "To memorize", correct: false },
            { text: "To improve or make better", correct: true },
            { text: "To read quickly", correct: false },
            { text: "To stop", correct: false }
        ]
    },
    {
        question: "2. What is the correct emission point (Makhraj) for the letter 'Ba' (ب)?",
        answers: [
            { text: "The throat", correct: false },
            { text: "The lips", correct: true },
            { text: "The tongue", correct: false },
            { text: "The nasal cavity", correct: false }
        ]
    },
    {
        question: "3. Which rule applies when Nun Sakinah or Tanwin is followed by the letter 'Ba' (ب)?",
        answers: [
            { text: "Iqlab (Changing)", correct: true },
            { text: "Idgham (Merging)", correct: false },
            { text: "Izhar (Clarity)", correct: false },
            { text: "Ikhfa (Hiding)", correct: false }
        ]
    },
    {
        question: "4. What is the duration of a natural elongation (Mad Asli)?",
        answers: [
            { text: "1 Harakat", correct: false },
            { text: "2 Harakat", correct: true },
            { text: "4 Harakat", correct: false },
            { text: "6 Harakat", correct: false }
        ]
    },
    {
        question: "5. Which of the following is a Qalqalah (echoing) letter?",
        answers: [
            { text: "Sin (س)", correct: false },
            { text: "Lam (ل)", correct: false },
            { text: "Qaf (ق)", correct: true },
            { text: "Nun (ن)", correct: false }
        ]
    },
    {
        question: "6. How many letters trigger the rule of Izhar Halqi (Clear pronunciation from the throat)?",
        answers: [
            { text: "4", correct: false },
            { text: "6", correct: true },
            { text: "15", correct: false },
            { text: "2", correct: false }
        ]
    },
    {
        question: "7. What happens when a Mim Sakinah is followed by another Mim (م)?",
        answers: [
            { text: "Izhar Syafawi", correct: false },
            { text: "Ikhfa Syafawi", correct: false },
            { text: "Idgham Syafawi", correct: true },
            { text: "Iqlab", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next Question";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-outline-success", "text-start", "fw-bold", "py-2");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.remove("btn-outline-success");
        selectedButton.classList.add("btn-success", "text-white");
        score++;
    } else {
        selectedButton.classList.remove("btn-outline-success");
        selectedButton.classList.add("btn-danger", "text-white");
    }

    // Reveal the correct answer if they guessed wrong, and disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.remove("btn-outline-success");
            button.classList.add("btn-success", "text-white");
        }
        button.disabled = true;
    });
    
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `Alhamdulillah! You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "block";
}

// FIXED: Single event listener that checks if the quiz is over or not
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    } else {
        startQuiz();
    }
});

// Initialize the quiz when the file loads
startQuiz();
