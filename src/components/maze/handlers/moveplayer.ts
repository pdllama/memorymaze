import type { Maze, Movement, Node, PlayerPosition } from "@Types/maze";


export default function movePlayer(
    player:PlayerPosition, nextNode: Node, movement:Movement, exitMove:boolean
) {
    if (player === "entrance" || player === "goal") {
        return nextNode
    }
    if (exitMove) {
        return "goal"
    }
    if (player[movement]) { // indicates there is a border
        return player;
    } else {
        return nextNode;
    }
}

export function movePlayerKeyPress(
    currLocation:PlayerPosition, maze:Maze, movement:Movement
):PlayerPosition {
    if (currLocation === "entrance") {
        if (movement === "right") {
            return maze.board[maze.entrance][0]
        } else {
            return currLocation
        }
    } else if (currLocation === "goal") {return currLocation}
    else {
        if (currLocation.col === maze.numCols-1 && currLocation.row === maze.goal && movement === "right") { 
            //If its the node right before goal and we go into it
            return "goal";
        } else if (currLocation.col === 0 && currLocation.row === maze.entrance && movement === "left") {
            // If its the node right after entrance and we try to go back;
            return currLocation;
        } else if (!currLocation[movement]) {
            return maze.board[movement === "up" ? currLocation.row-1 : movement === "down" ? currLocation.row+1 : currLocation.row][movement === "left" ? currLocation.col-1 : movement === "right" ? currLocation.col+1 : currLocation.col]
        } else { // Hit a wall
            return currLocation;
        }
    }
}


