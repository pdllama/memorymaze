import Button from "@Components/common/button";
import type { Difficulty } from "@Types/gamestate";
import { useState } from "react"


const difficultyAttributes:Record<Difficulty, string[]> = {
    "easy": ["10 mistakes per life", "5 lives", "Backtrack line shown", "Maze shown for up to 60 seconds", "Maze size from 5x5 to 9x9", "Relatively straight paths", "Win after level 5"],
    "medium": ["8 mistakes per life", "5 lives", "Backtrack line shown", "Maze shown for up to 45 seconds", "Maze size from 6x6 to 10x10", "Slightly winding paths", "Win after level 5"],
    "hard": ["5 mistakes per life", "3 lives", "Backtrack line not shown", "Maze shown for up to 30 seconds", "Maze size from 5x5 to 11x11", "Snaky paths", "Win after level 8"],
    "extreme": ["3 mistakes per life", "3 lives", "Backtrack line not shown", "Maze shown for up to 20 seconds", "Maze size from 6x6 to 15x15", "Very snaky paths", "Win after level 10"]
}

type DifficultySelectionProps = {
    startGame: (d:Difficulty) => void
    backToMainMenu: () => void
}

export default function DifficultySelection({startGame, backToMainMenu}:DifficultySelectionProps) {

    const [difficulty, setDifficulty] = useState<Difficulty>("easy");

    return (
        <div className="size-full max-w-[1000px] flex flex-col">
            <div className="w-full p-2 flex text-main"><h1 className="w-full text-center sm:text-start smaller-h1-sizing">Select a Difficulty</h1></div>
            <div className="w-full p-2 flex justify-center flex-col sm:flex-row gap-5 sm:gap-0">
                <div 
                    className="
                        w-full sm:w-[50%] h-fit grid grid-cols-2 place-items-center sm:flex flex-col items-center sm:items-start gap-[5px]
                    "
                >
                    <Button
                        onClick={() => setDifficulty("easy")}
                        color="secondary"
                        isToggle={true}
                        toggleActive={difficulty === "easy"}
                    >
                        <p className="text-3xl xxs:text-5xl sm:text-7xl text-black">Easy</p>
                    </Button>
                    <Button
                        onClick={() => setDifficulty("medium")}
                        color="secondary"
                        isToggle={true}
                        toggleActive={difficulty === "medium"}
                    >
                        <p className="text-3xl xxs:text-5xl sm:text-7xl text-black">Medium</p>
                    </Button>
                    <Button
                        onClick={() => setDifficulty("hard")}
                        color="secondary"
                        isToggle={true}
                        toggleActive={difficulty === "hard"}
                    >
                        <p className="text-3xl xxs:text-5xl sm:text-7xl text-black">Hard</p>
                    </Button>
                    <Button
                        onClick={() => setDifficulty("extreme")}
                        color="secondary"
                        isToggle={true}
                        toggleActive={difficulty === "extreme"}
                    >
                        <p className="text-3xl xxs:text-5xl sm:text-7xl text-black">Extreme</p>
                    </Button>
                </div>
                <div className="w-full sm:w-[50%] h-fit flex flex-col items-start px-5">
                    {difficultyAttributes[difficulty].map((att:string, i:number) => {

                        return (
                            <p className="text-2xl xxs:text-3xl sm:text-4xl text-white text-left" key={`${difficulty}-attribute-${i}`}>
                                ○ {att}
                            </p>
                        )
                    })}
                </div>
                
            </div>
            <div className="w-full h-fit flex flex-col items-center px-5 mt-5 gap-2">
                <Button 
                    onClick={() => startGame(difficulty)}
                    color={"main"}
                >
                    <p className="text-5xl">Play</p>
                </Button>
                <Button 
                    onClick={backToMainMenu}
                    type='outlined'
                    color={"main"}
                >
                    <p className="text-3xl">Back to Main Menu</p>
                </Button>
            </div>
        </div>
    )
}