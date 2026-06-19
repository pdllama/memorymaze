import type { SessionConfig } from "@Types/gamestate"
import { useState } from "react"
import Button from "@Components/common/button"


type CustomSelectionProps = {
    backToMainMenu: () => void,
    setSessionConfig: (sc:SessionConfig) => void
    sessionConfig: SessionConfig
    startGame: () => void
}

export default function CustomSelection({startGame, backToMainMenu, sessionConfig, setSessionConfig}:CustomSelectionProps) {

    return (
        <div className="size-full max-w-[1000px] gap-3 flex flex-col items-center">
            <div className="w-full p-4 flex text-main"><h1 className="w-full text-center custom-selection-h1-sizing">Level Customization</h1></div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center w-full max-w-[700px] gap-[20px]">
                <div className="flex size-full justify-center items-center gap-2 text-white">
                    <p className="text-[36px]">Mistakes per Life:</p>
                    <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.maxTries === "inf" ? "∞" : sessionConfig.maxTries}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxTries === "inf" ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxTries === "inf"}
                                onClick={sessionConfig.maxTries === "inf" ? undefined : () => setSessionConfig({...sessionConfig, maxTries: sessionConfig.maxTries === 10 ? "inf" : (sessionConfig.maxTries as number)+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxTries === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxTries === 1}
                                onClick={sessionConfig.maxTries === 1 ? undefined : () => setSessionConfig({...sessionConfig, maxTries: sessionConfig.maxTries === "inf" ? 10 : (sessionConfig.maxTries as number)-1})}
                            >
                                ⌄
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex size-full justify-center items-center gap-2 text-white">
                    <p className="text-[36px]">Total Lives:</p>
                    <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.maxLives === "inf" ? "∞" : sessionConfig.maxLives}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLives === "inf" ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLives === "inf"}
                                onClick={sessionConfig.maxLives === "inf" ? undefined : () => setSessionConfig({...sessionConfig, maxLives: sessionConfig.maxLives === 10 ? "inf" : (sessionConfig.maxLives as number)+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLives === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLives === 1}
                                onClick={sessionConfig.maxLives === 1 ? undefined : () => setSessionConfig({...sessionConfig, maxLives: sessionConfig.maxLives === "inf" ? 10 : (sessionConfig.maxLives as number)-1})}
                            >
                                ⌄
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex size-full justify-center items-center gap-2 text-white">
                    <p className="text-[36px]">Maze Shown For:</p>
                    <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.timeToSee}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.timeToSee === 60 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.timeToSee === 60}
                                onClick={sessionConfig.timeToSee === 60 ? undefined : () => setSessionConfig({...sessionConfig, timeToSee: sessionConfig.timeToSee+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.timeToSee === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.timeToSee === 1}
                                onClick={sessionConfig.timeToSee === 1 ? undefined : () => setSessionConfig({...sessionConfig, timeToSee: sessionConfig.timeToSee-1})}
                            >
                                ⌄
                            </button>
                        </div>
                        
                    </div>
                    <p className="text-[36px]">s</p>
                </div>
                <div className="flex size-full justify-center items-center gap-2 text-white ">
                    <p className="text-[36px]">Maze Size:</p>
                    <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.startRows}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.startRows === 15 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.startRows === 15}
                                onClick={sessionConfig.startRows === 15 ? undefined : () => setSessionConfig({...sessionConfig, startRows: sessionConfig.startRows+1, startCols: sessionConfig.startCols+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.startRows === 5 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.startRows === 5}
                                onClick={sessionConfig.startRows === 5 ? undefined : () => setSessionConfig({...sessionConfig, startRows: sessionConfig.startRows-1, startCols: sessionConfig.startCols-1})}
                            >
                                ⌄
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center gap-2 text-white">
                    <p className="text-[36px]">Win at Level:</p>
                    <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.maxLevel === "inf" ? "∞" : sessionConfig.maxLevel}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLevel === "inf" ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLevel === "inf"}
                                onClick={sessionConfig.maxLevel === "inf" ? undefined : () => setSessionConfig({...sessionConfig, maxLevel: sessionConfig.maxLevel === 25 ? "inf" : (sessionConfig.maxLevel as number)+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLevel === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLevel === 1}
                                onClick={sessionConfig.maxLevel === 1 ? undefined : () => setSessionConfig({...sessionConfig, maxLevel: sessionConfig.maxLevel === "inf" ? 25 : (sessionConfig.maxLevel as number)-1})}
                            >
                                ⌄
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex w-full h-full justify-center items-center gap-4 text-white">
                    <p className="text-[24px]">Backtrack Line Shown:</p>
                    <input 
                        type="checkbox" 
                        checked={sessionConfig.backtrackLine} 
                        onChange={() => setSessionConfig({...sessionConfig, backtrackLine: !sessionConfig.backtrackLine})}
                        className="w-[30px] h-[30px] hover:cursor-pointer"
                    />
                    {/* <div className="h-[50px] w-fit min-w-[70px] flex items-center border border-white rounded-sm px-[2px] pl-[10px]">
                        <p className="text-[36px] min-w-[30px]">{sessionConfig.maxLevel === "inf" ? "∞" : sessionConfig.maxLevel}</p>
                        <div className="flex flex-col size-full">
                            <button
                                className={`border-none p-[0.5px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLevel === "inf" ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLevel === "inf"}
                                onClick={sessionConfig.maxLevel === "inf" ? undefined : () => setSessionConfig({...sessionConfig, maxLevel: sessionConfig.maxLevel === 25 ? "inf" : (sessionConfig.maxLevel as number)+1})}
                            >
                                ⌃
                            </button>
                            <button
                                className={`border-none p-[0.2px] hover:cursor-pointer hover-bg-secondary ${sessionConfig.maxLevel === 1 ? "opacity-50 pointer-events-none" : ""}`}
                                disabled={sessionConfig.maxLevel === 1}
                                onClick={sessionConfig.maxLevel === 1 ? undefined : () => setSessionConfig({...sessionConfig, maxLevel: sessionConfig.maxLevel === "inf" ? 25 : (sessionConfig.maxLevel as number)-1})}
                            >
                                ⌄
                            </button>
                        </div>
                    </div> */}
                </div>
                
            </div>
            <div className="flex flex-col gap-2 text-white max-w-[700px] w-full p-4">
                <p className="w-full text-start text-[36px]">Path Snakiness</p>
                <p className="w-full text-start text-[18px]">Determines the chance that the correct path snakes around or stays relatively straight </p>
                <div className="flex gap-1 justify-center items-center w-full">
                    <img src="icons/squiggly-arrow.png" width="40px" height="40px"/>
                    <input className="w-full" type="range" min="0.1" max="0.9" step="0.025" value={sessionConfig.path_snakiness} onChange={(e:any) => setSessionConfig({...sessionConfig, path_snakiness: e.target.value})}/>
                    <img src="icons/straight-arrow.png" width="40px" height="40px" className="rotate-270"/>
                </div>
            </div>
            
            <div className="size-full flex sm:flex-row flex-col justify-center items-center gap-[10px]">
                <Button
                    onClick={startGame}
                >
                    <p className="text-[24px]">Start Game</p>
                </Button>
                <Button
                    onClick={backToMainMenu}
                    type="outlined"
                >
                    <p className="text-[18px]">Back to Main Menu</p>
                </Button>
            </div>
        </div>
    )
}