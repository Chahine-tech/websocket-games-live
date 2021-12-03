import { useContext } from "react";
import { SocketContext } from "../../contexts/socket";

export default function QuickWord() {
    const { socket } = useContext(SocketContext)

    return (
        <div>
            QuickWord
        </div>
    )
}