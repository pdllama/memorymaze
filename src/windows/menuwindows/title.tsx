import Button from "@Components/common/button"
import ChangingMazeBackground from "./components/changingmazebackground"


type TitleScreenProps = {
    goToDifficultySelection: () => void
    goToCustomSelection: () => void
}


export default function TitleScreen({goToDifficultySelection, goToCustomSelection}:TitleScreenProps) {


    return (
        <div className="size-full flex justify-center items-center relative overflow-hidden py-[100px]">
            <div aria-hidden className="absolute inset-0 flex justify-center items-center" style={{containerType: "size"}}><ChangingMazeBackground/> </div>
            <div className="bg-backdrop w-[80%] min-w-fit max-w-[800px] z-5 min-h-[fit] max-h-[700px] opacity-100 flex flex-col items-center gap-[40px] p-5 pb-7">
                <h1 className="text-main">Memory Maze</h1>
                <div className="flex flex-col items-center gap-[10px]">
                <Button 
                    onClick={goToDifficultySelection}
                >
                    <h3 className="text-5xl">Play Game</h3>
                </Button>
                <Button 
                    onClick={goToCustomSelection}
                >
                    <h3 className="text-5xl">Play Custom Level</h3>
                </Button>
                </div>
            </div>
        </div>
    )

}