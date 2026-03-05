import { state } from "./script.js";

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

export {pawnMove, rookMove};