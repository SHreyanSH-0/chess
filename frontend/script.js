import * as moveValidator from "./validMoves.js";
import { isChecked , checkmate} from "./isChecked.js";

const board = document.getElementById("board")
const turnText = document.getElementById("turn")


let selected = null
let turn = "white"
let moves = [];
let check = false;
let checkKingPos = null;
let canBlackCastleShort = true;
let canBlackCastleLong = true;
let canWhiteCastleShort = true;
let canWhiteCastleLong = true;

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
    if(checkKingPos!=null)
    console.log((state[checkKingPos[0]][checkKingPos[1]]==state[checkKingPos[0]][checkKingPos[1]].toUpperCase()));
    if(check && checkmate(state[checkKingPos[0]][checkKingPos[1]]==state[checkKingPos[0]][checkKingPos[1]].toUpperCase())){
        if(state[checkKingPos[0]][checkKingPos[1]]==state[checkKingPos[0]][checkKingPos[1]].toUpperCase()){
            window.open("black.html", "_blank");
        }
        else{
            window.open("white.html", "_blank");
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
            // if(check){
            //     let row ,col;
            //     if(piece=="K"||piece == "k") {
            //         row = r;
            //         col = c;
            //     }
            //     else{
            //         row = checkKingPos[0];
            //         col = checkKingPos[1];
            //     }
            //     state[r][c] = piece;
            //     state[from.r][from.c] = "";
            //     if(isChecked(row,col)) {
            //         state[r][c] = tar;
            //         state[from.r][from.c] = piece;
            //         moves = [];
            //         selected = null;
            //         drawBoard()
            //         return;
            //     }
            //     else check = false;
            // }

            if(turn == "white"){
                if(piece == "R" && c == 0) canWhiteCastleLong = false; 
                if(piece == "R" && c == 7) canWhiteCastleShort = false; 
                if(piece == "K" && r == 7&& c== 2&&canWhiteCastleLong) {
                    state[7][0] = "";
                    state[7][3] = "R";
                    canWhiteCastleLong = false;
                    canWhiteCastleShort = false;
                }
                else if(piece == "K" && r == 7&& c== 6&&canWhiteCastleShort){
                    state[7][7] = "";
                    state[7][5] = "R";
                    canWhiteCastleLong = false;
                    canWhiteCastleShort = false;
                }
                else if(piece=="K"){
                    canWhiteCastleLong = false;
                    canWhiteCastleShort = false;
                }
            }
            else{
                if(piece == "r" && c == 0) canBlackCastleLong = false; 
                if(piece == "r" && c == 7) canBlackCastleShort = false; 
            
                if(piece == "k" && r == 0&& c== 2&&canBlackCastleLong) {
                    state[0][0] = "";
                    state[0][3] = "r";
                    canBlackCastleLong = false;
                    canBlackCastleShort = false;
                }
                else if(piece == "k" && r == 0&& c== 6&&canBlackCastleShort){
                    state[0][7] = "";
                    state[0][5] = "r";
                    canBlackCastleLong = false;
                    canBlackCastleShort = false;
                }
                else if(piece=="k"){
                    canBlackCastleLong = false;
                    canBlackCastleShort = false;
                }
            }
            state[from.r][from.c] = ""
            state[r][c] = piece
            
            let wk, bk;

            for(let i = 0;i<8;i++){
                for(let j = 0;j<8;j++){
                    if(state[i][j] == "K") wk = [i,j];
                    if(state[i][j] == "k") bk = [i,j];
                }
            }
            selected = null

            if(turn=="white"){
                if(isChecked(wk[0],wk[1])){
                    state[r][c] = tar;
                    state[from.r][from.c] = piece;
                    drawBoard()
                    return;
                }
            }
            else{
                if(isChecked(bk[0],bk[1])){
                    state[r][c] = tar;
                    state[from.r][from.c] = piece;
                    drawBoard()
                    return;
                }
            }
            check = false;
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

function canCastle(r,c,rc){
    
    if(state[r][c]=="K"){
        if(rc==0&&canWhiteCastleLong){
            if(state[7][1]==""&&state[7][2]==""&&state[7][3]==""){
                return true;
            }
        }
        else if(rc==7&&canWhiteCastleShort){
            if(state[7][6]==""&&state[7][5]==""){
                return true;
            }
        }
    }
    else{
        if(rc==0&&canBlackCastleLong){
            if(state[0][1]==""&&state[0][2]==""&&state[0][3]==""){
                return true;
            }
        }
        else if(rc==7&&canBlackCastleShort){
            if(state[0][6]==""&&state[0][5]==""){
                return true;
            }
        }
    }
        return false;
    }
    
    drawBoard()
    
export {state , check, canBlackCastleLong, canBlackCastleShort,canWhiteCastleLong,canWhiteCastleShort,canCastle};