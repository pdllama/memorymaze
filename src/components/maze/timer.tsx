import type { PlaythroughScreen } from "@Types/gamestate"
import { useEffect, useState } from "react"


type TimerProps = {
    gameState:PlaythroughScreen
    passTimeUp: (time:number) => void
    timerActive: boolean,
    closeTimer: () => void
}

export default function Timer({gameState, passTimeUp, timerActive, closeTimer}:TimerProps) {

    const [startTime, setStartTime] = useState<number>(Date.now())
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    useEffect(() => {
        if (gameState === 'level-complete' || gameState === "session-complete" || gameState === "game-over") {
            closeTimer()
            if (gameState === "level-complete" || gameState === "session-complete") {
                passTimeUp(elapsedTime)
            }
        } 
    }, [gameState])

    useEffect(() => {
        if (timerActive) {setStartTime(Date.now())}
    }, [timerActive])

    useEffect(() => {
        if (timerActive) {
            const interval = setInterval(() => {
                setElapsedTime((Date.now() - startTime)/1000)
            }, 50)
            return () => clearInterval(interval)
        }
    }, [timerActive, elapsedTime])

    

    return (
        <p className="text-[24px] text-white">{elapsedTime}s</p>
    )

}