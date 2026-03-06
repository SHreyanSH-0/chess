const socket = io("https://chess-124102054.onrender.com");

let moveHistory = [];
socket.on("state",(game)=>{

    moveHistory = game.mH;

});
export {moveHistory}