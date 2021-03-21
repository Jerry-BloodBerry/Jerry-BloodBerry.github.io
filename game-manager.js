var currentPlayer = 0;
var gameMode = 0;

window.onload = function() {
    document.getElementById("current-player-symbol").textContent = "X's"
}

function makeMove(e) {
    var targetField;
    if (!e) var e = window.event;
    if (e.target) {
        targetField = e.target;
    } else if (e.srcElement) {
        targetField = e.srcElement;
    }
    if (targetField.nodeType == 3) {
        targetField = targetField.parentNode;
    }
    if (!targetField.dataset.taken) {
        setCurrentPlayerSymbol(targetField);
        targetField.dataset.taken = currentPlayer;
        if (checkForWinner()) {
            alertTheWinner();
            blockGrid();
        } else if (checkForDraw()) {
            alert("DRAW!");
        } else {
            if (gameMode == 0) {
                changePlayer();
                updatePlayerLabel();
            } else {
                changePlayer()
                makeAiMove();
                if (checkForWinner()) {
                    alertTheWinner();
                    blockGrid();
                } else if (checkForDraw()) {
                    alert("DRAW!");
                } else {
                    changePlayer();
                    updatePlayerLabel();
                }
            }
        }
    } else {
        console.log('Zajete pole!');
        return false;
    }
}

function changePlayer()
{
    if (currentPlayer == 0) {
        currentPlayer = 1;
    } else {
        currentPlayer = 0;
    }
}

function setCurrentPlayerSymbol(targetField) {
    if (currentPlayer == 0) {
        targetField.classList.add("cross"); 
    } else {
        targetField.classList.add("circle");
    }
}

function updatePlayerLabel() {
    if (currentPlayer == 0) {
        document.getElementById("current-player-symbol").textContent = "X's"
    } else {
        document.getElementById("current-player-symbol").textContent = "O's"
    }
}

function checkForWinner() {
    let gameGrid = document.getElementById("game-grid");
    let gameFields = gameGrid.children;
    for (let i = 0; i < 7; i+=3) {
        if (gameFields[i].dataset.taken &&
            gameFields[i+1].dataset.taken &&
            gameFields[i+2].dataset.taken &&
            gameFields[i].dataset.taken == gameFields[i+1].dataset.taken &&
            gameFields[i+1].dataset.taken == gameFields[i+2].dataset.taken) return true;
    }
    for (let i = 0; i < 3; ++i) {
        if (gameFields[i].dataset.taken &&
            gameFields[i+3].dataset.taken &&
            gameFields[i+6].dataset.taken &&
            gameFields[i].dataset.taken == gameFields[i+3].dataset.taken &&
            gameFields[i+3].dataset.taken == gameFields[i+6].dataset.taken) return true;
    }
    if (gameFields[0].dataset.taken &&
        gameFields[4].dataset.taken &&
        gameFields[8].dataset.taken &&
        gameFields[0].dataset.taken == gameFields[4].dataset.taken &&
        gameFields[4].dataset.taken == gameFields[8].dataset.taken) return true;
    if (gameFields[2].dataset.taken &&
        gameFields[4].dataset.taken &&
        gameFields[6].dataset.taken &&
        gameFields[2].dataset.taken == gameFields[4].dataset.taken &&
        gameFields[4].dataset.taken == gameFields[6].dataset.taken) return true;
    return false;
}

function checkForDraw() {
    let gameGrid = document.getElementById("game-grid");
    let gameFields = gameGrid.children;
    for (let i = 0; i < 9; ++i) {
        if (!gameFields[i].dataset.taken) return false;
    }
    return true;
}

function prepareNewGameMode() {
    changeGameMode();
    updateGameModeLabel();
    resetGame();
}

function resetGame() {
    let gameGrid = document.getElementById("game-grid");
    let gameFields = gameGrid.children;

    for (let i = 0; i<9; ++i) {
        gameFields[i].dataset.taken = "";
        gameFields[i].classList.remove('circle');
        gameFields[i].classList.remove('cross');
    }
    currentPlayer = 0;
    updatePlayerLabel();
}

function changeGameMode()
{
    if (gameMode == 0) {
        gameMode = 1;
    } else {
        gameMode = 0;
    }
}

function updateGameModeLabel()
{
    let label = document.getElementById("current-game-mode");
    if (gameMode == 0) {
        label.textContent = "Two players";
    } else {
        label.textContent = "Player vs AI";
    }
}

function makeAiMove()
{
    let gameGrid = document.getElementById("game-grid");
    let gameFields = gameGrid.children;
    let freeFields = [];

    for (let i = 0; i < 9; ++i) {
        if (!gameFields[i].dataset.taken) {
            freeFields.push(gameFields[i]);
        }
    }

    let randomIndex = getRandomInt(freeFields.length);
    setCurrentPlayerSymbol(freeFields[randomIndex]);
    freeFields[randomIndex].dataset.taken = currentPlayer;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function alertTheWinner() {
    if (currentPlayer == 0) {
        alert ("The winner is X");
    } else {
        alert ("The winner is O");
    }

}

function blockGrid() {
    let gameGrid = document.getElementById("game-grid");
    let gameFields = gameGrid.children;

    for (let i = 0; i < 9; ++i) {
        gameFields[i].dataset.taken = "2";
    }
}