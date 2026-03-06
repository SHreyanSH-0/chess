const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const {Server} = require("socket.io");
const http = require("http");

let game = require("./gameBoard/game");
let {updateBoard,undoMove} = require("./gameBoard/updateBoard")


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

// const router = require("./routes/gameRoutes");

// app.use("/chess",router);

// app.listen(PORT,()=>{
//     console.log("SERVER RUNNING ON PORT " + PORT);
// });

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

const PORT = process.env.PORT;


io.on("connection",(socket)=>{

    console.log("player connected");

    socket.emit("state",game);

    socket.on("move",(data)=>{
        // let piece = game.state[from[0]][from[1]];

        // game.state[from[0]][from[1]]="";
        // game.state[to[0]][to[1]]=piece;

        // game.turn = turn;
        let {from,to, t, undo,currentMove} = data;
        if(undo){
            undoMove();
        }
        else{
            updateBoard(from,to,t);
            game.mH.push(currentMove);
            console.log(currentMove);
        }

        io.emit("state",game);
    });

    // socket.on("undo",()=>{

    //     if(game.mH.length>0){
    //         let last = game.mH.pop();

    //         game.state[last.from[0]][last.from[1]] = last.piece;
    //         game.state[last.to[0]][last.to[1]] = last.tar;

    //         game.turn = last.turn;
    //     }

    //     io.emit("state",game);
    // });

});

server.listen(PORT,()=>{
    console.log("server running");
});

