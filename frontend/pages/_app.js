import 'tailwindcss/tailwind.css'
import { useState } from "react";
import { PlayerContext } from "../contexts/player";

function MyApp({ Component, pageProps }) {
  const [nickname, setNickname] = useState("")

  return (
    <PlayerContext.Provider value={{ nickname, setNickname }}>
      <Component {...pageProps} />
    </PlayerContext.Provider>
  )
}

export default MyApp
