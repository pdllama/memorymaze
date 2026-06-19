

// The game section of the page, which holds the game window

import { useEffect, useState } from "react"
import Maze from "@Components/maze/mazefunctionality"
import type { GameState, SessionConfig } from "@Types/gamestate"
import Player from "@Components/maze/player"
import Button from "@Components/common/button"
import Timer from "@Components/maze/timer"
import CountDown from "@Components/maze/countdown"

type GameSectionProps = {
    sessionConfig: SessionConfig,
    isCustom: boolean,
    backToMainMenu: () => void
    backToCustomMenu: () => void
}

export default function GameSection({sessionConfig, isCustom, backToMainMenu, backToCustomMenu}:GameSectionProps) {

    const [gameState, setGameState] = useState<GameState>({
        display: "level-display",
        level: 1,
        lives: sessionConfig.maxLives,
        tries: sessionConfig.maxTries,
        completionTimes: [],
        currNumRows: sessionConfig.startRows,
        currNumCols: sessionConfig.startCols
    })

    const [timerActive, setTimerActive] = useState<boolean>(false)
    const [shownMazeState, setShownMazeState] = useState<("shown" | "fading" | "not-shown")>("shown") // shown, fading, not-shown

    const decrementTries = () => {
        setGameState({...gameState, tries: gameState.tries === "inf" ? "inf" : gameState.tries-1})
    }

    const decrementLife = () => {
        setGameState({...gameState, lives: gameState.lives === "inf" ? "inf" : gameState.lives-1, tries: sessionConfig.maxTries, display: gameState.lives === 1 ? "game-over" : gameState.display})
    }

    useEffect(() => {
        if (gameState.display === "level-display") {
            setTimeout(() => {
                setGameState({...gameState, display: 'show-maze'})
            }, 3000)
        }
    }, [gameState.display])

    const go_next_level = () => {
        setGameState({
            ...gameState, display: "level-display", level: gameState.level+1, 
            currNumRows: sessionConfig.incrementRowsCols ? gameState.currNumRows+1 : gameState.currNumRows,
            currNumCols: sessionConfig.incrementRowsCols ? gameState.currNumCols+1 : gameState.currNumCols
        })
        setTimerActive(false);
        setShownMazeState("shown");
    }

    const retry = () => {
        setGameState({
            display: "level-display",
            level: 1,
            lives: sessionConfig.maxLives,
            tries: sessionConfig.maxTries,
            completionTimes: [],
            currNumRows: sessionConfig.startRows,
            currNumCols: sessionConfig.startCols
        })
        setTimerActive(false);
        setShownMazeState("shown");
    }

    const averageCompletionTime = gameState.completionTimes.length > 0 ? gameState.completionTimes.reduce((prev, curr) => prev+curr, 0)/gameState.completionTimes.length : 0

    return (
        <div 
            className='w-full max-w-[1200px] h-full p-[10px] flex flex-col justify-start items-center relative overflow-hidden' 
            style={{containerType: "size"}}
        >
            {gameState.display === "level-display" ? 
            <>
                <div className='size-full h-[100%] flex justify-center items-center gap-[25px]'>
                    <h1 className="text-white">Level {gameState.level}</h1>
                    
                </div>
            </> : 
            <>
            <div className={`flex size-full flex-col justify-start items-center gap-[40px] relative ${(gameState.display === "level-complete" || gameState.display === "session-complete" || gameState.display === "game-over") ?  'blur-md' : ''}`}>
                <div className={`flex flex-col mdlg:flex-row h-fit w-full gap-[10px] mdlg:gap-0`}>
                    <div className='size-full mdlg:size-fit flex justify-center items-center text-white gap-[20px]'>
                        <h2 className="text-nowrap">Level {gameState.level}</h2>
                        <div className='size-fit flex justify-center items-center gap-[3px]'>
                            <div className='size-[40px] w-[50px] relative h-full flex justify-center items-center'>
                                <Player classes="size-full"/>
                                
                            </div>
                        <p className='text-[36px] lg:text-[48px]'>x{gameState.lives === "inf" ? "∞" : gameState.lives}</p>
                        <div className="ml-5">
                        {!timerActive ? 
                            <CountDown startTime={sessionConfig.timeToSee} countDown={shownMazeState !== "not-shown"} action={() => setShownMazeState("not-shown")} action1Second={() => setShownMazeState("fading")}/> : 
                            <Timer gameState={gameState.display} passTimeUp={(n:number) => setGameState({...gameState, completionTimes: [...gameState.completionTimes, n]})} timerActive={timerActive} closeTimer={() => setTimerActive(false)}/>
                        }
                        </div>
                        </div>
                    </div>
                    {sessionConfig.maxTries !== "inf" ? 
                    <div className='w-full h-full flex justify-center mdlg:justify-end items-center gap-[5px] flex-wrap'>
                        {[...Array(gameState.tries)].map((_:any, i:number) => {
                            
                            return (
                                <img src="icons/red heart.png" width="50px" height="50px"/>
                            )
                        })}
                        {[...Array(sessionConfig.maxTries-(gameState.tries as number))].map((_:any, i:number) => {

                            return (
                                <img src="icons/empty heart.png" width="50px" height="50px"/>
                            )
                        })}
                    </div> : 
                    <div className='w-full h-full flex justify-center mdlg:justify-end items-center text-white'>
                        <p className="text-nowrap text-[36px] lg:text-[48px]">Infinite Tries</p>
                    </div>
                    }
                </div>
                <Maze 
                    tries={gameState.tries} 
                    decrementTries={decrementTries} 
                    lives={gameState.lives}
                    decrementLife={decrementLife}
                    numRows={gameState.currNumRows}
                    numCols={gameState.currNumCols}
                    pathSnakiness={sessionConfig.path_snakiness}
                    backtrackLineShown={sessionConfig.backtrackLine}
                    timeToShow={sessionConfig.timeToSee}
                    goToGameplayState={() => setGameState((value:GameState) => {return {...value, display: "gameplay"}})}
                    completeLevel={() => setGameState({...gameState, display: gameState.level === sessionConfig.maxLevel ? "session-complete" : "level-complete"})}
                    startTimer={() => setTimerActive(true)}
                    shownMazeState={shownMazeState}
                    isGameOver={gameState.display === "game-over"}
                    setShownMazeState={(mazeState:"shown"|"fading"|"not-shown") => setShownMazeState(mazeState)}
                />
                <div className="flex w-full p-1 flex-col-reverse md:flex-row xxs:items-center relative flex-1">
                    <div className="flex justify-center items-center h-fit w-full md:w-[25%] md:gap-0 gap-2">
                        <Button
                            onClick={backToMainMenu}
                            type="outlined"
                        >
                            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-nowrap md:text-wrap">Back to Main Menu</p>
                        </Button>
                        {isCustom &&
                        <Button
                            onClick={backToCustomMenu}
                            type="outlined"
                            classes="md:hidden visible"
                        >
                            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-nowrap md:text-wrap">Back to Customize Menu</p>
                        </Button>
                        }
                    </div>
                    <div className="w-full flex items-center xxs:justify-center">
                        <p className="text-[48px] text-white">{gameState.display === "show-maze" ? "Memorize" : "Traverse"} the Maze!</p>
                    </div>
                    <div className="flex justify-start items-center w-[25%]">
                        {isCustom &&
                        <Button
                            onClick={backToCustomMenu}
                            type="outlined"
                            classes="max-md:hidden md:visible"
                        >
                            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-nowrap md:text-wrap">Back to Customize Menu</p>
                        </Button>
                        }
                    </div>
                    
                </div>
            </div>
            
            {gameState.display === "level-complete" &&
            <div className="absolute inset-0 size-full flex justify-center items-center">
                <div className="bg-secondary rounded-sm w-[80%] min-w-fit max-w-[800px] z-5 min-h-[fit] max-h-[700px] px-[10px] xxs:px-[30px] flex flex-col items-center py-[50px] gap-25 border border-white border-3">
                    <div className='flex flex-col items-center gap-15 size-fit'>
                    <p className="text-[48px] md:text-[72px] lg:text-[96px] text-main">Level {gameState.level} Complete</p>
                    <p className="text-[24px] md:text-[36px] lg:text-[48px] text-main">
                        Completed in: {
                        gameState.completionTimes[gameState.completionTimes.length-1] > 60 ? 
                            `${Math.floor(gameState.completionTimes[gameState.completionTimes.length-1]/60)} minute${Math.floor(gameState.completionTimes[gameState.completionTimes.length-1]/60) === 1 ? "" : "s"}, 
                            ${Math.trunc((gameState.completionTimes[gameState.completionTimes.length-1]%60)*1000)/1000} seconds` : 
                            `${Math.trunc(gameState.completionTimes[gameState.completionTimes.length-1]*1000)/1000} seconds`
                        }
                    </p>
                    </div>
                    <div className='flex flex-col items-center gap-5 size-fit'>

                        <Button
                            onClick={go_next_level}
                        >
                            <p className="text-[36px] md:text-[48px] lg:text-[72px]">Next Level</p>
                        </Button>
                        <Button
                            onClick={backToMainMenu}
                            type="outlined"
                        >
                            <p className="text-[24px] md:text-[36px] lg:text-[48px]">Back to Main Menu</p>
                        </Button>
                    </div>
                </div>
            </div>
            }
            {gameState.display === "session-complete" &&
            <div className="absolute inset-0 size-full flex justify-center items-center">
                <div className="bg-secondary rounded-sm w-[80%] min-w-fit max-w-[800px] z-5 min-h-[fit] max-h-[700px] px-[10px] xxs:px-[30px] flex flex-col items-center py-[50px] gap-25 border border-white border-3">
                    <div className='flex flex-col items-center gap-15 size-fit'>
                    <p className="text-[48px] md:text-[72px] lg:text-[96px] text-main">You completed all the levels!</p>
                    <p className="text-[24px] md:text-[36px] lg:text-48px] text-main">
                        Average Completion Time: {averageCompletionTime > 60 ? `${Math.floor(averageCompletionTime/60)} minute${Math.floor(averageCompletionTime/60) === 1 ? "" : "s"}, ${Math.trunc((averageCompletionTime%60)*1000)/1000} seconds` : `${Math.trunc(averageCompletionTime*1000)/1000} seconds`}
                    </p>
                    </div>
                    <div className='flex flex-col items-center gap-5 size-fit'>
                        {isCustom &&
                        <Button
                            onClick={backToCustomMenu}
                        >
                            <p className="text-[24px] md:text-[36px] lg:text-[48px]">Back to Customize Menu</p>
                        </Button>
                        }
                        <Button
                            onClick={backToMainMenu}
                            type={isCustom ? "outlined" : "filled"}
                        >
                            <p className="text-[24px] md:text-[36px] lg:text-[48px]">Back to Main Menu</p>
                        </Button>
                    </div>
                </div>
            </div>
            }
            {gameState.display === "game-over" &&
            <div className="absolute inset-0 size-full flex justify-center items-center">
                <div className="bg-secondary rounded-sm w-[80%] min-w-fit max-w-[800px] z-5 min-h-[fit] max-h-[700px] px-[10px] xxs:px-[30px] flex flex-col items-center py-[50px] gap-25 border border-white border-3">
                    <div className='flex flex-col items-center gap-15 size-fit'>
                        <p className="text-[48px] md:text-[72px] lg:text-[96px] text-main">Game Over!</p>
                    </div>
                    <div className='flex flex-col items-center gap-5 size-fit'>

                        <Button
                            onClick={retry}
                        >
                            <p className="text-[36px] md:text-[48px] lg:text-[72px]">Try Again</p>
                        </Button>
                        <Button
                            onClick={backToMainMenu}
                            type="outlined"
                        >
                            <p className="text-[24px] md:text-[36px] lg:text-[48px]">Back to Main Menu</p>
                        </Button>
                    </div>
                </div>
            </div>
            }
            </>
            }
        </div>
    )
}