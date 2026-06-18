

// The game section of the page, which holds the game window

import { generate_maze } from "@App/mazegenerator"
import { useEffect, useState } from "react"
import Maze from "@Components/maze/board"
import type { GameState } from "@Types/gamestate"

export default function GameSection({}) {

    const [gameState, setGameState] = useState<GameState>({
        level: 1,
        lives: 3,
        tries: 3,
    })

    const decrementTries = () => {
        setGameState({...gameState, tries: (gameState.tries as number)-1})
    }

    const decrementLife = () => {
        setGameState({...gameState, lives: (gameState.lives as number)-1, tries: 3})
    }

    useEffect(() => {

    }, [])

    return (
        <div className='w-full h-[750px] p-[10px] flex flex-col justify-center items-center'>
            <div>tries: {gameState.tries}</div>
            <div>lives: {gameState.lives}</div>
            <Maze 
                tries={gameState.tries} 
                decrementTries={decrementTries} 
                lives={gameState.lives}
                decrementLife={decrementLife}
            />
        </div>
    )
}