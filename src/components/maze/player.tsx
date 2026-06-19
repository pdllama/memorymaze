import { type Ref } from "react"
import "./styles/player.css"
import type { PlayerTransition, WallTransition } from "@Types/gamestate"

type PlayerProps = {
    ref: Ref<HTMLDivElement>
    transition: "none" | PlayerTransition | WallTransition
    classes: string
}

export default function Player({ref=null, transition, classes=""}:Partial<PlayerProps>) {

    return (
        <>
        <div className={`bg-secondary border border-white min-w-[10px] min-h-[10px] aspect-square ${transition} z-5 ${classes}`} ref={ref}>

        </div>
        </>
    )
}