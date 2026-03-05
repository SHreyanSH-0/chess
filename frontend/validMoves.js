import { state, check } from "./script.js";

function pawnMove(r,c){
    let piece = state[r][c];
    const moves = [];
    if(piece === piece.toUpperCase()){
        let startr = r - 1;
        let startc = c - 1;
        if(r==6){
            if(state[r-2][c] == ""){
                moves.push([r-2,c]);
            }
        }
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] != ""&&state[startr][startc] === state[startr][startc].toLowerCase()){
            moves.push([startr,startc]);
        }
        startc++;
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] == ""){
            moves.push([startr,startc]);
        }
        startc++;
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] != ""&&state[startr][startc] === state[startr][startc].toLowerCase()){
            moves.push([startr,startc]);
        }

    }
    else{
        let startr = r + 1;
        let startc = c + 1;
        if(r==1){
            if(state[r+2][c] == ""){
                moves.push([r+2,c]);
            }
        }
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] != ""&&state[startr][startc] === state[startr][startc].toUpperCase()){
            moves.push([startr,startc]);
        }
        startc--;
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] == ""){
            moves.push([startr,startc]);
        }
        startc--;
        if(startr>=0&&startc>=0&&startr<=7&&startc<=7&&state[startr][startc] != ""&&state[startr][startc] === state[startr][startc].toUpperCase()){
            moves.push([startr,startc]);
        }
    }
    return moves;
}

function rookMove(r,c){
    let moves = []
    for(let i = r + 1;i<=7;i++){
        if(state[i][c] == "") moves.push([i,c]);
        else {
            if(state[i][c] === state[i][c].toLowerCase() && 
                state[r][c] === state[r][c].toUpperCase()) moves.push([i,c]);
            
            else if(state[i][c] === state[i][c].toUpperCase() && 
                state[r][c] === state[r][c].toLowerCase()) moves.push([i,c]);
            break;
        }
    }
    for(let i = r - 1;i>=0;i--){
        if(state[i][c] == "") moves.push([i,c]);
        else {
            if(state[i][c] === state[i][c].toLowerCase() && 
                state[r][c] === state[r][c].toUpperCase()) moves.push([i,c]);
            
            else if(state[i][c] === state[i][c].toUpperCase() && 
                state[r][c] === state[r][c].toLowerCase()) moves.push([i,c]);
            break;
        }
    }
    for(let i = c - 1;i>=0;i--){
        if(state[r][i] == "") moves.push([r,i]);
        else {
            if(state[r][i] === state[r][i].toLowerCase() && 
                state[r][c] === state[r][c].toUpperCase()) moves.push([r,i]);
            
            else if(state[r][i] === state[r][i].toUpperCase() && 
                state[r][c] === state[r][c].toLowerCase()) moves.push([r,i]);
            break;
        }
    }
    for(let i = c + 1;i<=7;i++){
        if(state[r][i] == "") moves.push([r,i]);
        else {
            if(state[r][i] === state[r][i].toLowerCase() && 
                state[r][c] === state[r][c].toUpperCase()) moves.push([r,i]);
            
            else if(state[r][i] === state[r][i].toUpperCase() && 
                state[r][c] === state[r][c].toLowerCase()) moves.push([r,i]);
            break;
        }
    }
    return moves;
}   

function knightMove(r,c){
    let moves = [];
    let cords = [[r+2,c+1],[r+2,c-1],[r+1,c+2],[r-1,c+2],[r+1,c-2],[r-1,c-2],[r-2,c+1],[r-2,c-1]];

    for(let cord of cords){
        if(cord[0]>=0&&cord[0]<=7&&cord[1]>=0&&cord[1]<=7){
            let piece = state[cord[0]][cord[1]];
            if(piece=="") moves.push(cord);
            else if(state[r][c] == state[r][c].toLowerCase() && piece==piece.toUpperCase()) moves.push([cord[0],cord[1]]);
            else if(state[r][c] == state[r][c].toUpperCase() && piece==piece.toLowerCase()) moves.push([cord[0],cord[1]]);
        }
    }
    return moves;
}

function bishopMove(r,c){
    let moves = [];
    let bis = state[r][c];
    for(let i = r + 1, j = c + 1; i>=0&&j>=0&& i<=7&&j<=7;i++,j++){
        let piece = state[i][j];
        if(piece=="") moves.push([i,j]);
        else{
            if(bis==bis.toUpperCase()&&piece==piece.toLowerCase()) moves.push([i,j]);
            else if(bis==bis.toLowerCase()&&piece==piece.toUpperCase()) moves.push([i,j]);
            break;
        }
    }
    for(let i = r - 1, j = c - 1;i>=0&&j>=0&& i<=7&&j<=7;i--,j--){
        let piece = state[i][j];
        if(piece=="") moves.push([i,j]);
        else{
            if(bis==bis.toUpperCase()&&piece==piece.toLowerCase()) moves.push([i,j]);
            else if(bis==bis.toLowerCase()&&piece==piece.toUpperCase()) moves.push([i,j]);
            break;
        }
    }
    for(let i = r - 1, j = c + 1; i>=0&&j>=0&& i<=7&&j<=7;i--,j++){
        let piece = state[i][j];
        if(piece=="") moves.push([i,j]);
        else{
            if(bis==bis.toUpperCase()&&piece==piece.toLowerCase()) moves.push([i,j]);
            else if(bis==bis.toLowerCase()&&piece==piece.toUpperCase()) moves.push([i,j]);
            break;
        }
    }
    for(let i = r + 1, j = c - 1; i>=0&&j>=0&& i<=7&&j<=7;i++,j--){
        let piece = state[i][j];
        if(piece=="") moves.push([i,j]);
        else{
            if(bis==bis.toUpperCase()&&piece==piece.toLowerCase()) moves.push([i,j]);
            else if(bis==bis.toLowerCase()&&piece==piece.toUpperCase()) moves.push([i,j]);
            break;
        }
    }
    return moves;
}

function queenMove(r,c){
    let moves = rookMove(r,c).concat( bishopMove(r,c));
    return moves;
}

function kingMove(r,c){
    let cords = [[r-1,c-1],[r-1,c],[r-1,c+1],[r+1,c-1],[r+1,c],[r+1,c+1],[r,c-1],[r,c+1]];
    let moves = [];
    let piece = state[r][c];

    let x,y;

    for(let i = 0;i<8;i++){
        for(let j = 0;j<8;j++){
            if(piece=="k"&&state[i][j]=="K"){
                x = i;y = j;
            }
            if(piece == "K" && state[i][j] == "k"){
                x = i;y = j;
            }
        }
    }

    for(let cord of cords){
        if(cord[0]>=0&&cord[0]<=7&&cord[1]>=0&&cord[1]<=7){
            let tar = state[cord[0]][cord[1]];
            let i = cord[0], j = cord[1];
            let dist = Math.pow(x-i,2) + Math.pow(y - j , 2);
            if(dist <= 2) continue;
            console.log(dist);
            if(piece==piece.toUpperCase() && tar == tar.toLowerCase()) moves.push([cord[0],cord[1]]);
            else if(piece==piece.toLowerCase() && tar == tar.toUpperCase()) moves.push([cord[0],cord[1]]);
            else if(tar=="") moves.push([cord[0],cord[1]]);
        }
    }
    return moves;
}

export {pawnMove, rookMove,knightMove,bishopMove,queenMove,kingMove};