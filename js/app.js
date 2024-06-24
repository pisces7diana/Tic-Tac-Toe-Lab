/** Minimum requirements ------------------------------------------------------------
Display an empty tic-tac-toe board when the page is initially displayed.
A player can click on the nine cells to make a move.
Every click will alternate between marking an X and O.
Display whose turn it is (X or O).
The cell cannot be played again once occupied with an X or O.
Provide win logic and display a winning message.
Provide logic for a cat’s game (tie), also displaying a message.
Provide a Reset Game button that will clear the contents of the board. */


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

/*---------------------------- Variables (state) ----------------------------*/
const board = [
    '', '', '',
    '', '', '',
    '', '', '',
]
let turn = 'X'
let winner = false
let tie = false


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
console.log(squareEls)
const messageEl = document.querySelector('#message')
console.log(messageEl)


/*-------------------------------- Functions --------------------------------*/
function init() {


  console.log('Initialization started')
  render()

}

init()

function render() {

    updateBoard(board)
    updateMessage()

}

function updateBoard (board) {
    squareEls.forEach( (square, index) => {
        board[index] = square.textContent // turn
    
    })
}

function updateMessage () {

    if(!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn`
    } else if (!winner && tie) {
        messageEl.textContent =  "It's a tie"
    } else {
        messageEl.textContent = ` ${turn} won!`
    }
}

function handleClick (event) {

    const squareIndex = event.target.id// event.target is the div

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner ) {
        return
    }

    placePiece(squareIndex)

    event.target.innerText = turn

    checkForWinner()
    checkForTie ()

    updateMessage()

    switchPlayerTurn()

}

function placePiece (index) {
    board[index] = turn
    console.log(board)

}

function checkForWinner () {
    // winningCombos.forEach(combo => {
    //     const [a,b,c] = combo

        // const winningCombos = [
        //     [0, 1, 2],
        //     [3, 4 ,5],
        //     [6, 7, 8],
        //     [0, 3, 6],
        //     [1, 4, 7],
        //     [2, 5, 8],
        //     [0, 4, 8],
        //     [2, 4, 6]
        
        // ]

    for (let combo of winningCombos) {

        let [idx1, idx2, idx3] = combo;
        let value1 = board[idx1];
        let value2 = board[idx2];
        let value3 = board[idx3];
    


        if(value1 !== '' && value1 === value2 && value2 === value3) {
            winner = true
        }

    console.log(winner)

    }
}

function checkForTie () {
    const winner = checkForWinner()
    if (winner) {
        return
    }

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            tie = false;
            return
        }
    }

    tie = true
    console.log(tie)

}


function switchPlayerTurn () {
    if (winner) {
        return
    }
    
    if (!winner) {
        if (turn === 'X') {
            turn = 'O'
        } else if (turn === 'O') { 
            turn = 'X'
        }
       
    console.log(turn)

    updateMessage()

    }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(sqr => {
    sqr.addEventListener('click', handleClick)
})
