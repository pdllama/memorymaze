

// The game section of the page, which holds the game window

import { generate_maze } from "@App/mazegenerator"
import { useEffect, useState } from "react"
import Maze from "@Components/maze/board"

export default function GameSection({}) {

    const [maze, setMaze] = useState(generate_maze(10, 10, 0.9))

    useEffect(() => {

    }, [])

    return (
        <div className='w-full h-[750px] p-[10px] flex justify-center items-center'>
            <Maze maze={maze}/>
        </div>
    )
}