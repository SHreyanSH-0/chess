import { state, check ,canBlackCastleLong,canBlackCastleShort,canWhiteCastleLong,canWhiteCastleShort,canCastle} from "./script.js";
import { isChecked } from "./isChecked.js";
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

    if(piece=="k"){
        if(canBlackCastleLong&&canCastle(r,c,0)){
            state[0][2] = "k";
            state[0][3] = "r";
            state[0][0] = "";
            state[0][1] = "";
            state[0][4] = "";
            if(!isChecked(0,2)) moves.push([0,2]);
            state[0][2] = "";
            state[0][3] = "";
            state[0][0] = "r";
            state[0][1] = "";
            state[0][4] = "k";
        }
        if(canBlackCastleShort&&canCastle(r,c,7)) {
            state[0][6] = "k";
            state[0][5] = "r";
            state[0][7] = "";
            state[0][4] = "";
            if(!isChecked(0,6)) moves.push([0,6]);
            state[0][6] = "";
            state[0][5] = "";
            state[0][7] = "r";
            state[0][4] = "k";
        }
    }
    else if(piece == "K"){
        if(canWhiteCastleLong&&canCastle(r,c,0)) {
            state[7][2] = "K";
            state[7][3] = "R";
            state[7][0] = "";
            state[7][1] = "";
            state[7][4] = "";
            if(!isChecked(7,2)) moves.push([7,2]);
            state[7][2] = "";
            state[7][3] = "";
            state[7][0] = "R";
            state[7][1] = "";
            state[7][4] = "K";
        }
        if(canWhiteCastleShort&&canCastle(r,c,7)) {
            state[7][6] = "K";
            state[7][5] = "R";
            state[7][7] = "";
            state[7][4] = "";
            if(!isChecked(7,6)) moves.push([7,6]);
            state[7][6] = "";
            state[7][5] = "";
            state[7][7] = "R";
            state[7][4] = "K";
        }
    }

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
            if(piece==piece.toUpperCase() && tar == tar.toLowerCase()){
                state[r][c] = "";
                state[cord[0]][cord[1]] = piece;
                if(!isChecked(cord[0],cord[1])) moves.push([cord[0],cord[1]]);
                state[r][c] = piece;
                state[cord[0]][cord[1]] = tar;
                
            } 
            else if(piece==piece.toLowerCase() && tar == tar.toUpperCase()){
                state[r][c] = "";
                state[cord[0]][cord[1]] = piece;
                if(!isChecked(cord[0],cord[1])) moves.push([cord[0],cord[1]]);
                state[r][c] = piece;
                state[cord[0]][cord[1]] = tar;
            } 
            else if(tar==""){
                state[r][c] = "";
                state[cord[0]][cord[1]] = piece;
                if(!isChecked(cord[0],cord[1])) moves.push([cord[0],cord[1]]);
                state[r][c] = piece;
                state[cord[0]][cord[1]] = tar;
            } 
        }
    }
    return moves;
}

export {pawnMove, rookMove,knightMove,bishopMove,queenMove,kingMove};