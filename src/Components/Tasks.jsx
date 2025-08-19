import React from 'react'
import TaskItems from './TaskItems'

function Tasks() {
  return (
    <>

      {/* main container of Tasks */}
      <div className=' w-full h-full grid place-content-center'>

        {/* inner box for alignment */}
        <div className='w-full'>

          {/* heading */}
          <h1 className='font-black text-3xl mb-4'>Your To Do</h1>

          {/* form box */}
          <form action="">

            {/* input container */}
            <div className='flex gap-4 mb-6'>

              {/* input field */}
              <input type="text" name="" id="" placeholder='Add new task' className='border-b-1 px-1 w-full outline-none' />

              {/* create button */}
              <button className='bg-[#444] p-1 rounded-lg hover:bg-[#111]' onClick={{}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>

            </div>

            {/* All Tasks items */}
            <div className='h-[18rem] overflow-y-scroll flex flex-col gap-3 snap-y snap-mandatory hide-scrollbar'>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
              <div className='snap-start'><TaskItems /></div>
            </div>

          </form>

          {/* Random quotes */}
          <div className='mt-2'>
            <p><em><strong>Your remaning todos : 3</strong></em></p>
            <p><em>"Doing what you love is the comerstone of having abundance in your life" - Wayne Dyer</em></p>
          </div>

        </div>

      </div>
      
    </>
  )
}

export default Tasks