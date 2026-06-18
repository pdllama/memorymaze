import type { MazeBoard, Movement } from "@Types/maze";
import type { Node } from "@Types/maze";

export function getRandIdx(num:number) {
    return Math.floor(Math.random()*num);
}

const directions = ["up", "down", "left", "right"]
export function getRandDirection(odds:number[]) {
    //[up, down, left, right]

    let iterodds = 0;
    const randnum = Math.random();
    for (let i = 0; i < odds.length ; i++) {
        const o = odds[i]
        if (randnum > iterodds && randnum <= iterodds+o) {
            return directions[i];
        }
        iterodds+=o
    }
}

export function isAdjacentNode(
    currRow:number, currCol:number, 
    nextRow:number, nextCol:number
) : {adjacentNode:boolean, direction: Movement|undefined} {

    const adjDirection = currCol === nextCol ?
        (currRow-1 === nextRow ? "up" : currRow+1 === nextRow ? "down" : undefined) :
        currRow === nextRow ?
        (currCol-1 === nextCol ? "left" : currCol+1 === nextCol ? "right" : undefined) :
        undefined

    if (adjDirection) {
        return {adjacentNode:true, direction: adjDirection}
    } else {
        return {adjacentNode: false, direction: undefined}
    }
}

export function getAdjacentNode(
    board:MazeBoard, currNode:Node, direction:Movement,
    numRows: number, numCols: number
) :Node | undefined {

    const newRow = direction === "up" ? currNode.row-1 : direction === "down" ? currNode.row+1 : currNode.row
    const newCol = direction === "left" ? currNode.col-1 : direction === "right" ? currNode.col+1 : currNode.col

    if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
        return undefined;
    } else {
        return board[newRow][newCol]
    }
}


export function getVisibilityPosition(
    node:Node, position: Movement
) {
    if (position === "up") {return node.visibleUp}
    if (position === "down") {return node.visibleDown}
    if (position === "left") {return node.visibleLeft}
    if (position === "right") {return node.visibleRight}
}

export function getOppositeDirection(position:Movement) {
    return position === "up" ? "down" : position === "down" ? "up" : position === "left" ? "right" : "left"
}

export function walkingIntoEdgeNode(node:Node, numRows:number, numCols:number, direction:Movement) {
    return node.row === 0 && direction === "up" ||
        node.row === numRows-1 && direction === "down" ||
        node.col === 0 && direction === "left" ||
        node.col === numCols-1 && direction === "right"; 
}