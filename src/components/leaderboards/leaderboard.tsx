import type { Difficulty } from "@Types/gamestate"

type LeaderboardProps = {
    difficulty: Difficulty,
    names: string[]
}

const difficultyToLabel:Record<Difficulty, string> = {
    "easy": "Easy", "medium": "Medium", "hard": "Hard", "extreme":"Extreme"
}

export default function Leaderboard({difficulty, names}:LeaderboardProps) {

    return (
        
          <div className="flex flex-col  min-w-[175px] max-w-[200px] h-[250px] items-center border border-main border-[8px] rounded-sm">
            <div className={`flex justify-center items-center w-full h-[50px] ${difficulty}-leaderboard leaderboard`}>
              <p className="24px">{difficultyToLabel[difficulty]} Difficulty</p>
            </div>
            {[...Array(5)].map((_:any, i:number) => {
                const num = i+1
                const name = names[i]
                const noName = name === undefined
                return (
                    <div className="flex justify-center items-center w-full h-[40px] leaderboard-item p-2">
                        <p className="w-full text-start text-[20px] text-nowrap">{num}.</p>
                        <p className="text-[20px] text-nowrap">{noName ? "---" : name}</p>
                    </div>
                )
            })}
            
          </div>
    )
}