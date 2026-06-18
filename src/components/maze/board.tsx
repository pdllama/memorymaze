import type { Maze, MazeBoard, Movement, Node } from "@Types/maze"
import NodeComponent from "./node"
import { getAdjacentNode, getOppositeDirection, getVisibilityPosition, isAdjacentNode, walkingIntoEdgeNode } from "@App/utils"
import { useRef, useState } from "react"
import { generate_maze } from "@App/mazegenerator"
import { type TransitionState, type BoardState } from "@Types/gamestate"
import movePlayer, { movePlayerKeyPress } from "./handlers/moveplayer"
import { useEffect } from "react"
import Player from "./player"
import { setMazeBacktrackLines, setMazeVisibility } from "./handlers/changemazeviews"


type MazeBoardProps = {
    tries: number|"inf"
    decrementTries: () => void;
    lives: number|"inf"
    decrementLife: () => void;
}

let lastKeyTime = 0;


export default function Maze({tries, decrementTries, lives, decrementLife}:MazeBoardProps) {

    const [mazeState, setMazeState] = useState<BoardState>({maze:generate_maze(10, 10, 0.9), playerPosition: "entrance"})
    const [transitionState, setTransitionState] = useState<TransitionState>({transition: "none", node_row: -1, node_col: -1, direction: "left", next_row: -1, next_col: -1})

    const playerRef = useRef<HTMLDivElement>(null)

    const {maze, playerPosition} = mazeState

    const movePlayerHandler = (n:Node, direction:Movement, exitMove: boolean) => {
        if (transitionState.transition.includes('lose-life')) {return}
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
            const board = !relevantBacktrackLine && true// (if allowed to show backtrack line)
                ? setMazeBacktrackLines(mazeState.maze.board, playerPosition, nextNode, direction) : mazeState.maze.board
            setMazeState({maze: {...mazeState.maze, board}, playerPosition: nextNode === "goal" ? "goal" : board[(nextNode).row][nextNode.col]})
        }
    }

    useEffect(() => {
        const handleMovement = (e:any) => {
            const direction:Movement|undefined = e.key === "ArrowDown" ? "down" : 
                e.key === "ArrowUp" ? "up" :
                e.key === "ArrowLeft" ? "left" :
                e.key === "ArrowRight" ? "right" : undefined;
            if (direction !== undefined) {
                
                e.preventDefault()
                if (Date.now()-lastKeyTime < 100) {return}
                
                
                lastKeyTime = Date.now()
                if (transitionState.transition.includes("lose-life")) {return}
                const nextNode = movePlayerKeyPress(playerPosition, maze, direction);
                const hasntMoved = nextNode === playerPosition;
                if (hasntMoved) {
                    if (!(playerPosition === 'goal') && !(playerPosition === "entrance") && !getVisibilityPosition(playerPosition, direction)) {
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
            const board = !relevantBacktrackLine && true// (if allowed to show backtrack line)
                ? setMazeBacktrackLines(mazeState.maze.board, playerPosition, nextNode, direction) : mazeState.maze.board
            setMazeState({maze: {...mazeState.maze, board}, playerPosition: nextNode === "goal" ? "goal" : nextNode === "entrance" ? "entrance" : board[(nextNode).row][nextNode.col]})
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

    return (
        <>
        <style>
            {`
                .correct-grid-dims {
                    grid-template-columns: repeat(${maze.numCols}, 1fr);
                    grid-template-rows: repeat(${maze.numRows}, 1fr);
                }
            `}
        </style>
        <div 
            className='size-fit box-content grid gap-[0px] correct-grid-dims'
            // style={{gridTemplateColumns: maze.numCols, gridTemplateRows: maze.numRows}}
        >
            {maze.board.map((row:Node[], i:number) => {

                

                return <>
                    {row.map((n:Node, j:number) => {
                        const isEntranceNode = j === 0 && i === maze.entrance;
                        const isExitNode = j === maze.numCols-1 && i === maze.goal;

                        const {adjacentNode, direction} = isAdjacentNode(
                            playerPosition === "entrance" || playerPosition === "goal" ? -2 : playerPosition.row,
                            playerPosition === "entrance" || playerPosition === "goal" ? -2 : playerPosition.col,
                            n.row,
                            n.col
                        )

                        // const isAdjacentNode = isEntranceNode && playerPosition === 'entrance' || 
                        //     playerPosition !== 'goal' && playerPosition !== 'entrance' && (
                        //         i === playerPosition.row && (j === playerPosition.col-1 || j === playerPosition.col+1) ||
                        //         j === playerPosition.col && (i === playerPosition.row-1 || i === playerPosition.row+1)
                        //     )
                        // const nodeDirection = isAdjacentNode && (
                        //     isEntranceNode && playerPosition === 'entrance' ? "right" : 

                        // )

                        const adjDirection = playerPosition === "entrance" && isEntranceNode ? "right" : direction
                        return <NodeComponent 
                                isLeftEdge={j === 0 && !isEntranceNode}
                                isRightEdge={j === maze.numCols-1 && !isExitNode}
                                isUpEdge={i === 0}
                                isDownEdge={i === maze.numRows-1}
                                isEntranceNode={isEntranceNode}
                                isExitNode={isExitNode}
                                isAdjacentNode={playerPosition === "entrance" && isEntranceNode ? true : adjacentNode}
                                adjDirection={adjDirection}
                                playerPosition={playerPosition}
                                movePlayer={movePlayerHandler}
                                transition={
                                    ((i === transitionState.node_row && j === transitionState.node_col) || (i === transitionState.next_row && j === transitionState.next_col && adjDirection === transitionState.direction)) ?
                                    transitionState.transition : "none"
                                }
                                transitionDirection={transitionState.direction}
                                node={n}
                                key={`node-${i}-${j}`}
                            >
                            {playerPosition === "entrance" && isEntranceNode &&
                            <div className="relative right-[100%] size-full absolute flex justify-center items-center">
                                <Player ref={playerRef} transition={transitionState.transition}/>
                            </div>
                            }
                            
                            {playerPosition === "goal" && isExitNode &&
                            <div className="relative left-[100%] size-full absolute flex justify-center items-center">
                                <Player ref={playerRef} transition={transitionState.transition}/>
                            </div>
                            }
                            {playerPosition === n &&
                                <Player ref={playerRef} transition={transitionState.transition}/>
                            }
                        </NodeComponent>
                    })}
                </>
            })}
        </div>
        </>
    )
}