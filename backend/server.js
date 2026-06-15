const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const {Server} = require("socket.io");
const http = require("http");

let game = {
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
let {updateBoard,undoMove,resetBoard} = require("./gameBoard/updateBoard")

const mongoose = require("mongoose");


Promise.resolve(mongoose.connect(process.env.mongo_url).then(()=>console.log("DB Connected"))).catch(err=>console.log(err));


const rooms = {};

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

//     console.log("player connected");

//     socket.emit("state",game);

//     socket.on("move",(data)=>{
//         // let piece = game.state[from[0]][from[1]];

//         // game.state[from[0]][from[1]]="";
//         // game.state[to[0]][to[1]]=piece;

//         // game.turn = turn;
//         let {from,to, t, undo,currentMove} = data;
//         if(undo){
//             undoMove();
//         }
//         else{
//             updateBoard(from,to,t);
//             game.mH.push(currentMove);
//             console.log(currentMove);
//         }

//         io.emit("state",game);
//     });

//     socket.on("reset",(data)=>{
//         resetBoard();
//         console.log(game);
//         io.emit("state",game);
//     });

//     // socket.on("undo",()=>{

//     //     if(game.mH.length>0){
//     //         let last = game.mH.pop();

//     //         game.state[last.from[0]][last.from[1]] = last.piece;
//     //         game.state[last.to[0]][last.to[1]] = last.tar;

//     //         game.turn = last.turn;
//     //     }

//     //     io.emit("state",game);
//     // });

    socket.on("rejoin-room", ({ roomId, color }) => {

        const room = rooms[roomId];

        if (!room) return;

        socket.join(roomId);

        if (color === "white") {
            room.white = socket.id;
        } else {
            room.black = socket.id;
        }

        console.log("rejoined", roomId, color);
    });

    socket.on("create-room", () => {

        const roomId = Math.random().toString(36).substring(2, 8);

        rooms[roomId] = {
            white : socket.id,
            black : null,
            game: structuredClone(game)
        };

        socket.join(roomId);

        socket.emit("room-created", {
            roomId,
            color : "white"
        });
    });

    socket.on("join-room", (roomId) => {

        const room = rooms[roomId];

        if (!room) {
            console.log('err1');
            socket.emit("error-message", "Room not found");
            return;
        }

        if (room.black) {
            console.log('err2');
            socket.emit("error-message", "Room full");
            return;
        }

        console.log('black');

        room.black = socket.id;

        socket.join(roomId);

        socket.emit("joined-room", {
            roomId,
            color: "black"
        });

        io.to(roomId).emit("game-start", {
            game: room.game
        });
    });


    socket.on("move", (data) => {

        const room = rooms[data.roomId];
        if (!room) return;

        if (room.game.turn === "white" &&socket.id !== room.white) {
            return;
        }

        if (room.game.turn === "black" &&socket.id !== room.black) {
            return;
        }

        updateBoard(
            room.game,
            data.from,
            data.to,
            data.t
        );

        room.game.mH.push(data.currentMove);

        io.to(data.roomId).emit("state",
            room.game
        );
    });

    socket.on("get-state", (roomId) => {
        console.log(roomId);
        console.log(rooms[roomId]);
        if(!rooms[roomId]) return;
        socket.emit(
            "state",
            rooms[roomId].game
        );
    });

    socket.on("disconnect", () => {
        for (const roomId in rooms) {

            const room = rooms[roomId];

            if (room.white === socket.id || room.black === socket.id) {

                io.to(roomId).emit(
                    "opponent-disconnected"
                );

                // delete rooms[roomId];
            }
        }
    });
});

const gameRoutes = require("./routes/gameRoutes");

app.use("/game", gameRoutes);

const userRoutes = require("./routes/authRoutes");

app.use("/", userRoutes);

app.get("/",(req,res)=>{
    res.send("HELLOW");
})

server.listen(PORT,()=>{
    console.log("server running");
});

