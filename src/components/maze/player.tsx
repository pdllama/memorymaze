import { type Ref } from "react"
import "./styles/player.css"
import type { PlayerTransition, TransitionState, WallTransition } from "@Types/gamestate"

type PlayerProps = {
    ref: Ref<HTMLDivElement>
    transition: "none" | PlayerTransition | WallTransition
}

export default function Player({ref, transition}:PlayerProps) {

    return (
        <>
        <div className={`bg-secondary border border-white w-[20px] h-[20px] absolute ${transition} z-5`} ref={ref}>

        </div>
        </>
    )
}