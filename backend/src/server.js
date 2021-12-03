import { Server } from "socket.io";
import * as path from "path";
import { readdirSyncRecursive } from "./helpers/fs";

const io = new Server({
  cors: { origin: "http://localhost:3000" },
});

/** Loading dynamically all the events through the listeners/ folder */
const listenersPath = path.join(__dirname, "listeners");
const listeners = readdirSyncRecursive(listenersPath)
  .map((listenerPath) => {
    const { default: listener } = require(listenerPath);

    const event = listenerPath
      .replace(`${listenersPath}${path.sep}`, '')
      .replace('.js', '')
      .replaceAll(path.sep, '::');

    return { event, listener: listener || function() {} };
  });

io.on("connection", (socket) => {
  listeners.forEach(({ event, listener }) => socket.on(event, listener(socket)));
});

io.listen(4242);
console.log("server started at ws://localhost:4242");

//
// const games = {
//   WordAndFurious: {
//     players: []
//   },
//   QuickWord: {
//     players: []
//   },
//   MagicNumber: {
//     numberToGuess: 10,
//     players: []
//   }
// }
//
// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000"
//   }
// });
//
// io.on("connection", (socket) => {
//   socket.on("disconnect", () => {
//     // console.log("leaving client", socket.id)
//   })
//
//   socket.on("game::join", (payload) => {
//     const { nickname, game } = payload
//     games[game].players.push({
//       nickname,
//       socket,
//     })
//
//     // If the game is full, notify players that the game started
//     if (games[game].players.length >= 2) {
//       games[game].players.forEach((player) => {
//         console.log(player.nickname)
//         player.socket.emit("game::start")
//       })
//     }
//
//     console.log(games)
//   })
//
//   /** Magic Number */
//   socket.on("game::magic-number::send-number", ({ magicNumber }) => {
//     const { numberToGuess, players } = games["MagicNumber"]
//     if (numberToGuess == magicNumber) {
//       players.forEach((player) => {
//         player.socket.emit(
//           "game::magic-number::finish",
//           { win: player.socket.id === socket.id }
//         )
//       })
//     }
//   })
// });
//
// io.listen(4242);
// console.log("server started at ws://localhost:4242")