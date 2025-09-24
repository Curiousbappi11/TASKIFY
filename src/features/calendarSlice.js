// src/features/calendarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDate: new Date(),
  selectedDate: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    prevMonth: (state) => {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() - 1,
        1
      );
      state.selectedDate = null;
    },
    nextMonth: (state) => {
      state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() + 1,
        1
      );
      state.selectedDate = null;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetCalendar: (state) => {
      state.currentDate = new Date();
      state.selectedDate = null;
    },
  },
});

export const { prevMonth, nextMonth, setSelectedDate, resetCalendar } =
  calendarSlice.actions;

export default calendarSlice.reducer;
