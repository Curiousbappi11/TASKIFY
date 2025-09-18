import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NotesFormToggle, updateNote } from '../features/notesSlice';
import { saveNotes } from '../features/notesSlice';

function NoteForm({ selectedNotes, setSelectedNotes }) {

  const dispatch = useDispatch();

  const [notesTitle, setNotesTitle] = useState(selectedNotes.title);
  const [notesContent, setNotesContent] = useState(selectedNotes.content);

  const note = {
    title: notesTitle,
    content: notesContent,
    dateTime: new Date().toLocaleString(),
  }

  const handleNotesFormToggle = () => {
    dispatch(NotesFormToggle());
  }

  const handleSaveNotes = () => {
    if (selectedNotes) {
      // If editing an existing note, update it
      if (notesTitle.trim() === '' || notesContent.trim() === '') return;
      dispatch(updateNote({ id: selectedNotes.id, ...note }));
      dispatch(NotesFormToggle());
      setNotesTitle('');
      setNotesContent('');
      setSelectedNotes('');
      return;
    }
    if (notesTitle.trim() === '' || notesContent.trim() === '') return;
    dispatch(saveNotes(note));
    dispatch(NotesFormToggle());
    setNotesTitle('');
    setNotesContent('');
  }


  return (
    <>
      <div className='mb-2 h-full'>
        <div className='flex gap-2 mb-4'>
          <div className='flex items-center w-full'>
            <h3 className='font-extrabold text-xl'>Add New Note
            </h3>
          </div>
          {/* back button */}
          <button type='button' onClick={handleNotesFormToggle} className='bg-[#444] text-[#d3d3d3] text-sm px-3 py-1 rounded-lg hover:bg-[#111] transition-colors duration-300 ease-in-out'>Back</button>
          {/* save button */}
          <button type='button' onClick={handleSaveNotes} className='bg-[#444] text-[#d3d3d3] text-sm px-4 py-2 rounded-lg hover:bg-[#111] transition-colors duration-300 ease-in-out'>Save</button>
        </div>
        <textarea placeholder='Title' value={notesTitle} onChange={(e) => { setNotesTitle(e.target.value) }} className='resize-none overflow-y-scroll hide-scrollbar w-full h-12 text-4xl font-extrabold outline-none mb-2' />
        <textarea value={notesContent} onChange={(e) => { setNotesContent(e.target.value) }} className='w-full h-full mt-2 rounded-lg resize-none outline-none overflow-y-scroll hide-scrollbar' placeholder='Write your note here...' />
      </div>
    </>
  )
}

export default NoteForm