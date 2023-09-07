const grid = document.querySelector("main");

//Global game state variables stored in an object literal.
const state = {
    gameOver: false,
    tie: false,
    playerTurn: 1,
    oToken: 'fa-regular fa-circle fa-xl', //Player 1 Token
    xToken: 'fa-solid fa-xmark fa-2xl', //Player 2 Token
    board: [],
    winConditions: [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal from top-left to bottom-right
        [2, 4, 6]  // Diagonal from top-right to bottom-left
      ]
}

//Checks for player click on cell. Fills with appropriate tile. Evaluates win condition.
grid.addEventListener("mousedown", (e) => {
    if(e.target.querySelector("i") === null && e.target.classList.contains("cell")) {
        placeToken(e.target);
    }
});

//Permanently adds token to a cell and advances player turn.
function placeToken(cell) {
    if (state.gameOver === false) {
        const symbol = document.createElement("i");

        if (state.playerTurn === 1) {
            symbol.setAttribute("class", state.oToken);
            state.board[cell.id] = 'o'
            state.playerTurn = 2;
        } else {
            symbol.setAttribute("class", state.xToken);
            state.board[cell.id] = 'x'
            state.playerTurn = 1;
        }

        evaluateBoard();
        cell.appendChild(symbol);
    }
}

//Displays token while hovering over a cell.
function displayToken(cell) {
    const symbol = document.createElement("i");

    if (state.playerTurn === 1) {
        symbol.setAttribute("class", state.oToken);
    } else {
        symbol.setAttribute("class", state.xToken);
    }

    cell.appendChild(symbol);
}

//Hides token when moving out of a cell.
function hideToken(cell) {
    cell.firstElementChild.remove();
}

//Resets the game board, clearing all tokens.
function resetBoard() {
    for (let cell in grid.children) {
        currentCell = grid.children[cell];

        if(currentCell.childElementCount > 0) {
            currentCell.firstElementChild.remove();
        }
    }

    document.getElementById("reset").remove(); //Remove the reset button.
    document.getElementById("banner").remove(); //Remove the reset button.

    //Reset the game state.
    state.board = [];
    state.tie = false;
    state.gameOver = false;
}

//Analyzes the game board to determine if win coniditons have been met.
function evaluateBoard() {
    if(state.board.reduce((acc, value) => acc += value).length >= 5) { //Do not evaluate unless at least 5 tokens have been placed, as that is the minimum needed for a win.
        for (const condition of state.winConditions) {
          let match = true;
          
          for (const index of condition) {
            const value = state.board[index];
            
            if (value === undefined) { // If any value is undefined, stop evaluating the condition
              match = false;
              break;
            }
            
            if (value !== state.board[condition[0]]) { // If any value doesn't match the first value in the condition, stop evaluating the condition
              match = false;
              break;
            }
          }
          
          if (match) { // If all values in this condition matched.
            state.gameOver = true;
            displayResult();
            return;
          }
        }

        if(state.board.reduce((acc, value) => acc += value).length === 9) { //If the game board is full and no winConditions have been met, produce a tie.
            state.tie = true;
            displayResult();
        }

        return false; // None of the win conditions were met.
    }
}

//Create a message displaying the result of the game and a reset button to play again.
function displayResult() {
    let banner = document.createElement("h1");
    banner.setAttribute("id", "banner");

    if(state.tie) {
        banner.innerText = "Tie!"
        console.log("Tie!");
    } else {
        if (state.playerTurn === 2){
            banner.innerText = "O wins!"
            console.log("O Wins!");
        } else {
            banner.innerText = "X wins!"
            console.log("X Wins!");
        }
    }

    document.querySelector("body").appendChild(banner);

    //Render the reset button.
    let btn = document.createElement("button");
    btn.innerText = "Play Again?";
    btn.setAttribute("onclick", "resetBoard()");
    btn.setAttribute("id", "reset");
    document.querySelector("body").appendChild(btn);
}