import React from 'react'

function NoteCards({
  title,
  content,
  dateTime
}) {
  return (
    <>
      <div className='border rounded-2xl px-4 py-2 flex flex-col'>

        <h3 className='font-bold text-2xl'>{title}</h3>
        <p className='italic'>{content}</p>
        <div className='h-full flex items-end justify-end'>
          <p>{dateTime}</p>
        </div>

      </div>
    </>
  )
}

export default NoteCards