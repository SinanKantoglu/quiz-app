let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer= document.getElementById("display-container");
let scoreContainer= document.querySelector(".score-container");
let restart= document.getElementById("restart");
let userScore= document.getElementById("user-score");
let startScreen= document.querySelector(".start-screen");
let startButton= document.getElementById("start-button");
let questionCount;
let scoreCount= 0;
let count = 11;
let countdown;


const quizArray = [
    {
        id: "0",
        question: "Sunt aut facere repellat provident occaecati excepturi optio reprehenderit?",
        options: ["Facere", "Provident", "Occaecati", "Excepturi"],
        correct: "Excepturi",
    },
    {
        id: "1",
        question: "Est rerum tempore vitaensequi sint nihil reprehenderit dolor beatae ea?",
        options: ["Tempore", "Sint", "Nihil", "Reprehenderit"],
        correct: "Tempore",
    },
    {
        id: "2",
        question: "Molestias quasi exercitationem repellat qui ipsa sit aut?",
        options: ["Exercitationem", "Quasi", "Ipsa", "Molestias"],
        correct: "Molestias",
    },
    {
        id: "3",
        question: "Ullam et saepe reiciendis voluptatem adipiscinsit amet autem?",
        options: ["Autem", "Reiciendis", "Adipiscinsit", "Saepe"],
        correct: "Adipiscinsit",
    },
    {
        id: "4",
        question: "Repudiandae veniam quaerat sunt sednalias aut fugiat sit autem?",
        options: ["Quaerat", "Repudiandae", "Sednalias", "Fugiat"],
        correct: "Sednalias",
    },
    {
        id: "5",
        question: "Ut aspernatur corporis harum nihil quis provident sequinmollitia nobis?",
        options: ["Aspernatur", "Nobis", "Provident", "Quis"],
        correct: "Aliquid",
    },
    {
        id: "6",
        question: "Dolore placeat quibusdam ea quo vitaenmagni quis enim qui quis quo?;",
        options: ["Enim", "Quibusdam", "Vitaenmagni", "Placeat"],
        correct: "Placeat",
    },
    {
        id: "7",
        question: "Dignissimos aperiam dolorem qui eumnfacilis quibusdam animi sint?",
        options: ["Eumnfacilis", "Qui", "Possimus", "Dignissimos"],
        correct: "Possimus",
    },
    {
        id: "8",
        question: "Nesciunt iure omnis dolorem tempora et accusantium?",
        options: ["Accusantium", "Iure", "Tempora", "Nesciunt"],
        correct: "Nesciunt",
    },
    {
        id: "9",
        question: "Quo et expedita modi cum officia vel magnindoloribus qui repudianda?",
        options: ["Expedita", "Officia", "Magnindoloribus", "Repudianda"],
        correct: "Repudianda",
    }
];

restart.addEventListener("click", () =>  {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
    questionCount +=1;

    if (questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Your Score is " + scoreCount + " out of " + questionCount;
    }
    else {
        countOfQuestion.innerHTML = questionCount + 1 + " of " + quizArray.length + " Question";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();

        selectionEnabled = false;
        setTimeout(() => {
            selectionEnabled = true;
        }, 10000);
    }
});

const timerDisplay = () => {
    let count = 30;
    timeLeft.innerHTML = `${count}s`;

    countdown = setInterval(() => {
        if (count > 0) {
            count--;
            timeLeft.innerHTML = `${count}s`;
        } else {
            clearInterval(countdown);
            if (questionCount < quizArray.length - 1) {
                nextBtn.click();
            } else {
                displayContainer.classList.add("hide");
                scoreContainer.classList.remove("hide");
                userScore.innerHTML = "Your Score is " + scoreCount + " out of " + quizArray.length;
            }
        }
    }, 1000);
};


const quizDisplay = (questionCount) =>{
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreater(){
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray){
        i.options.sort(()=> Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + "Question";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onClick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onClick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onClick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onClick="checker(this)">${i.options[3]}</button>
        `;

        quizContainer.appendChild(div);
    }
}

let selectionEnabled = false;

const enableSelection = () => {
    setTimeout(() => {
        selectionEnabled = true;
    }, 11000);
};

function checker(userOption) {
    if (!selectionEnabled) {
        return;
    }

    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

enableSelection();

function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
}