import Tasks from './Components/Tasks'
import Menu from './Components/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { MenuToggle } from './features/uiSlice';
import { Outlet } from 'react-router';
// import './App.css'

function App() {

  const isMenuToggle = useSelector((state) => state.ui.isMenuToggle);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(MenuToggle());
  }

  return (
    <>

      {/* main container */}
      <div className='w-dvw h-dvh p-2 bg-[#d3d3d3] text-[#444] overflow-hidden'>

        {/* content container */}
        <div className='w-full h-full flex relative'>

          {/* navigation container */}
          <Menu />

          {/* home section */}
          <div className={`${isMenuToggle ? 'scale-85 translate-x-56' : 'translate-x-0'} relative transition-transform duration-300 border rounded-[2rem] p-6 w-full h-full flex flex-col`}>

            {/* dark screen for exit */}
            {isMenuToggle && (
              <div className=' absolute inset-0 z-10' onClick={handleMenuClick}></div>
            )}

            {/* nav bar container */}
            <div className='w-full h-16 flex items-center'>

              {/* menu */}
              <button onClick={handleMenuClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8 hover:scale-110 hover:stroke-[#111] hover:stroke-3 str transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

            </div>

            {/* <Tasks /> */}
            <Outlet />

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