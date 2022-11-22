let time = 60;
var gameTimer;

//Defining all of the html elements for index.html
let descriptionElement = document.getElementById('desc');
let finishElement = document.getElementById('finish');
let quizElement = document.getElementById('quiz');
let startButton = document.getElementById('start');
let timerText = document.getElementById('timer');
let questionText = document.getElementById('question');
let answersText = document.getElementById('answers');
let finalScoreText = document.getElementById('finalScore');
let leaderboardName = document.getElementById('name');
let leaderboardNameButton = document.getElementById('submitName');

function startQuiz() {
    //Hides quiz description element and unhides the actual quiz
    descriptionElement.style.display = 'none';
    quizElement.style.display = 'flex';

    //Decided to work through the question list backwards
    //was intending to incorporate a countdown or something
    //to add intensity
    let questionIndex = questionList.length-1;

    //sets up the timer and timer function
    timerText.textContent = "Time:" + time;
    gameTimer = setInterval(() => {
        time -= 1;
        timerText.textContent = "Time:" + time;
        if (time <=0 ) {
            endGame();
        }
    },1000);
    //displays first question
    nextQuestion(questionIndex);
    
}

//function to display questions
function nextQuestion(index){
    //displays first question and makes sure answers are cleared
    questionText.textContent = questionList[index].question;
    answersText.textContent = '';
    
    //loops through answers at the question index and displays answer choices
    for(let i = 0; i<questionList[index].answers.length; i++){
        let answerContainer = document.createElement('button');
        answerContainer.setAttribute('class', 'answerButton')
        answerContainer.setAttribute('value', questionList[index].answers[i]);
        answerContainer.textContent = questionList[index].answers[i];
        answersText.appendChild(answerContainer);
    }

    //nice little function that loops through each answer choice, adds 
    //an event listener to each button, and checks if the value of the button (answer choice)
    //is equal to the correct answer of the question, if not, subtracts time
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
//checks if there is another question, if not, ends game
function checkNext(currentIndex) {
    if (currentIndex > 0) {
        nextQuestion(currentIndex - 1);
    } else {
        endGame();
    }
}

//function to end the game
function endGame() {
    //hides the quiz element and displays the finish element
    quizElement.style.display = 'none';
    finishElement.style.display = 'flex';

    //stops the game timer and sets the time remaining as the final score
    clearInterval(gameTimer);
    timerText.textContent = "Time:" + time;
    finalScoreText.textContent = time;
}

function leaderboardSubmit() {
    //stores entered name for the user and removes white spaces at end
    let enteredName = leaderboardName.value.trim();
    //if something was entered
    if (enteredName != "") {
        //stores score and name in an object
        let score = {
            score: time,
            name: enteredName,
        };
        let loadLeaderboard = JSON.parse(window.localStorage.getItem('leaderboardData'));
        //checks if leaderboard in localstorage is not null
        if (loadLeaderboard) {
            //if not null, there must be some storage already, so add score to it
            let currentLeaderboard = loadLeaderboard;
            currentLeaderboard.push(score);
            window.localStorage.setItem('leaderboardData', JSON.stringify(currentLeaderboard));
        } else {
            //if null, there must be no scores, so create a new local storage object with this new score
            let toAdd = [score];
            window.localStorage.setItem('leaderboardData', JSON.stringify(toAdd));
        }
        //redirects to leaderboard after name is entered
        window.location.href = 'leaderboard.html';
    }
}

startButton.onclick = startQuiz;
leaderboardNameButton.onclick = leaderboardSubmit;

