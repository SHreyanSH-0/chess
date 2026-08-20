import {pawnMove,rookMove,knightMove,bishopMove,queenMove,kingMove} from "./validMoves.js";

function updateBoard(game,from,to,nextTurn){

    if(!validateMove(game,from,to)){
        return false;
    }

    let board = game.state;
    let piece = board[from[0]][from[1]];
    board[from[0]][from[1]] = "";
    board[to[0]][to[1]] = piece;
    game.turn = nextTurn;
    game.state = board;
    return true;
}

function validateMove(game,from,to){

    if(from[0]<0 || from[0]>7 || from[1]<0 || from[1]>7 || to[0]<0 || to[0]>7 || to[1]<0 || to[1]>7){
        return false;
    }

    let board = game.state;
    let piece = board[from[0]][from[1]];
    if(piece == "") return false;

    let validMoves = [];
    switch(piece.toLowerCase()){
        case "p":
            validMoves = pawnMove(board,from[0],from[1]);
            break;
        case "r":
            validMoves = rookMove(board,from[0],from[1]);
            break;
        case "n":
            validMoves = knightMove(board,from[0],from[1]);
            break;
        case "b":
            validMoves = bishopMove(board,from[0],from[1]);
            break;
        case "q":
            validMoves = queenMove(board,from[0],from[1]);
            break;
        case "k":
            validMoves = kingMove(board,from[0],from[1]);
            break;
    }

    return validMoves.some(move => move[0] === to[0] && move[1] === to[1]);
}


function resetBoard(game){
    let hold = {
        "state" : [
                    ["r", "n", "b", "q", "k", "b", "n", "r"],
                    ["p", "p", "p", "p", "p", "p", "p", "p"],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["", "", "", "", "", "", "", ""],
                    ["P", "P", "P", "P", "P", "P", "P", "P"],
                    ["R", "N", "B", "Q", "K", "B", "N", "R"]
                ],
        "turn" : "white",
        "mH" : [],
    }
    game.state = hold.state;
    game.turn = hold.turn;
    game.mH = hold.mH;
}

function undoMove(game){
    let t = null;    
    while(game.mH.length>0){
        if((t==null ||( t == (game.mH[game.mH.length - 1]).turn))){

            let lastMove = game.mH.pop();
            game.state[lastMove.from[0]][lastMove.from[1]] = lastMove.piece;
            game.state[lastMove.to[0]][lastMove.to[1]] = lastMove.tar;
            game.turn = lastMove.turn;
            t = lastMove.turn;
        }
        else break;
    }
}

export {updateBoard,undoMove,resetBoard};