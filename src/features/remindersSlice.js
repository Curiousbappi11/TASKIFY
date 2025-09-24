import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";

// Fetch reminders from Firestore
export const fetchReminders = createAsyncThunk(
  "reminders/fetchReminders",
  async () => {
    const remindersCollection = collection(db, "reminders");
    const snapshot = await getDocs(remindersCollection);
    const remindersArray = snapshot.docs.map(doc => doc.data());
    return remindersArray;
  }
);

// Load localStorage as fallback
const savedReminders = JSON.parse(localStorage.getItem("reminders")) || [];

const initialState = {
  allReminders: savedReminders.map(r => {
    if (new Date(r.time) > new Date()) return { ...r, triggered: false };
    return r;
  }),
  activeReminder: null,
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      const newReminder = { id: Date.now(), ...action.payload };
      state.allReminders.push(newReminder);

      // Firestore
      setDoc(doc(db, "reminders", `${newReminder.id}`), newReminder);

      // localStorage
      localStorage.setItem("reminders", JSON.stringify(state.allReminders));
    },

    updateReminder: (state, action) => {
      const { id } = action.payload;
      const index = state.allReminders.findIndex(r => r.id === id);
      if (index !== -1) state.allReminders[index] = action.payload;

      // Firestore
      setDoc(doc(db, "reminders", `${id}`), action.payload);

      // localStorage
      localStorage.setItem("reminders", JSON.stringify(state.allReminders));
    },

    deleteReminder: (state, action) => {
      state.allReminders = state.allReminders.filter(r => r.id !== action.payload);

      // Firestore
      deleteDoc(doc(db, "reminders", `${action.payload}`));

      // localStorage
      localStorage.setItem("reminders", JSON.stringify(state.allReminders));
    },

    setActiveReminder: (state, action) => {
      state.activeReminder = action.payload;
    },

    clearActiveReminder: (state) => {
      state.activeReminder = null;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchReminders.fulfilled, (state, action) => {
      state.allReminders = action.payload;

      // Update localStorage
      localStorage.setItem("reminders", JSON.stringify(state.allReminders));
    });
  },
});

export const { addReminder, updateReminder, deleteReminder, setActiveReminder, clearActiveReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
