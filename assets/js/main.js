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

    timerText.textContent = "Time:" + time;
    timer();
    
}

function timer() {setInterval(function() {
    time -= 1;
    timerText.textContent = "Time:" + time;
}, 1000)}

startButton.onclick = startQuiz;