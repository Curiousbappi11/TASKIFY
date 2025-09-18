import React, { useEffect, useState } from 'react'
import NoteCards from './NoteCards'
import { useSelector, useDispatch } from 'react-redux'
import { NotesFormToggle } from '../features/notesSlice';
import { saveNotes } from '../features/notesSlice';
import { deleteNote } from '../features/notesSlice';
import NoteForm from './NoteForm';

function Notes() {

  const isNotesFormToggle = useSelector((state) => state.notes.isNotesFormToggle);
  const allNotes = useSelector((state) => state.notes.allNotes);

  const dispatch = useDispatch();

  const [selectedNotes, setSelectedNotes] = useState('')

  const handleNotesFormToggle = () => {
    dispatch(NotesFormToggle());
  }

  const handleCardClick = (note) => {
    console.log("Note clicked:", note);
    setSelectedNotes(note);
    handleNotesFormToggle();
  }

  const handleDeleteNotes = (e, note) => {
    e.stopPropagation();
    dispatch(deleteNote(note.id));
  };


  return (
    <>

      {/* main container of Notes */}
      <div className='w-full h-full flex justify-center'>

        <div className='max-w-[40rem] min-w-[10rem] w-full h-full flex flex-col overflow-hidden' >

          {isNotesFormToggle ?
            (
              <NoteForm selectedNotes={selectedNotes} setSelectedNotes={setSelectedNotes} />
            ) : (
              <>
                {/* heading */}
                <h2 className='font-black text-4xl mt-2 mb-4'>All Notes</h2>

                {/* add notes button */}
                <button className='border-2 border-dashed rounded-2xl mb-4 px-4 py-2 font-bold text-2xl text-[#444] hover:border-[#111] hover:text-[#111] transition-all duration-300 ease-in-out' onClick={handleNotesFormToggle}>
                  + Add Notes
                </button>

                {/* cards container*/}
                <div className='w-full h-full flex flex-col gap-4 overflow-y-scroll hide-scrollbar'>

                  {/* notes cards */}
                  {
                    allNotes.length === 0 ? (
                      <p className='text-center text-[#444] font-bold text-2xl mt-50'>No Notes Available</p>
                    ) : (
                      [...allNotes].reverse().map((note) => (
                        <div key={note.id} onClick={() => { handleCardClick(note) }} className='border text-left cursor-pointer rounded-2xl'>
                          <NoteCards key={note.id} title={note.title} content={note.content} dateTime={note.dateTime} note={note} handleDeleteNotes={handleDeleteNotes} />
                        </div>
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