import type { Maze, Node, MazeBoard, AdjacentNodes } from "@Types/maze";
import { getRandDirection, getRandIdx } from "./utils";



type AdjNodeKeys = keyof AdjacentNodes

export function generate_maze (
    numRows:number, numCols:number,
    path_snakiness: number, visibleBorders:boolean=false
): Maze {

    const startRow = getRandIdx(numRows);
    const endRow = getRandIdx(numRows);

    const maze:Maze = {
        numRows, numCols, 
        entrance: startRow, goal: endRow, 
        board: generate_maze_board(numRows, numCols, path_snakiness, startRow, endRow, visibleBorders)
    }

    return maze
}


// Randomized Depth-First-Search Algo to generate the maze
function generate_maze_board(
    numRows:number, numCols: number, path_snakiness:number,
    entrance:number, goal:number, visibleBorders:boolean
): MazeBoard {


    // 1. Generates the board with unvisited nodes at the specified size
    const board:Array<Array<Node>> = []

    for (let i = 0; i < numRows ; i++) {
        board.push([])
        for (let j = 0; j < numCols ; j++) {
            board[i].push({
                left: j === 0 && i === entrance ? false : true, 
                right: j === numCols-1 && i === goal ? false : true, 
                
                up: true, 
                down: true, 

                visibleLeft: visibleBorders ? true : false,
                visibleRight: visibleBorders ? true : false,
                visibleUp: visibleBorders ? true : false,
                visibleDown: visibleBorders ? true : false,

                backtrackLeftShown: false,
                backtrackRightShown: false,
                backtrackUpShown:false,
                backtrackDownShown:false,

                row: i, col: j, visited: false})
        }
    }

    let currNode = board[entrance][0]; // Start at start node
    currNode.visited = true;

    // 2. Begin DFS

    const node_stack:Node[] = [];
    node_stack.push(currNode);

    while (!(node_stack.length === 0)) {
        currNode = node_stack.pop() as Node;
        const adjNodes:AdjacentNodes = {
            up: inBoundsUnvisitedNode(board, numRows, numCols, currNode.row-1, currNode.col) ? board[currNode.row-1][currNode.col] : undefined,
            down: inBoundsUnvisitedNode(board, numRows, numCols, currNode.row+1, currNode.col) ? board[currNode.row+1][currNode.col] : undefined,
            left: inBoundsUnvisitedNode(board, numRows, numCols, currNode.row, currNode.col-1) ? board[currNode.row][currNode.col-1] : undefined,
            right: inBoundsUnvisitedNode(board, numRows, numCols, currNode.row, currNode.col+1) ? board[currNode.row][currNode.col+1] : undefined
        }
        const {numDirections, percents} = get_node_percentage(adjNodes, path_snakiness);
        if (numDirections === 0) {continue;}
        const next_node_direction = getRandDirection(percents) as AdjNodeKeys;
        const next_node = adjNodes[next_node_direction] as Node;
        
        const relevant_next_node_change = next_node_direction === 'up' ? 'down' : next_node_direction === 'down' ? 'up' : next_node_direction === 'left' ? 'right' : 'left'

        currNode[next_node_direction] = false;
        next_node[relevant_next_node_change] = false;
        next_node.visited = true;
        node_stack.push(currNode);
        node_stack.push(next_node);
    }

    return board

}

function get_node_percentage(
    adjNodes:AdjacentNodes, path_snakiness:number 
): {numDirections: number, percents: Array<number>} {
    const nodePercentage = [0, 0, 0, 0]
    let percentage = 1;
    let numDirections = Object.values(adjNodes).reduce((accum, currVal) => currVal === undefined ? accum : accum+1, 0);
    const finalNumDirections = numDirections
    if (!numDirections) {return {numDirections: 0, percents: []}}

    if (adjNodes.right) {
        nodePercentage[3] = numDirections === 1 ? 1 : 
            (0.5+(numDirections === 3 ? 0.25 : numDirections === 2 ? 0.5 : 0))*(path_snakiness+(path_snakiness<0.5 ? Math.random()/(30*path_snakiness) : 0)); 
        percentage-=nodePercentage[3];
        numDirections--;
        if (!numDirections) {return {numDirections: finalNumDirections, percents: nodePercentage};}
    } 
    if (adjNodes.left) {
        nodePercentage[2] = percentage/numDirections;
    }
    if (adjNodes.down) {
        nodePercentage[1] = percentage/numDirections;
    }
    if (adjNodes.up) {
        nodePercentage[0] = percentage/numDirections;
    }

    return {numDirections: finalNumDirections, percents: nodePercentage};
}

function inBoundsUnvisitedNode(board:MazeBoard, numRows:number, numCols:number, row:number, col:number) {
    // Checks that a node is within the bounds of the board AND hasnt been visited 
    return row >= 0 && row < numRows && col >= 0 && col < numCols && !board[row][col].visited
}
