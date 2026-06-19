import type { Maze, Movement, PlayerPosition } from "./maze"



type BoardState = {
    maze: Maze,
    playerPosition: PlayerPosition,
}

type GameState = {
    level: number,
    lives: number|'inf',
    tries: number|'inf', 
    completionTimes: number[]
    currNumRows: number,
    currNumCols: number,
    display: PlaythroughScreen
}

type SessionConfig = {
    maxLevel: number|'inf',
    maxLives: number|'inf',
    maxTries: number|'inf',

    startRows: number,
    startCols: number,
    
    path_snakiness: number, // number between 0.1 and 0.9 indicating how snaky or straight the correct path is. 0.1 = snaky. 0.9 = super straight

    timeToSee: number,
    backtrackLine: boolean
    incrementRowsCols: boolean
}

type Difficulty = "easy" | "medium" | "hard" | "extreme"

type GameScreen = "title" | "difficulty-selection" | "custom-selection" | "game-screen" 
type PlaythroughScreen = "level-display" | "show-maze" | "gameplay" | "level-complete" | "session-complete" | "game-over" 


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


const DifficultyPresets:Record<Difficulty, SessionConfig> = {
    "easy": {
        maxLevel: 5, maxLives: 5, maxTries: 10, startRows: 5, startCols: 5, 
        path_snakiness: 0.7, timeToSee: 60, backtrackLine: true, incrementRowsCols: true
    },
    "medium": {
        maxLevel: 5, maxLives: 5, maxTries: 8, startRows: 6, startCols: 6, 
        path_snakiness: 0.6, timeToSee: 45, backtrackLine: true, incrementRowsCols: true
    },
    "hard": {
        maxLevel: 8, maxLives: 3, maxTries: 5, startRows: 5, startCols: 5, 
        path_snakiness: 0.4, timeToSee: 30, backtrackLine: false, incrementRowsCols: true
    },
    "extreme": {
        maxLevel: 10, maxLives: 3, maxTries: 3, startRows: 6, startCols: 6, 
        path_snakiness: 0.3, timeToSee: 20, backtrackLine: false, incrementRowsCols: true
    }
}

export {DifficultyPresets}
export type {BoardState, GameState, SessionConfig, TransitionState, PlayerTransition, WallTransition, GameScreen, PlaythroughScreen, Difficulty}