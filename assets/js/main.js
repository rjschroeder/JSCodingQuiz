let time = 60;
var gameTimer;

let descriptionElement = document.getElementById('desc');
let finishElement = document.getElementById('finish');
let quizElement = document.getElementById('quiz');
let startButton = document.getElementById('start');
let timerText = document.getElementById('timer');
let questionText = document.getElementById('question');
let answersText = document.getElementById('answers');
let finalScoreText = document.getElementById('finalScore');

function startQuiz() {
    descriptionElement.style.display = 'none';
    quizElement.style.display = 'flex';

    let questionIndex = questionList.length-1;

    timerText.textContent = "Time:" + time;
    gameTimer = setInterval(() => {
        time -= 1;
        timerText.textContent = "Time:" + time;
        if (time <=0 ) {
            endGame();
        }
    },1000);
    nextQuestion(questionIndex);
    
}

function nextQuestion(index){
    questionText.textContent = questionList[index].question;
    answersText.textContent = '';
    
    for(let i = 0; i<questionList[index].answers.length; i++){
        let answerContainer = document.createElement('button');
        answerContainer.setAttribute('class', 'answerButton')
        answerContainer.setAttribute('value', questionList[index].answers[i]);
        answerContainer.textContent = questionList[index].answers[i];
        answersText.appendChild(answerContainer);
    }
    document.querySelectorAll('.answerButton').forEach(btn => {
        btn.addEventListener("click", event => {
            if (btn.value == questionList[index].correct){
                //correct
                checkNext(index);
                console.log("correct");
            } else {
                console.log("incorrect");
                time -= 15;
                checkNext(index);
                //incorrect
            }
        })
    })
}

function checkNext(currentIndex) {
    if (currentIndex > 0) {
        nextQuestion(currentIndex - 1);
    } else {
        endGame();
    }
}

function endGame() {
    quizElement.style.display = 'none';
    finishElement.style.display = 'flex';
    clearInterval(gameTimer);
    finalScoreText.textContent = time;
}

function timer() {
    time -= 1;
    timerText.textContent = "Time:" + time;
    if (time <=0 ) {
        endGame();
    }
}

startButton.onclick = startQuiz;

