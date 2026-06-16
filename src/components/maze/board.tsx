import type { Maze, Node } from "@Types/maze"
import NodeComponent from "./node"


type MazeBoardProps = {
    maze: Maze
}


export default function Maze({maze}:MazeBoardProps) {



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
            className='w-[240px] h-[200px] box-content grid gap-[0px] correct-grid-dims'
            // style={{gridTemplateColumns: maze.numCols, gridTemplateRows: maze.numRows}}
        >
            {maze.board.map((row:Node[], i:number) => {

                return <>
                    {row.map((n:Node, j:number) => {
                        return <NodeComponent 
                            isLeftEdge={!(j === 0 && i === maze.entrance) && j === 0}
                            isRightEdge={!(j === maze.numCols-1 && i === maze.goal) && j === maze.numCols-1}
                            isUpEdge={i === 0}
                            isDownEdge={i === maze.numRows-1}
                            node={n}
                        />
                    })}
                </>
            })}
        </div>
        </>
    )
}