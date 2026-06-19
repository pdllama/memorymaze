
import MazeGame from '@Windows/MazeGame'
import Maze from "@Components/maze/mazefunctionality"
import './App.css'
import GameSection from '@Windows/GameSection'

function App() {
  

  return (
    <>
     <div className='h-[160px] sm:h-[90px] w-full p-[10px] flex flex-col sm:flex-row gap-[10px] items-center text-white text-nowrap bg-main'>
        <div className='size-fit sm:p-[10px] pt-[10px]'>
          <h2 className='text-48px'>Memory Maze</h2>
        </div>
        <div className='size-fit p-[10px] flex justify-center w-full sm:justify-end'>
          <button 
            className='size-fit p-[10px] relative border-none hover-text-secondary hover:bottom-[3px] text-3xl hover:cursor-pointer' 
            onClick={() => {}}
          >
            Play
          </button>
          <button 
            className='size-fit p-[10px] relative border-none hover-text-secondary hover:bottom-[3px] text-3xl hover:cursor-pointer'
            onClick={() => {}}
          >
            Leaderboards
          </button>
        </div>
        
     </div>
     <MazeGame/>
     <div className="w-full flex flex-col items-center bg-main text-[24px] text-white gap-4 px-5 sm:px-15 md:px-25 lg:px-50 py-15">
      <p>
        The goal of the memory game is to reach the <span className="text-secondary">end of the maze as quickly as possible</span>. 
        Sounds simple right? Well, the maze is only shown to you for <span className="text-secondary">a certain amount of time</span>, 
        which means you’ll have to <span className="text-secondary">memorize the maze to traverse it</span>!
      </p>
      <p>
        You have a certain <span className="text-secondary">number of lives per level</span> which decreases whenever you hit the walls of the maze.
      </p>
      <p>
        Challenge the mazes and try to get high on the leaderboards!
      </p>
     </div>
     
    </>
  )
}

export default App
