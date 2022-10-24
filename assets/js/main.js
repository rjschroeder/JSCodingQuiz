let time = 60;

let descriptionElement = document.getElementById('desc');
let finishElement = document.getElementById('finish');
let startButton = document.getElementById('start');
let timerText = document.getElementById('timer');
let questionText = document.getElementById('question');
let answersText = document.getElementById('answers');

function startQuiz() {
    descriptionElement.style.display = 'none';
    finishElement.style.display = 'none';

    let questionIndex = questionList.length-1;

    timerText.textContent = "Time:" + time;
    timer();
    nextQuestion(questionIndex);
    
}

function nextQuestion(index){
    questionText.textContent = questionList[index].question;
    
    for(let i = 0; i<questionList[index].answers.length; i++){
        let answerContainer = document.createElement('button');
        answerContainer.setAttribute('class', 'answerButton')
        //answerContainer.setAttribute('value', questionList[index].answers[i]);
        answerContainer.textContent = questionList[index].answers[i];
        answersText.appendChild(answerContainer);
    }
}

function timer() {setInterval(function() {
    time -= 1;
    timerText.textContent = "Time:" + time;
}, 1000)}

startButton.onclick = startQuiz;