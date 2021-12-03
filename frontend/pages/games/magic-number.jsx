import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "../../contexts/socket";
import { PlayerContext } from "../../contexts/player";

export default function MagicNumberPage() {
    const router = useRouter()
    const player = useContext(PlayerContext)
    const { socket } = useContext(SocketContext)
    const [isWaitingPlayers, setIsWaitingPlayers] = useState(true)
    const [magicNumber, setMagicNumber] = useState(0)
    const [hasWin, setHasWin] = useState(null)

    useEffect(() => {
      socket.emit("game::join", { game: "MagicNumber", nickname: player.nickname })

      socket.on("game::start", () => {
        setIsWaitingPlayers(false)
      })

      socket.on("game::magic-number::finish", ({ win }) => {
        setHasWin(win);

        setInterval(() => router.push('/'), 3000)
      })
    }, [])

    const sendMagicNumber = (magicNumber) => {
      socket.emit("game::magic-number::send-number", { magicNumber })
    }

    return (
        <div>
            { isWaitingPlayers && <p> Waiting for opponents ... </p> }
            { !isWaitingPlayers && (
                <div>
                    Guess the Magic Number !
                    <input value={magicNumber} onChange={(e) => setMagicNumber(e.target.value)} />
                    <button onClick={() => sendMagicNumber(magicNumber)}>Send</button>
                </div>
            )}

            { hasWin !== null && (<p> Tu a {hasWin ? 'Gagné':'Perdu'} </p>)}
        </div>
    )
}
