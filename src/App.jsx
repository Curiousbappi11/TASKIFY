import Menu from './Components/Menu';
import ReminderHandler from "./Components/ReminderHandler";
import ReminderPopup from "./Components/ReminderPopup";
import { useSelector, useDispatch } from 'react-redux';
import { MenuToggle } from './features/uiSlice';
import { Outlet, useNavigate } from 'react-router';
import GoogleAuth from './Components/GoogleAuth';
// import './App.css'

function App() {

  const navigate = useNavigate();
  
  const isMenuToggle = useSelector((state) => state.ui.isMenuToggle);
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(MenuToggle());
  }

  return (
    <>

      <ReminderHandler /> {/* This will always run */}
      <ReminderPopup />   {/* This shows popup when reminder triggers */}

      {/* main container */}
      <div className='w-dvw h-dvh p-2 bg-[#d3d3d3] text-[#444] overflow-hidden'>

        {/* content container */}
        <div className='w-full h-full flex relative'>

          {/* navigation container */}
          <Menu />

          {/* home section */}
          <div className={`${isMenuToggle ? 'scale-85 translate-x-56' : 'translate-x-0'} relative transition-transform duration-300 border rounded-[2rem] px-6 py-4 w-full h-full flex flex-col`}>

            {/* dark screen for exit */}
            {isMenuToggle && (
              <div className='rounded-4xl absolute inset-0 z-10' onClick={handleMenuClick}></div>
            )}

            {/* nav bar container */}
            <div className='mb-2 w-full h-12 flex gap-4 justify-between items-center'>

              {/* menu */}
              <button type='button' onClick={handleMenuClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-8 hover:scale-110 hover:stroke-[#111] hover:stroke-3 str transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              <button
                type='button'
                onClick={() => navigate('/')}
                className='min-w-40 w-80 px-4 py-1 border border-[#333] text-[#333] font-extrabold text-2xl rounded-lg hover:text-[#4a1aa2] hover:bg-[#e5cfe2] transition-colors'
              >
                Taskify
              </button>

              <GoogleAuth />

            </div>

            <div className="w-full h-full overflow-y-auto hide-scrollbar">
              <Outlet />
            </div>


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