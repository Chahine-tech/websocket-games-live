import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../contexts/player";
import { SocketContext } from "../../contexts/socket";
import GameLayout from "../../layouts/GameLayout";

export default function WordAndFuriousPage() {
  const player = useContext(PlayerContext);
  const socket = useContext(SocketContext);
  const [key, setKey] = useState("");

  const join = () => {
    socket.emit("game::join", { game: "WordAndFurious", nickname: player.nickname });
  }
  const leave = () => socket.emit("game::leave", { game: "WordAndFurious", nickname: player.nickname });

  useEffect(
    () => {
      socket.on(
        "game::word-and-furious::key",
        ({ key }) => setKey(key)
      );
    },
    [],
  );

  return (
    <GameLayout
      join={join}
      leave={leave}
    >
      <div>
        Word And Furious, please press {key}.

        <input className="border border-black outline-none"/>
      </div>
    </GameLayout>
  );
}
