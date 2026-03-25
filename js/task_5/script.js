const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
        explanation: "JavaScript is the primary scripting language for web browsers."
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
        explanation: "Cascading Style Sheets (CSS) is used for styling HTML elements."
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correct: "a",
        explanation: "HTML is the standard markup language for creating web pages."
    }
];

const questionElement = document.getElementById('question')
const optionsElement = document.getElementById('options')
const feedBackElement = document.getElementById('feedback');
const nextBtn = document.getElementById('nextButton');

let currQ = 0;
let score = 0;
let feedBackList = [];

function selectOption(selectedOption, selectedButton) {
    const correct = quizData[currQ]['correct'];
    let status = "wrong";
    if (selectedOption === correct) {
        score++;
        status = "correct";
    }
    feedBackList.push({ "question": quizData[currQ]["question"], "status": status, "explanation": quizData[currQ]["explanation"] });
    currQ++;
    if (currQ < quizData.length) nextQuestion();
    else showResult();
}

function nextQuestion() {
    optionsElement.innerHTML = '';
    questionElement.innerText = quizData[currQ]['question'];
    ['a', 'b', 'c', 'd'].forEach(letter => {
        const btn = document.createElement('button');
        btn.style.height = '20px';
        btn.style.width = '20px';

        const optionText = document.createElement('p');
        btn.innerText = letter;
        optionText.innerText = quizData[currQ][letter]
        btn.onclick = () => selectOption(letter, btn);
        const singleOptionEle = document.createElement('div');
        singleOptionEle.style.display = 'flex';
        singleOptionEle.style.gap = '10px';
        singleOptionEle.style.alignItems = 'center';

        singleOptionEle.style.margin = '10px';

        singleOptionEle.appendChild(btn);
        singleOptionEle.appendChild(optionText);
        optionsElement.appendChild(singleOptionEle);
    });
}

function showResult() {
    questionElement.classList.add('hidden');
    optionsElement.classList.add('hidden');
    if (nextBtn) nextBtn.classList.add("hidden");

    feedBackElement.innerHTML = `<h2>Quiz Completed!</h2>`;
    feedBackElement.innerHTML += `<p>Your final score: <strong>${score}/${quizData.length}</strong></p>`;

    feedBackList.forEach((item, index) => {
        const feedbackItem = document.createElement('div');
        feedbackItem.style.marginBottom = '20px';
        feedbackItem.style.textAlign = 'left';


        feedbackItem.innerHTML = `
            <p><strong>Q${index + 1}: ${item.question}</strong></p>
            <p>Result: ${item.status}</p>
            <p>Note: ${item.explanation}</p>
        `;

        feedBackElement.appendChild(feedbackItem);
    });
}
function startQuiz() {
    currQ = 0;
    nextQuestion();
}
startQuiz();