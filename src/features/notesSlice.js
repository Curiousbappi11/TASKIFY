import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNotesFormToggle: false,
  allNotes: [],
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {

    NotesFormToggle: (state) => {
      state.isNotesFormToggle = !state.isNotesFormToggle;
    },

    saveNotes: (state, action) => {
      state.allNotes.push({
        id: Date.now(),
        ...action.payload});
    },

    updateNote: (state, action) => {
      const index = state.allNotes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.allNotes[index] = action.payload;
      }
    },

    deleteNote: (state, action) => {
      state.allNotes = state.allNotes.filter(
        note => note.id !== action.payload
      );
    },

  }
})

export const {
  NotesFormToggle,
  saveNotes,
  updateNote,
  deleteNote,
} = notesSlice.actions;
export default notesSlice.reducer;