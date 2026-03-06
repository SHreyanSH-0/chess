let state = require("./game.js");
let legalMoves = require("./validMoves.js")

function pawnMove(r,c){
    let piece = state[r][c];
    
    if(piece=="K"){
        let cords = [[r-1,c-1], [r-1,c+1]];
        for(let [i,j] of cords){
            if(i>=0&&i<=7&&j>=0&&j<=7&&state[i][j]=="p") return true;
        }
    }
    else{
        let cords = [[r+1,c-1], [r+1,c+1]];
        for(let [i,j] of cords){
            if(i>=0&&i<=7&&j>=0&&j<=7&&state[i][j]=="P") return true;
        }
    }
    return false;
}

function rookMove(r,c){
    let piece = state[r][c];

    for(let i = r + 1;i<=7;i++){
        if(state[i][c]=="") continue;
        if(piece=="K"){
            if(state[i][c] == "r" || state[i][c] == "q") return true;
            break;
        }
        else{
            if(state[i][c] == "R" || state[i][c] == "Q") return true;
            break;
        }
    }
    for(let i = r - 1;i>=0;i--){
        if(state[i][c]=="") continue;
        let pr = i, pc = c;
        if(piece=="K"){
            if(state[pr][pc] == "r" || state[pr][pc] == "q") return true;
            break;
        }
        else{
            if(state[pr][pc] == "R" || state[pr][pc] == "Q") return true;
            break;
        }
    }
    for(let i = c - 1;i>=0;i--){
        let pr = r, pc = i;
        if(state[pr][pc]=="") continue;
        if(piece=="K"){
            if(state[pr][pc] == "r" || state[pr][pc] == "q") return true;
            break;
        }
        else{
            if(state[pr][pc] == "R" || state[pr][pc] == "Q") return true;
            break;
        }
    }
    for(let i = c + 1;i<=7;i++){
        let pr = r, pc = i;
        if(state[pr][pc]=="") continue;
        if(piece=="K"){
            if(state[pr][pc] == "r" || state[pr][pc] == "q") return true;
            break;
        }
        else{
            if(state[pr][pc] == "R" || state[pr][pc] == "Q") return true;
            break;
        }
    }
    return false;
}   

function knightMove(r,c){
    let piece = state[r][c];
    let cords = [[r+2,c+1],[r+2,c-1],[r+1,c+2],[r-1,c+2],[r+1,c-2],[r-1,c-2],[r-2,c+1],[r-2,c-1]];

    for(let cord of cords){
        if(cord[0]>=0&&cord[0]<=7&&cord[1]>=0&&cord[1]<=7){
            let tar = state[cord[0]][cord[1]];
            if(piece=="K"&&tar=="n"){
                return true;
            }
            else if(piece=="k"&&tar=="N"){
                return true;
            }
        }
    }
    return false;
}

function bishopMove(r,c){
    let piece = state[r][c];
    for(let i = r + 1, j = c + 1; i>=0&&j>=0&& i<=7&&j<=7;i++,j++){
        let tar = state[i][j];
        if(tar=="") continue;
        else{
            if(piece=="k"&&(tar=="Q"||tar=="B")) return true;
            if(piece=="K"&&(tar=="q"||tar=="b")) return true;
            break;
        }
    }
    for(let i = r - 1, j = c - 1;i>=0&&j>=0&& i<=7&&j<=7;i--,j--){
        let tar = state[i][j];
        if(tar=="") continue;
        else{
            if(piece=="k"&&(tar=="Q"||tar=="B")) return true;
            if(piece=="K"&&(tar=="q"||tar=="b")) return true;
            break;
        }
    }
    for(let i = r - 1, j = c + 1; i>=0&&j>=0&& i<=7&&j<=7;i--,j++){
        let tar = state[i][j];
        if(tar=="") continue;
        else{
            if(piece=="k"&&(tar=="Q"||tar=="B")) return true;
            if(piece=="K"&&(tar=="q"||tar=="b")) return true;
            break;
        }
    }
    for(let i = r + 1, j = c - 1; i>=0&&j>=0&& i<=7&&j<=7;i++,j--){
        let tar = state[i][j];
        if(tar=="") continue;
        else{
            if(piece=="k"&&(tar=="Q"||tar=="B")) return true;
            if(piece=="K"&&(tar=="q"||tar=="b")) return true;
            break;
        }
    }
    return false;
}

function isChecked(r,c){
    return pawnMove(r,c) || knightMove(r,c) || rookMove(r,c) || bishopMove(r,c);
}

function checkmate(white){

    let moves = [];

    if(white){
        let wk;
        for(let i = 0;i<8;i++){
            for(let j = 0;j<8;j++){
                if(state[i][j] == "K") wk = [i,j];
            }
        }
        for(let i = 0;i<8;i++){
            for(let j = 0;j<8;j++){
                if(state[i][j]=="K"){
                    moves = legalMoves.kingMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "K";
                        state[i][j] = "";
                        if(!isChecked(move[0],move[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "K";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "K";
                    }
                }
                else if(state[i][j]== "P"){
                    moves = legalMoves.pawnMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "P";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "P";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "P";
                    }
                }
                else if(state[i][j]== "R"){
                    moves = legalMoves.rookMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "R";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "R";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "R";
                    }
                }
                else if(state[i][j]== "B"){
                    moves = legalMoves.bishopMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "B";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "B";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "B";
                    }
                }
                else if(state[i][j]== "N"){
                    moves = legalMoves.knightMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "N";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "N";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "N";
                    }
                }
                else if(state[i][j]== "Q"){
                    moves = legalMoves.queenMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "Q";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "Q";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "Q";
                    }
                }
            }
        }
    }
    else{
        let wk;
        for(let i = 0;i<8;i++){
            for(let j = 0;j<8;j++){
                if(state[i][j] == "k") wk = [i,j];
            }
        }
        for(let i = 0;i<8;i++){
            for(let j = 0;j<8;j++){
                if(state[i][j]=="k"){
                    moves = legalMoves.kingMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "k";
                        state[i][j] = "";
                        if(!isChecked(move[0],move[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "k";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "k";
                    }
                }
                else if(state[i][j]== "p"){
                    moves = legalMoves.pawnMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "p";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "p";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "p";
                    }
                }
                else if(state[i][j]== "r"){
                    moves = legalMoves.rookMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "r";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "r";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "r";
                    }
                }
                else if(state[i][j]== "b"){
                    moves = legalMoves.bishopMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "b";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "b";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "b";
                    }
                }
                else if(state[i][j]== "n"){
                    moves = legalMoves.knightMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "n";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "n";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "n";
                    }
                }
                else if(state[i][j]== "q"){
                    moves = legalMoves.queenMove(i,j);
                    for(let move of moves){
                        let tar = state[move[0]][move[1]];
                        state[move[0]][move[1]]= "q";
                        state[i][j] = "";
                        if(!isChecked(wk[0],wk[1])){
                            state[move[0]][move[1]]= tar;
                            state[i][j] = "q";
                            return false;
                        }
                        state[move[0]][move[1]]= tar;
                        state[i][j] = "q";
                    }
                }
            }
        }

    }
    return true;
}

export {isChecked,checkmate};