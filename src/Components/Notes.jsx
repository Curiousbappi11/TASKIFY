import React, { useState } from 'react'
import NoteCards from './NoteCards'
import { useSelector, useDispatch } from 'react-redux'
import { addNotesToggle } from '../features/notesSlice';
import { saveNotes } from '../features/notesSlice';

function Notes() {

  const isAddNotesToggle = useSelector((state) => state.notes.isAddNotesToggle);
  const allNotes = useSelector((state) => state.notes.allNotes);

  const dispatch = useDispatch();

  const [notesTitle, setNotesTitle] = useState('');
  const [notesContent, setNotesContent] = useState('');

  const note = {
    title: notesTitle,
    content: notesContent,
    dateTime: new Date().toLocaleString(),
  }

  const handleAddNotesToggle = () => {
    dispatch(addNotesToggle());
  }

  const handleSaveNotes = () => {
    if (notesTitle.trim() === '' || notesContent.trim() === '') return;
    dispatch(saveNotes(note));
    dispatch(addNotesToggle());
    setNotesTitle('');
    setNotesContent('');
  }

  return (
    <>

      {/* main container of Notes */}
      <div className='w-full h-full flex justify-center'>

        <div className='max-w-[40rem] min-w-[10rem] w-full h-full flex flex-col overflow-hidden' >

          {isAddNotesToggle ?
            (
              <div className='mb-2 h-full'>
                <div className='flex gap-2 mb-4'>
                  <div className='flex items-center w-full'>
                    <h3 className='font-extrabold
                     text-xl'>Add New Note</h3>
                  </div>
                  {/* back button */}
                  <button type='button' onClick={handleAddNotesToggle} className='bg-[#444] text-[#d3d3d3] text-sm px-3 py-1 rounded-lg hover:bg-[#111] transition-colors duration-300 ease-in-out'>Back</button>
                  {/* save button */}
                  <button type='button' onClick={handleSaveNotes} className='bg-[#444] text-[#d3d3d3] text-sm px-4 py-2 rounded-lg hover:bg-[#111] transition-colors duration-300 ease-in-out'>Save</button>
                </div>
                <textarea placeholder='Title' value={notesTitle} onChange={(e) => { setNotesTitle(e.target.value) }} className='resize-none overflow-y-scroll hide-scrollbar w-full h-10 text-4xl font-extrabold outline-none mb-2' />
                <textarea value={notesContent} onChange={(e) => { setNotesContent(e.target.value) }} className='w-full h-full mt-2 rounded-lg resize-none outline-none overflow-y-scroll hide-scrollbar' placeholder='Write your note here...' />
              </div>
            ) : (
              <>
                {/* heading */}
                <h2 className='font-black text-4xl mt-2 mb-4'>All Notes</h2>

                {/* add notes button */}
                <button className='border-2 border-dashed rounded-2xl mb-4 px-4 py-2 font-bold text-2xl text-[#444] hover:border-[#111] hover:text-[#111] transition-all duration-300 ease-in-out' onClick={handleAddNotesToggle}>
                  + Add Notes
                </button>

                {/* cards container*/}
                <div className='w-full h-full flex flex-col gap-4 overflow-y-scroll hide-scrollbar'>

                  {/* notes cards */}
                  {
                    allNotes.length === 0 ? (
                      <p className='text-center text-[#444] font-bold text-2xl mt-20'>No Notes Available</p>
                    ) : (
                      [...allNotes].reverse().map((note) => (
                        <button className='border text-left cursor-pointer rounded-2xl'>
                          <NoteCards key={note.id} title={note.title} content={note.content} dateTime={note.dateTime} />
                        </button>
                      ))
                    )
                  }

                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Notes