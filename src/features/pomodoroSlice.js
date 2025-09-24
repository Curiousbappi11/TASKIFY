// src/store/pomodoroSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 25 * 60,
  isRunning: false,
  isWork: true,
  customWork: "25",
  customBreak: "5",
  resetTrigger: 0,
  showPopup: false,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    startStop: (state) => {
      state.isRunning = !state.isRunning;
      // inside handleStartStop or first click
    },
    reset: (state) => {
      state.isRunning = false;
      state.time = state.customWork * 60;
      state.isWork = true;
      state.showPopup = false;
      state.resetTrigger += 1;
    },
    tick: (state) => {
      if (state.isRunning && state.time > 0) {
        state.time -= 1;
      }
    },
    complete: (state) => {
      state.isRunning = false;
      state.showPopup = true;
    },
    stopAlarmAndContinue: (state) => {
      state.showPopup = false;
      if (state.isWork) {
        state.time = state.customBreak * 60;
      } else {
        state.time = state.customWork * 60;
      }
      state.isWork = !state.isWork;
      state.isRunning = true;
    },
    setCustomWork: (state, action) => {
      state.customWork = action.payload;
    },
    setCustomBreak: (state, action) => {
      state.customBreak = action.payload;
    },
    apply: (state) => {
      const work = Number(state.customWork) || 0;
      state.time = work * 60;
      state.isWork = true;
      state.isRunning = false;
      state.resetTrigger += 1;
    },
  },
});

export const {
  startStop,
  reset,
  tick,
  complete,
  stopAlarmAndContinue,
  setCustomWork,
  setCustomBreak,
  apply,
} = pomodoroSlice.actions;

export default pomodoroSlice.reducer;
