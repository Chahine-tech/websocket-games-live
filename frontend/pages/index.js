import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SocketContext } from "../contexts/socket";
import {PlayerContext} from "../contexts/player";

function slugify(string) {
  return [...string]
    .map((letter, index) => {
      const code = letter.charCodeAt(0)
      if ((code >= 65 && code <= 90) && string[index - 1]) {
        return `-${letter.toLowerCase()}`
      }

      return letter.toLowerCase()
    })
    .join('')
}

export default function Home() {
  const { nickname, setNickname } = useContext(PlayerContext)
  const router = useRouter()

  const join = (game) => {
    router.push(`/games/${slugify(game)}`)
  }

  return (
    <div>
      nickname:
      <input value={nickname} onChange={(e) => setNickname(e.target.value)}/>

      <button onClick={() => join('WordAndFurious')}>WordAndFurious</button>
      <button onClick={() => join('MagicNumber')}>MagicNumber</button>
      <button onClick={() => join('QuickWord')}>QuickWord</button>
    </div>
  )
}
