import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddNotesToggle: false,
  allNotes: [],
}

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {

    addNotesToggle: (state) => {
      state.isAddNotesToggle = !state.isAddNotesToggle;
    },

    saveNotes: (state, action) => {
      state.allNotes.push({
        id: Date.now(),
        ...action.payload});
    },

  }
})

export const {
  addNotesToggle,
  saveNotes,
} = notesSlice.actions;
export default notesSlice.reducer;