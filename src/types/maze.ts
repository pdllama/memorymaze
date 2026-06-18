

// The Maze is generated with a Randomized Depth-First Search algorithm


type Movement = "up" | "down" | "left" | "right";

// A single 1x1 travellable node in a maze. 
// Stores whether there is a border at the up, right, left, and down sections of the Node, and whether it is visited.
// true = there is a border, false = no border
// The visited value is used for the generation of the maze
type Node = {
    // Whether there is a border (true) or not (false)
    up: boolean,
    left: boolean,
    right: boolean,
    down: boolean,
    // Whether the border is visible (true) because of a mistake or not (false)
    visibleUp: boolean, 
    visibleLeft: boolean,
    visibleRight: boolean,
    visibleDown: boolean,
    // Whether the backtrack line is visible and which direction it is in.
    backtrackUpShown: boolean,
    backtrackLeftShown: boolean,
    backtrackRightShown: boolean,
    backtrackDownShown: boolean,

    row: number,
    col: number,
    visited: boolean
}

type MazeBoard = Array<Array<Node>>;

type Maze = {
    numRows: number,
    numCols: number,
    entrance: number, // The entrance is always on the left side, so this is the column number of the entrance
    goal: number, // The goal is always on the right side, so this is the column number of the goal
    board: MazeBoard
}

type AdjacentNodes = {
    up: Node|undefined,
    down: Node|undefined,
    left: Node|undefined,
    right: Node|undefined
}

type NodePercentage = {
    up: number, down:number, left:number, right: number
}

type PlayerPosition = Node | "entrance" | "goal"


export type {Node, Maze, MazeBoard, AdjacentNodes, NodePercentage, Movement, PlayerPosition}