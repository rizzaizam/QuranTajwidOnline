const questions = [
    {
        question: "What is the correct emission point (Makhraj) for the letter 'Ba' (ب)?",
        answers: [
            { text: "The throat", correct: false },
            { text: "The lips", correct: true },
            { text: "The tongue", correct: false },
            { text: "The nasal cavity", correct: false }
        ]
    },
    {
        question: "Which of these is a rule of Nun Sakinah?",
        answers: [
            { text: "Qalqalah", correct: false },
            { text: "Idgham", correct: true },
            { text: "Mad", correct: false },
            { text: "Waqaf", correct: false }
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
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-outline-primary");
        button.addEventListener("click", () => selectAnswer(button, answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(button, answer) {
    if (answer.correct) {
        button.classList.add("btn-success");
        score++;
    } else {
        button.classList.add("btn-danger");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.innerText = `Quiz Finished! Your score: ${score} / ${questions.length}`;
        nextButton.innerText = "Restart";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", startQuiz);
    }
});

startQuiz();
