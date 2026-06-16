
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
     <GameSection/>
    </>
  )
}

export default App
