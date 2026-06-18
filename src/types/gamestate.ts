import type { Maze, Movement, PlayerPosition } from "./maze"



type BoardState = {
    maze: Maze,
    playerPosition: PlayerPosition,
}

type GameState = {
    level: number,
    lives: number|'inf',
    tries: number|'inf', 
}

type SessionConfig = {
    maxLevel: number|'inf',
    maxLives: number|'inf',
    maxTries: number|'inf',
    
    path_snakiness: number, // number between 0.1 and 0.9 indicating how snaky or straight the correct path is. 0.1 = snaky. 0.9 = super straight

    timeToSee: number,
    backtrackLine: boolean
}



type PlayerTransition = "move-right" | "move-left" | "move-up" | "move-down" | 
    "hit-wall-right" | "hit-wall-left" | "hit-wall-up" | "hit-wall-down" | 
    'lose-life-right' | "lose-life-left" | "lose-life-up" | "lose-life-down"

type WallTransition = "hit-wall-right-reveal" | "hit-wall-left-reveal" | "hit-wall-up-reveal" | "hit-wall-down-reveal"

//Holds onto the state of the transitions going on in the game whether its the player moving or hitting a wall
type TransitionState = {
    transition: "none" | PlayerTransition | WallTransition,
    node_row: number,
    node_col: number,
    next_row: number,
    next_col: number,
    direction: Movement
}

export type {BoardState, GameState, SessionConfig, TransitionState, PlayerTransition, WallTransition}