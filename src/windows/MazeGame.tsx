import { useEffect, useRef, useState } from "react"
import { DifficultyPresets, type Difficulty, type GameScreen, type SessionConfig } from "@Types/gamestate"
import TitleScreen from "./menuwindows/title";
import DifficultySelection from "./menuwindows/difficultyselection";
import GameSection from "./GameSection";
import CustomSelection from "./menuwindows/customselection";

export default function MazeGame({}) {

    const GameScreenRef = useRef<GameScreen>("title");

    const [gameScreen, setGameScreen] = useState<GameScreen>("title");
    const [sessionConfig, setSessionConfig] = useState<SessionConfig>({
        maxLevel: 'inf',
        maxLives: 'inf',
        maxTries: 'inf',
        startRows: 5,
        startCols: 5,
        path_snakiness: 0.5,
        timeToSee: 60, 
        backtrackLine: true,
        incrementRowsCols: true
    })
    

    const startGameMain = (d:Difficulty) => {
        setSessionConfig(DifficultyPresets[d])
        setGameScreen("game-screen")
    }

    const startGameCustom = () => {
        setSessionConfig({...sessionConfig, incrementRowsCols: false})
        setGameScreen("game-screen")
    }

    const wasCustom = GameScreenRef.current === "custom-selection"

    useEffect(() => {
        GameScreenRef.current = gameScreen
    }, [gameScreen])

    return (
        <div className={`w-full ${gameScreen === "game-screen" ? "h-[750px]" : ""} max-h-[850px] flex flex-col justify-center items-center p-5`}>
            {gameScreen === "title" ? 
                <TitleScreen goToDifficultySelection={() => setGameScreen("difficulty-selection")} goToCustomSelection={() => setGameScreen("custom-selection")}/> : 
            gameScreen === "difficulty-selection" ? 
                <DifficultySelection startGame={startGameMain} backToMainMenu={() => setGameScreen("title")}/> :
            gameScreen === "game-screen" ?
                <GameSection 
                    sessionConfig={sessionConfig}
                    isCustom={wasCustom}
                    backToMainMenu={() => setGameScreen("title")}
                    backToCustomMenu={() => setGameScreen("custom-selection")}
                />
            : gameScreen === "custom-selection" &&
                <CustomSelection
                    setSessionConfig={(sc:SessionConfig) => setSessionConfig(sc)}
                    startGame={startGameCustom}
                    sessionConfig={sessionConfig}
                    backToMainMenu={() => setGameScreen("title")}
                />
            }
        </div>
    )
}