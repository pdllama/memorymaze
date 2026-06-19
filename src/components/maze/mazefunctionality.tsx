import type { Maze, Movement, Node } from "@Types/maze"
import { getAdjacentNode, getVisibilityPosition} from "@App/utils"
import { useRef, useState } from "react"
import { generate_maze } from "@App/mazegenerator"
import { type TransitionState, type BoardState } from "@Types/gamestate"
import movePlayer, { movePlayerKeyPress } from "./handlers/moveplayer"
import { useEffect } from "react"
import { setMazeBacktrackLines, setMazeVisibility } from "./handlers/changemazeviews"
import MazeBoardDisplay from "./mazeboard"


type MazeBoardProps = {
    tries: number|"inf"
    decrementTries: () => void;
    decrementLife: () => void;
    numRows: number,
    numCols: number,
    pathSnakiness: number,
    backtrackLineShown:boolean
    isGameOver:boolean
    goToGameplayState: () => void
    completeLevel: () => void
    startTimer: () => void
    shownMazeState: "shown" | "fading" | "not-shown"
    setShownMazeState: (mazeState:"shown" | "fading" | "not-shown") => void
}

let lastKeyTime = 0;


export default function Maze({tries, decrementTries, decrementLife, numRows, numCols, pathSnakiness, backtrackLineShown, isGameOver, goToGameplayState, completeLevel, startTimer, shownMazeState, setShownMazeState}:MazeBoardProps) {

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
    const [mazeState, setMazeState] = useState<BoardState>({maze:generate_maze(numRows, numCols, pathSnakiness), playerPosition: "entrance"})
    const [transitionState, setTransitionState] = useState<TransitionState>({transition: "none", node_row: -1, node_col: -1, direction: "left", next_row: -1, next_col: -1})

    const shownMazeStateRef = useRef<("shown" | "fading" | "not-shown")>(shownMazeState)
    const playerRef = useRef<HTMLDivElement>(null)

    const {maze, playerPosition} = mazeState

    const goToFadingMazeState = () => {
        setShownMazeState("fading")
    }
    const goToNotShownMazeState = () => {
        setShownMazeState("not-shown");
        goToGameplayState()
    }

    const movePlayerHandler = (n:Node, direction:Movement, exitMove: boolean) => {
        if (transitionState.transition.includes('lose-life') || isGameOver) {return}
        const nextNode = movePlayer(playerPosition, n, direction, exitMove);
        const hasntMoved = nextNode === playerPosition;
        if (hasntMoved) {
            if (!(playerPosition === 'goal') && !getVisibilityPosition(playerPosition, direction)) {
                let lostLife = false;
                const supposedNextNode = getAdjacentNode(mazeState.maze.board, playerPosition, direction, mazeState.maze.numRows, mazeState.maze.numCols);
                if (supposedNextNode) {
                    decrementTries();
                    if (tries === 1) {
                        lostLife = true;
                    }
                }
                
                setTransitionState({
                    ...transitionState, transition: lostLife ? `lose-life-${direction}` : `hit-wall-${direction}${!supposedNextNode ? "" : "-reveal"}`, 
                    node_row: supposedNextNode ? playerPosition.row : -1, node_col: supposedNextNode ? playerPosition.col : -1, direction, 
                    next_row: supposedNextNode ? supposedNextNode.row : -1, next_col: supposedNextNode ? supposedNextNode.col : -1
                })
                const board = !supposedNextNode ? mazeState.maze.board : setMazeVisibility(mazeState.maze.board, playerPosition, supposedNextNode, direction)
                setMazeState({maze: {...mazeState.maze, board}, playerPosition: board[playerPosition.row][playerPosition.col]})
                
            }
        } else {
            setTransitionState({...transitionState, transition: `move-${direction}`, node_row: -1, node_col: -1, next_row: -1, next_col: -1})
            const relevantBacktrackLine = nextNode === "goal" ? true : direction === "up" ? nextNode.backtrackDownShown : direction === "down" ? nextNode.backtrackUpShown : direction === "left" ? nextNode.backtrackRightShown : nextNode.backtrackLeftShown
            const board = !relevantBacktrackLine && backtrackLineShown
                ? setMazeBacktrackLines(mazeState.maze.board, playerPosition, nextNode, direction) : mazeState.maze.board
            setMazeState({maze: {...mazeState.maze, board}, playerPosition: nextNode === "goal" ? "goal" : board[(nextNode).row][nextNode.col]})
        }
        if (shownMazeState === "shown") {
            goToFadingMazeState()
            clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
            startTimer()
        }
    }

    useEffect(() => {
        if (playerPosition === "goal") {
            completeLevel()
            return;
        }
        const handleMovement = (e:any) => {
            const direction:Movement|undefined = e.key === "ArrowDown" ? "down" : 
                e.key === "ArrowUp" ? "up" :
                e.key === "ArrowLeft" ? "left" :
                e.key === "ArrowRight" ? "right" : undefined;
            if (direction !== undefined) {
                
                e.preventDefault()
                if (Date.now()-lastKeyTime < 100) {return}
                
                
                lastKeyTime = Date.now()
                if (transitionState.transition.includes("lose-life") || isGameOver) {return}
                const nextNode = movePlayerKeyPress(playerPosition, maze, direction);
                const hasntMoved = nextNode === playerPosition;
                if (hasntMoved) {
                    if (!(playerPosition === "entrance") && !getVisibilityPosition(playerPosition, direction)) {
                        let lostLife = false;
                        const supposedNextNode = getAdjacentNode(mazeState.maze.board, playerPosition, direction, mazeState.maze.numRows, mazeState.maze.numCols);
                        if (supposedNextNode) {
                            decrementTries();
                            if (tries === 1) {
                                lostLife = true;
                            }
                        }
                        
                        setTransitionState({
                            ...transitionState, transition: lostLife ? `lose-life-${direction}` : `hit-wall-${direction}${!supposedNextNode ? "" : "-reveal"}`, 
                            node_row: supposedNextNode ? playerPosition.row : -1, node_col: supposedNextNode ? playerPosition.col : -1, direction, 
                            next_row: supposedNextNode ? supposedNextNode.row : -1, next_col: supposedNextNode ? supposedNextNode.col : -1
                        })
                        const board = !supposedNextNode ? mazeState.maze.board : setMazeVisibility(mazeState.maze.board, playerPosition, supposedNextNode, direction)
                        setMazeState({maze: {...maze, board}, playerPosition: board[playerPosition.row][playerPosition.col]})
                    }
                } else {
                    // setTransitionState({...transitionState, transition: `move-${direction}`, node_row: -1, node_col: -1, next_row: -1, next_col: -1})
                    // setMazeState({...mazeState, playerPosition: nextNode})
                    setTransitionState({...transitionState, transition: `move-${direction}`, node_row: -1, node_col: -1, next_row: -1, next_col: -1})
                    const relevantBacktrackLine = (nextNode === "entrance" || nextNode === "goal") ? true : direction === "up" ? nextNode.backtrackDownShown : direction === "down" ? nextNode.backtrackUpShown : direction === "left" ? nextNode.backtrackRightShown : nextNode.backtrackLeftShown
                    const board = !relevantBacktrackLine && backtrackLineShown
                        ? setMazeBacktrackLines(mazeState.maze.board, playerPosition, nextNode, direction) : mazeState.maze.board
                    setMazeState({maze: {...mazeState.maze, board}, playerPosition: nextNode === "goal" ? "goal" : nextNode === "entrance" ? "entrance" : board[(nextNode).row][nextNode.col]})
                }
                if (shownMazeStateRef.current === "shown") {
                    goToFadingMazeState()
                    clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
                    startTimer()
                }
            }
        }
        window.addEventListener("keydown", handleMovement)
        return () => window.removeEventListener('keydown', handleMovement)
    }, [playerPosition])


    useEffect(() => {
        if (transitionState.transition.includes("lose-life")) {
            setTimeout(() => {
                decrementLife()
                setTransitionState({...transitionState, transition: 'none', next_col: -1, next_row: -1, node_col: -1, node_row: -1})
                setMazeState({...mazeState, playerPosition: 'entrance'})
            }, 2000)
        }
    }, [transitionState.transition])

    // useEffect(() => {
    //     if (timeToShow !== 'inf') {
    //         timeoutRef.current = setTimeout(() => {
    //             goToFadingMazeState()
    //         }, timeToShow*1000 - 1000)
    //     }
    //     return () => clearTimeout(timeoutRef.current as ReturnType<typeof setTimeout>)
    // }, [])

    useEffect(() => {
        if (shownMazeState === "fading") {
            setTimeout(() => {
                goToNotShownMazeState()
                startTimer()
            }, 1000)
        }
        shownMazeStateRef.current = shownMazeState
    }, [shownMazeState])

    return (
        <div className="flex justify-center items-start size-[100%] min-h-[350px] max-h-[650px] px-[20px] sm:px-[10%] xxs:mb-0 mb-[-400px]" style={{containerType: "size"}}>
        
            <MazeBoardDisplay 
                maze={maze}
                playerPosition={playerPosition}
                playerRef={playerRef}
                transitionState={transitionState}
                movePlayerHandler={movePlayerHandler}
                shownMazeState={shownMazeState}
                
            />
       
        </div>
    )
}