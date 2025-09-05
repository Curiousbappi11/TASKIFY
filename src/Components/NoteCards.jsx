import React from 'react'

function NoteCards({
  title,
  content,
  dateTime
}) {
  return (
    <>
      <div className='h-34 rounded-2xl px-4 pt-2 pb-1 flex flex-col'>
        
        <h3 className='font-bold text-2xl'>{title}</h3>
        <p className='italic whitespace-pre-wrap overflow-hidden'>{content}</p>
        <div className='mt-auto flex items-end justify-end'>
          <p className='text-sm'>{dateTime}</p>
        </div>

      </div>
    </>
  )
}

export default NoteCards