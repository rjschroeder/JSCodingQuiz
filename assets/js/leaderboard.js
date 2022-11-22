let clearLeaderboardButton = document.getElementById('clearScoresButton');
let leaderboardListElement = document.getElementById('leaderboardList');

function displayLeaderboard() {
    let leaderboard = JSON.parse(window.localStorage.getItem('leaderboardData'))

    if(leaderboard){
        leaderboard.sort(function(a, b) {
            return b.score - a.score;
        });
        for (let i = 0; i < leaderboard.length; i++) {
            let scoreItem = document.createElement('li');
            scoreItem.textContent = leaderboard[i].name + ">   " + leaderboard[i].score;
            leaderboardListElement.appendChild(scoreItem);
        }
    }
}

function clearLeaderboard() {
    window.localStorage.setItem('leaderboardData', JSON.stringify([]))
    window.location.reload();
}

clearLeaderboardButton.onclick = clearLeaderboard;

displayLeaderboard();