const grid = document.querySelector("main");

const state = {
    playerTurn: 1,
    oToken: 'fa-regular fa-circle fa-xl', //Player 1 Token
    xToken: 'fa-solid fa-xmark fa-2xl', //Player 2 Token
    board: []
}

//Checks for player click on cell. Fills with appropriate tile. Evaluates win condition.
grid.addEventListener("mousedown", (e) => {
    if(e.target.querySelector("i") === null && e.target.classList.contains("cell")) {
        placeToken(e.target);
    }
});

// grid.addEventListener("mouseover", (e) => {
//     if(e.target.querySelector("i") === null && e.target.classList.contains("cell")) {
//         displayToken(e.target);
//     }
// });

// grid.addEventListener("mouseout", (e) => {
//     if(e.target.classList.contains("cell")) {
//         hideToken(e.target);
//     }
// });

//Permanently adds token to a cell and advances player turn.
function placeToken(cell) {
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

    evaluateBoard(state.board);
    cell.appendChild(symbol);
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

    state.grid = [];
}

//Analyzes the game board to determine if win coniditons have been met.
function evaluateBoard() {

    //Do not evaluate unless state.board.length >= 5, as that is the minimum amount of tokens that needs to be placed before a winner can be determined.
    // if(state.board.length >= 5) {

    // }

    const winConditions = [
    //ROWS
        [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    // //COLUMNS
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    // //DIAGONAL
    //     [0,4,8],
    //     [2,4,6]
    ]

//
//If set has been evaluated to false, remove it from winConditions.

    for (let set in winConditions) {
        let result = false;
        // console.log(winConditions[set]);

        for (let cell in winConditions[set]) {
            console.log(winConditions[set][cell]);
            if (state.board[winConditions[set][cell]] != null) {
                // console.log("Cell:" + winConditions[set][cell]);
                // console.log(state.board[winConditions[set][cell]]);
            }
        }
    }
}

function displayWinner() {
    if (state.playerTurn === 1){
        console.log("O wins!");
    } else {
        console.log("X wins!");
    }
}