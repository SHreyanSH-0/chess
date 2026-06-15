function updateBoard(game,from,to,nextTurn){
    let board = game.state;
    let piece = board[from[0]][from[1]];
    board[from[0]][from[1]] = "";
    board[to[0]][to[1]] = piece;
    game.turn = nextTurn;
    game.state = board;
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

module.exports = {updateBoard,undoMove,resetBoard}