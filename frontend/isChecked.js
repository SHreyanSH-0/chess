import { state, check } from "./script.js";

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
    let cords = [[r+2,c+1],[r+2,c-1],[r+1,c+2],[r-1,c+2],[r+1,c-2],[r-1,c-2],[r-2,c+1],[r-2,c+1]];

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

export {isChecked};