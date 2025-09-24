import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { doc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

// Async thunk to fetch notes from Firestore
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async () => {
    const notesCollection = collection(db, "notes");
    const snapshot = await getDocs(notesCollection);
    const notesArray = snapshot.docs.map(doc => doc.data());
    return notesArray;
  }
);

// Load initial notes from localStorage first
const localNotes = JSON.parse(localStorage.getItem("notes")) || [];

const initialState = {
  isNotesFormToggle: false,
  allNotes: localNotes,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    NotesFormToggle: (state) => {
      state.isNotesFormToggle = !state.isNotesFormToggle;
    },

    saveNotes: (state, action) => {
      const newNote = { id: Date.now(), ...action.payload };
      state.allNotes.push(newNote);

      // Save to Firestore
      setDoc(doc(db, "notes", `${newNote.id}`), newNote);

      // Save to localStorage
      localStorage.setItem("notes", JSON.stringify(state.allNotes));
    },

    updateNote: (state, action) => {
      const index = state.allNotes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.allNotes[index] = action.payload;

        // Update Firestore
        setDoc(doc(db, "notes", `${action.payload.id}`), action.payload);

        // Update localStorage
        localStorage.setItem("notes", JSON.stringify(state.allNotes));
      }
    },

    deleteNote: (state, action) => {
      state.allNotes = state.allNotes.filter(note => note.id !== action.payload);

      // Delete from Firestore
      deleteDoc(doc(db, "notes", `${action.payload}`));

      // Update localStorage
      localStorage.setItem("notes", JSON.stringify(state.allNotes));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.allNotes = action.payload;

      // Update localStorage
      localStorage.setItem("notes", JSON.stringify(state.allNotes));
    });
  },
});

export const { NotesFormToggle, saveNotes, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
