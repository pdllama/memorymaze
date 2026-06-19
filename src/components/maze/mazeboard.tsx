import type { Maze, Node, Movement } from "@Types/maze"
import NodeComponent from "./node"
import { isAdjacentNode } from "@App/utils"
import Player from "./player"
import type { Ref } from "react"
import type { TransitionState } from "@Types/gamestate"
import React from "react"

type MazeBoardDisplayProps = {
    maze: Maze
}

type OptionalProps = Partial<{
    playerPosition: "entrance"|"goal"|Node,
    playerRef: Ref<HTMLDivElement>,
    transitionState: TransitionState,
    hidePlayer: boolean,
    movePlayerHandler: (n: Node, direction: Movement, exitMove: boolean) => void
    shownMazeState: "shown" | "fading" | "not-shown"
}>

type TotalProps = MazeBoardDisplayProps & OptionalProps

export default function MazeBoardDisplay({
    maze, 
    playerPosition='entrance', playerRef=null, shownMazeState="shown",
    transitionState={transition: 'none', node_col: -2, node_row: -2, next_row: -2, next_col: -2, direction: 'left'}, 
    hidePlayer=false, movePlayerHandler=() => {}
}:TotalProps) {

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
            className='box-content grid gap-[0px] correct-grid-dims size-full aspect-square max-w-[100cqh] max-h-[100cqw] relative' 
            // style={{gridTemplateColumns: maze.numCols, gridTemplateRows: maze.numRows}}
        >
            {maze.board.map((row:Node[], i:number) => {

                

                return <React.Fragment key={`row-${i}`}>
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
                                    ((i === transitionState.node_row && j === transitionState.node_col) || (i === transitionState.next_row && j === transitionState.next_col)) ?
                                    transitionState.transition : "none"
                                }
                                transitionDirection={transitionState.direction}
                                node={n}
                                shownMazeState={shownMazeState}
                                key={`node-${i}-${j}`}
                            >
                            {!hidePlayer && playerPosition === "entrance" && isEntranceNode &&
                            <div className="relative right-[100%] size-full absolute flex justify-center items-center">
                                <Player ref={playerRef} transition={transitionState.transition} classes="w-[50%] h-[50%] absolute"/>
                            </div>
                            }
                            
                            {!hidePlayer && playerPosition === "goal" && isExitNode &&
                            <div className="relative left-[100%] size-full absolute flex justify-center items-center">
                                <Player ref={playerRef} transition={transitionState.transition} classes="w-[50%] h-[50%] absolute"/>
                            </div>
                            }
                            {!hidePlayer && playerPosition === n &&
                                <Player ref={playerRef} transition={transitionState.transition} classes="w-[50%] h-[50%] absolute"/>
                            }
                        </NodeComponent>
                    })}
                </React.Fragment>
            })}
        </div>
        </>
    )
}