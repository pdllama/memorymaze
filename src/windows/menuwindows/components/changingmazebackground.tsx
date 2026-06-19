import { generate_maze } from "@App/mazegenerator"
import { useEffect, useState } from "react"
import "./changingmazebackground.css"
import MazeBoardDisplay from "@Components/maze/mazeboard"

export default function ChangingMazeBackground() {


    const [maze, setMaze] = useState(generate_maze(15, 15, 0.5, true))

    useEffect(() => {
        setTimeout(() => {
            setMaze(generate_maze(15, 15, 0.5, true))
        }, 10000)
    }, [maze])

    return (
        <div className="size-full flex justify-center items-center overflow-hidden scale-250 xxs:scale-200 sm:scale-150 smooth-fade aspect-square max-w-[100cqh]">
            <MazeBoardDisplay 
                maze={maze}
                hidePlayer={true}
            />
        </div>
    )
}