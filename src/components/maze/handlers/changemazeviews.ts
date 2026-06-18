import type { MazeBoard, Movement, Node } from "@Types/maze";


// Returns a new board with the visiblity slightly changed at some nodes
export function setMazeVisibility(
    board:MazeBoard, currNode: Node, nextNode: Node, direction:Movement
) {

    const currNodeAffectedView = direction === "up" ? "visibleUp" : direction === "down" ? "visibleDown" : direction === "left" ? "visibleLeft" : "visibleRight";
    const nextNodeAffectedView = direction === "up" ? "visibleDown" : direction === "down" ? "visibleUp" : direction === "left" ? "visibleRight" : "visibleLeft"

    const newBoard = board.map((col: Node[], row:number) => {
        return col.map((n:Node, col: number) => {
            if (row === currNode.row && col === currNode.col) {
                return {...currNode, [currNodeAffectedView]: true}
            } else if (row === nextNode.row && col === nextNode.col) {
                return {...nextNode, [nextNodeAffectedView]: true}
            } else {
                return n
            }
        })
    })

    return newBoard

}


export function setMazeBacktrackLines(
    board:MazeBoard, currNode: Node|'entrance'|'goal', nextNode: Node|"goal"|"entrance", direction:Movement
) {
    
    const currNodeAffectedView = direction === "up" ? "backtrackUpShown" : direction === "down" ? "backtrackDownShown" : direction === "left" ? "backtrackLeftShown" : "backtrackRightShown";
    const nextNodeAffectedView = direction === "up" ? "backtrackDownShown" : direction === "down" ? "backtrackUpShown" : direction === "left" ? "backtrackRightShown" : "backtrackLeftShown"
    
    const newBoard = board.map((col: Node[], row:number) => {
        return col.map((n:Node, col: number) => {
            if (!(currNode === "entrance" || currNode === "goal") && row === currNode.row && col === currNode.col) {
                return {...currNode, [currNodeAffectedView]: true}
            } else if (!(nextNode === "goal" || nextNode === "entrance") && row === nextNode.row && col === nextNode.col) {
                return {...nextNode, [nextNodeAffectedView]: true}
            } else {
                return n
            }
        })
    })

    return newBoard

}