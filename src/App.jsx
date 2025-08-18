import { useState } from 'react'
import Tasks from './Components/Tasks'
// import './App.css'

function App() {

  const [isMenuToggle, setIsMenuToggle] = useState(false);

  function handleMenuToggle() {
    setIsMenuToggle(!isMenuToggle);
  }

  return (
    <>
      {/* main container */}
      <div className='w-dvw h-dvh p-2 bg-[#d3d3d3] text-[#444] overflow-hidden'>

        {/* content container */}
        <div className='w-full h-full flex relative'>

          {/* navigation container */}
          <div className={`p-4 ${isMenuToggle ? 'translate-x-0' : '-translate-x-full'} absolute transition-transform duration-300 grid place-content-center w-44 h-full`}>
            home
            <br />
            tasks
            <br />
            notes
            <br />
            reminder
            <br />
            pomodoro
            <br />
            calender

          </div>

          {/* home section */}
          <div className={`${isMenuToggle ? 'scale-80 translate-x-44' : 'translate-x-0'} relative transition-transform duration-300 border rounded-[2rem] p-6 w-full h-full flex flex-col`}>

            {/* dark screen for exit */}
            {isMenuToggle && (
              <div className=' absolute inset-0 z-10' onClick={handleMenuToggle}></div>
            )}

            {/* nav bar container */}
            <div className='w-full h-16 flex items-center'>

              {/* menu */}
              <button onClick={handleMenuToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

            </div>

            <Tasks />

          </div>

        </div>

      </div>

    </>
  )
}

export default App

/*
#3E2522
#8C6E63
#D3A376
#FFE0B2
#FFF2DF
*/