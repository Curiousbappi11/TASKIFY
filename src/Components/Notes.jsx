import React from 'react'

function Notes() {
  return (
    <>
      {/* main container of Notes */}
      <div className='w-full flex flex-col overflow-hidden' >

        {/* heading */}
        <h2 className='font-black text-4xl mt-2 mb-4'>All Notes</h2>

        {/* cards container*/}
        <div className='flex flex-col gap-4 overflow-y-scroll [&>div]:h-34'>

          {/* notes cards */}
          <div className='border rounded-2xl px-4 py-2'>

            <h3 className='font-bold text-2xl'>Meeting Notes</h3>
            <p className='italic'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          </div>
          <div className='border rounded-2xl px-4 py-2'>

            <h3 className='font-bold text-2xl'>Meeting Notes</h3>
            <p className='italic'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          </div>
          <div className='border rounded-2xl px-4 py-2'>

            <h3 className='font-bold text-2xl'>Meeting Notes</h3>
            <p className='italic'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          </div>
          <div className='border rounded-2xl px-4 py-2'>

            <h3 className='font-bold text-2xl'>Meeting Notes</h3>
            <p className='italic'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          </div>
          <div className='border rounded-2xl px-4 py-2'>

            <h3 className='font-bold text-2xl'>Meeting Notes</h3>
            <p className='italic'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

          </div>

        </div>

      </div>
    </>
  )
}

export default Notes