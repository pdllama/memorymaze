import type { Movement, Node } from "@Types/maze"
import Player from "./player"
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
    children: ReactNode
}

export default function Node({
    node, 
    isLeftEdge, isRightEdge, isUpEdge, isDownEdge, 
    isEntranceNode, isExitNode, 
    isAdjacentNode, adjDirection, movePlayer,
    transition, transitionDirection,
    playerPosition, children
}:NodeProps) {

    const nodeRef = useRef<HTMLDivElement>(null)
    const exitDivRef = useRef<HTMLDivElement>(null)

    const borderL = isLeftEdge ? "border-l-[3px]" : (node.left && node.visibleLeft) ?  "border-l-[1.5px]" : ""
    const borderR = isRightEdge ? "border-r-[3px]" : (node.right && node.visibleRight) ?  "border-r-[1.5px]" : ""
    const borderT = isUpEdge ? "border-t-[3px]" : (node.up && node.visibleUp) ? "border-t-[1.5px]" : ""
    const borderB = isDownEdge ? "border-b-[3px]" : (node.down && node.visibleDown) ? "border-b-[1.5px]" : ""


    const backtrackLeftVisibility = node.backtrackLeftShown ? "visible" : "hidden"
    const backtrackRightVisibility = node.backtrackRightShown ? "visible" : "hidden"
    const backtrackUpVisibility = node.backtrackUpShown ? "visible" : "hidden"
    const backtrackDownVisibility = node.backtrackDownShown ? "visible" : "hidden"

    if (node.row === 9 && node.col === 0) {
        console.log(node)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isAdjacentNode && !getVisibilityPosition(node, getOppositeDirection(adjDirection as Movement))) {
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
                h-[40px] w-[40px] flex justify-center items-center relative 
                
                ${(isAdjacentNode && !getVisibilityPosition(node, getOppositeDirection(adjDirection as Movement))) ? "hover:cursor-pointer hover-bg" : ""}
            `}
            onClick={isAdjacentNode ? () => {movePlayer(node, adjDirection as Movement, false)} : undefined}
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