const socket = io("http://localhost:3000");

let moveHistory = [];
socket.on("state",(game)=>{

    moveHistory = game.mH;

});
export {moveHistory}