import { createSlice } from "@reduxjs/toolkit";

// in remindersSlice.js
const initialState = {
  allReminders: [],
  activeReminder: null
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.allReminders.push({ id: Date.now(), ...action.payload });
    },
    updateReminder: (state, action) => {
      const { id } = action.payload;
      const index = state.allReminders.findIndex(r => r.id === id);
      if (index !== -1) state.allReminders[index] = action.payload;
    },
    deleteReminder: (state, action) => {
      state.allReminders = state.allReminders.filter(r => r.id !== action.payload);
    },
    setActiveReminder: (state, action) => {
      state.activeReminder = action.payload;
    },
    clearActiveReminder: (state) => {
      state.activeReminder = null;
    }
  }
});

export const { addReminder, updateReminder, deleteReminder, setActiveReminder, clearActiveReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
