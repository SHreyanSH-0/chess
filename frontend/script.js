import * as moveValidator from "./validMoves.js";
import { isChecked } from "./isChecked.js";

const board = document.getElementById("board")
const turnText = document.getElementById("turn")


let selected = null
let turn = "white"
let moves = [];
let check = false;
let checkKingPos = null;

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
            sq.id = r + "" + c;

            let piece = state[r][c]

            if(piece=="K" && isChecked(r,c)) {
                sq.classList.add("checked"); 
                check = true;
                checkKingPos = [r,c];
            }
            if(piece=="k" && isChecked(r,c)) {
                sq.classList.add("checked"); 
                check = true;
                checkKingPos = [r,c];
            }

            if (piece != "") sq.textContent = pieces[piece]

            sq.addEventListener("click", clickSquare)

            board.appendChild(sq)

        }
    }
}

function clickSquare(e) {

    let r = parseInt(e.target.dataset.row)
    let c = parseInt(e.target.dataset.col)
    
    if (selected == null||((turn == "white" && state[r][c] == state[r][c].toUpperCase()&&state[r][c]!="") || (turn == "black" && state[r][c] ==state[r][c].toLowerCase()&&state[r][c]!="" ))) {
        
        if(selected!=null){
            let element = document.querySelector(".selected");
            if(element!=null)
            element.classList.remove("selected");
            for(let v of moves){
                let element = document.getElementById(v[0] + "" + v[1]);
                element.classList.remove("can");
            }
            moves = [];
        }

        let piece = state[r][c]

        if (piece == "") return

        if (turn == "white" && piece !== piece.toUpperCase()) return
        if (turn == "black" && piece !== piece.toLowerCase()) return

        selected = { r, c }
        if(piece=="p"||piece=="P") moves = moveValidator.pawnMove(r,c);
        if(piece=="R"||piece=="r") moves = moveValidator.rookMove(r,c);
        if(piece=="N"||piece=="n") moves = moveValidator.knightMove(r,c);
        if(piece=="B"||piece=="b") moves = moveValidator.bishopMove(r,c);
        if(piece=="Q"||piece=="q") moves = moveValidator.queenMove(r,c);
        if(piece=="K"||piece=="k") moves = moveValidator.kingMove(r,c);
        
        console.log(moves);
        for(let v of moves){
            let element = document.getElementById(v[0] + "" + v[1]);
            element.classList.add("can");
        }
        let element = document.getElementById(r + "" + c);
        element.classList.add("selected");
    }
     else {

        if(moves.find(e => e[0] == r && e[1] == c)) {            
            let from = selected
            let piece = state[from.r][from.c]
            let tar = state[r][c];
            if(check){
                let row ,col;
                if(piece=="K"||piece == "k") {
                    row = r;
                    col = c;
                }
                else{
                    row = checkKingPos[0];
                    col = checkKingPos[1];
                }
                state[r][c] = piece;
                state[from.r][from.c] = "";
                if(isChecked(row,col)) {
                    state[r][c] = tar;
                    state[from.r][from.c] = piece;
                    moves = [];
                    selected = null;
                    drawBoard()
                    return;
                }
                else check = false;
            }
            
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

export {state , check};