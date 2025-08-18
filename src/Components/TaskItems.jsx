import React from 'react'

function TaskItems() {
  return (
    <>
      {/* task box */}
      <div className='border rounded-xl px-4 py-2.5 flex gap-2'>

        {/* checkbox */}
        <div className='grid place-items-center h-6'>
          <input type="checkbox"
            className='
              inline-b 
              size-4 
              appearance-none
              border
              rounded-sm
              checked:bg-[#444]
              checked:after:content-["⌋"]
              relative
              after:rotate-[45deg]
              after:absolute
              after:top-[-4px]
              after:left-[4px]
              after:text-[13px]
              after:font-black
              after:text-[#fff]
              '
            // className='accent-[#444] size-4'
          />
        </div>

        {/* Text */}
        <div className='pt-[3px] w-full'>
          <p className='w-full text-lg font-medium leading-5'>This is an example.
            {/* Lorem ipsum dolor sit amet consectetur. */}
          </p>
        </div>

        {/* edit */}
        <div className='grid place-items-center h-6'>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
        </div>

        {/* delete */}
        <div className='grid place-items-center h-6'>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

          </button>
        </div>

      </div>
      
    </>
  )
}

export default TaskItems