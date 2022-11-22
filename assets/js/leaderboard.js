//Defining all of the html elements for leaderboard.html
let clearLeaderboardButton = document.getElementById('clearScoresButton');
let leaderboardListElement = document.getElementById('leaderboardList');

function displayLeaderboard() {
    let leaderboard = JSON.parse(window.localStorage.getItem('leaderboardData'))
    //checks if leaderboard is not null, if it is, leaderboard will be empty
    if(leaderboard){
        //if there it is not null, sort the high scores
        leaderboard.sort(function(a, b) {
            return b.score - a.score;
        });

        //display all of the scores in the ordered list
        for (let i = 0; i < leaderboard.length; i++) {
            let scoreItem = document.createElement('li');
            scoreItem.textContent = leaderboard[i].name + ">   " + leaderboard[i].score;
            leaderboardListElement.appendChild(scoreItem);
        }
    }
}

//sets the local storage item to an empty array to clear it
function clearLeaderboard() {
    window.localStorage.setItem('leaderboardData', JSON.stringify([]))
    window.location.reload();
}

clearLeaderboardButton.onclick = clearLeaderboard;

displayLeaderboard();