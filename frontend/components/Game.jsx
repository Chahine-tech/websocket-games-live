import { useEffect } from "react";

export default function Game({ join, leave, children }) {
  useEffect(
    () => {
      join()

      return () => leave()
    },
    []
  );

  return (
    <div>
      {children}
    </div>
  )
}
