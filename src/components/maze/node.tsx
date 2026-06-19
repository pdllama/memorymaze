import type { Movement, Node } from "@Types/maze"
import "./styles/node.css"
import { useEffect, useRef, type ReactNode } from "react"
import { getOppositeDirection, getVisibilityPosition } from "@App/utils"

type NodeProps = {
    node: Node

    isLeftEdge: boolean,
    isRightEdge: boolean,
    isUpEdge:boolean,
    isDownEdge:boolean,

    isEntranceNode:boolean,
    isExitNode: boolean,
    isAdjacentNode:boolean,
    adjDirection:Movement|undefined,
    playerPosition: Node|"entrance"|"goal",
    transition: string; transitionDirection: Movement,
    movePlayer: (n:Node, direction:Movement, exitMove:boolean) => void,
    shownMazeState: "shown" | "fading" | "not-shown"
    children: ReactNode
}

export default function Node({
    node, 
    isLeftEdge, isRightEdge, isUpEdge, isDownEdge, isExitNode, 
    isAdjacentNode, adjDirection, movePlayer,
    transition, transitionDirection, shownMazeState,
    playerPosition, children
}:NodeProps) {

    const nodeRef = useRef<HTMLDivElement>(null)
    const exitDivRef = useRef<HTMLDivElement>(null)
    const showMazeRegardless = shownMazeState === "shown"

    const borderL = isLeftEdge ? "border-l-[8cqw]" : (node.left && (node.visibleLeft || showMazeRegardless)) ?  "border-l-[4cqw]" : ""
    const borderR = isRightEdge ? "border-r-[8cqw]" : (node.right && (node.visibleRight || showMazeRegardless)) ?  "border-r-[4cqw]" : ""
    const borderT = isUpEdge ? "border-t-[8cqw]" : (node.up && (node.visibleUp || showMazeRegardless)) ? "border-t-[4cqw]" : ""
    const borderB = isDownEdge ? "border-b-[8cqw]" : (node.down && (node.visibleDown || showMazeRegardless)) ? "border-b-[4cqw]" : ""

    const backtrackLeftVisibility = node.backtrackLeftShown ? "visible" : "hidden"
    const backtrackRightVisibility = node.backtrackRightShown ? "visible" : "hidden"
    const backtrackUpVisibility = node.backtrackUpShown ? "visible" : "hidden"
    const backtrackDownVisibility = node.backtrackDownShown ? "visible" : "hidden"

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isAdjacentNode && !getVisibilityPosition(node, getOppositeDirection(adjDirection as Movement)) && !showMazeRegardless) {
                const divNode = nodeRef.current as HTMLDivElement;
                divNode.classList.add("travellable");
            }
            if (playerPosition === node && isExitNode) {
                const exitSq = exitDivRef.current as HTMLDivElement;
                exitSq.classList.add("travellable")
            }
        }, 5000)

        return () => clearTimeout(timeout)
    }, [playerPosition, isAdjacentNode])

    return (
        <div 
            className={`
                min-h-[20px] min-w-[20px] flex justify-center items-center relative aspect-square
                
                ${(isAdjacentNode && !getVisibilityPosition(node, getOppositeDirection(adjDirection as Movement))) ? "hover:cursor-pointer hover-bg" : ""}
            `}
            onClick={isAdjacentNode ? () => {movePlayer(node, adjDirection as Movement, false)} : undefined}
            style={{containerType: "size"}}
            id={`node-${node.row}-${node.col}`}
            ref={nodeRef}
        >
            <div 
                className={`
                    size-full absolute inset-0 
                    ${borderL} ${borderR} ${borderT} ${borderB} 
                    ${transition !== 'none' ? isAdjacentNode ? `make-border-${getOppositeDirection(transitionDirection)}-visible` : `make-border-${transitionDirection}-visible` : ""} 
                    border-white p-0
                `}
                style={!(shownMazeState === "fading") ? {} : {
                    animation: `
                        ${node.left && !isLeftEdge ? "fade-left-border 1s forwards" : ""} 
                        ${node.right && !isRightEdge  ? `${node.left && !isLeftEdge ? ", " : ""}fade-right-border 1s forwards` : ""}
                        ${node.up && !isUpEdge ? `${(node.left && !isLeftEdge) || (node.right && !isRightEdge) ? ", " : ""}fade-up-border 1s forwards` : ""}
                        ${node.down && !isDownEdge ? `${(node.left && !isLeftEdge) || (node.right && !isRightEdge) || (node.up && !isUpEdge) ? ", " : ""}fade-down-border 1s forwards` : ""}
                         
                        `
                }}
            >

            </div>
            {children}
            {playerPosition === node && isExitNode &&
            <div 
                className="
                    absolute left-[100%] size-full absolute flex justify-center items-center 
                    hover:cursor-pointer hover-bg
                "
                onClick={() => {movePlayer(node, "right", true)}}
                ref={exitDivRef}
            >
                
            </div>
            }

            <div className={`
                absolute
                    left-0 top-1/2 w-1/2 transform -translate-y-1/2 
                    bg-green-300 h-[5px]
                ${backtrackLeftVisibility}
            `}>

            </div>
            <div className={`
                absolute right-0 top-1/2 w-1/2 transform -translate-y-1/2 
                bg-green-300 h-[5px]
                ${backtrackRightVisibility}

            `}>

            </div>
            <div className={`
                absolute top-0 left-1/2 h-1/2 transform -translate-x-1/2 
                bg-green-300 w-[5px]
                ${backtrackUpVisibility}
            `}>

            </div>
            <div className={`
                absolute bottom-0 left-1/2 h-1/2 transform -translate-x-1/2 
                bg-green-300 w-[5px]
                ${backtrackDownVisibility}
            `}>

            </div>
        </div>
    )
}