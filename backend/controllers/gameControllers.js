let game = require("../gameBoard/game");
let {updateBoard,undoMove} = require("../gameBoard/updateBoard")

function currentState(req,res){
    try{
        res.json(game);
    }
    catch(err){
        console.log(err);
    }
}

function update(req,res){
    try{
        let {from,to, t, undo,currentMove} = req.body;
        if(undo){
            undoMove();
        }
        else{
            updateBoard(from,to,t);
            game.mH.push(currentMove);
            console.log(currentMove);
        }
        res.send(game);
    }
    catch(err){
        console.log(err);
    }
}


module.exports = {currentState,update};