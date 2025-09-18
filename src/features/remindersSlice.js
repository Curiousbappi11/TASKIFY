import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  allReminders: [],
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.allReminders.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateReminder: (state, action) => {
      const index = state.allReminders.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.allReminders[index] = action.payload;
      }
    },
    deleteReminder: (state, action) => {
      state.allReminders = state.allReminders.filter(r => r.id !== action.payload);
    },
  },
});

export const { addReminder, updateReminder, deleteReminder } = remindersSlice.actions;
export default remindersSlice.reducer;
