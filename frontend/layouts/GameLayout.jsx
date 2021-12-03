import { useState, useEffect, useContext } from 'react';
import { SocketContext } from "../contexts/socket";
import Game from '../components/Game';

export default function GameLayout({ join, leave, children }) {
  const socket = useContext(SocketContext);
  const [isWaitingPlayers, setIsWaitingPlayers] = useState(true);

  useEffect(
    () => {
      socket.on("game::start", () => setIsWaitingPlayers(false));
    },
    [],
  );

  return (
    <Game
      join={join}
      leave={leave}
    >
      { isWaitingPlayers && <p> Waiting Opponents ... </p> }
      { !isWaitingPlayers && children }
    </Game>
  );
}
