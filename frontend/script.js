import * as moveValidator from "./validMoves.js";

const board = document.getElementById("board")
const turnText = document.getElementById("turn")


let selected = null
let turn = "white"
let moves = [];
const pieces = {
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    p: "♟",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
    P: "♙"
}

let state = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
]

function drawBoard() {
    board.innerHTML = ""

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {

            let sq = document.createElement("div")
            sq.classList.add("square")

            if ((r + c) % 2 == 0) sq.classList.add("white")
            else sq.classList.add("black")

            sq.dataset.row = r
            sq.dataset.col = c

            let piece = state[r][c]

            if (piece != "") sq.textContent = pieces[piece]

            sq.addEventListener("click", clickSquare)

            board.appendChild(sq)

        }
    }
}

function clickSquare(e) {

    let r = parseInt(e.target.dataset.row)
    let c = parseInt(e.target.dataset.col)

    if (selected == null) {

        let piece = state[r][c]

        if (piece == "") return

        if (turn == "white" && piece !== piece.toUpperCase()) return
        if (turn == "black" && piece !== piece.toLowerCase()) return

        selected = { r, c }
        if(piece=="p"||piece=="P") moves = moveValidator.pawnMove(r,c);
        if(piece=="R"||piece=="r") moves = moveValidator.rookMove(r,c);
        
        console.log(moves);
        e.target.classList.add("selected")

    } else {

        if(moves.find(e => e[0] == r && e[1] == c)) {            
            let from = selected
            let piece = state[from.r][from.c]
            
            state[from.r][from.c] = ""
            state[r][c] = piece
            
            selected = null
            
            turn = turn === "white" ? "black" : "white"
            
            turnText.innerText = "Turn: " + turn.charAt(0).toUpperCase() + turn.slice(1)
            
            drawBoard()
        }
        else{
            moves = [];
            selected = null;
            drawBoard()
            return;
        }

    }
}

drawBoard()

export {state};