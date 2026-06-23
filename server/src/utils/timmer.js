const { Server } = require("socket.io");
const timmer = require("./constants");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // console.log("Connected:", socket.id);

    socket.on("disconnect", () => {
    //   console.log("Disconnected:", socket.id);
    });
  });

  let count = timmer;


  setInterval(() => {
    if(count==0){
        count = timmer
    }
    count--;
    io.emit("timer", count);
  }, 1000);
}

module.exports = initSocket;