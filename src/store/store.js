import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import uiReducer from '../features/uiSlice';
import notesReducer from '../features/notesSlice';
import remindersReducer from '../features/remindersSlice';
import pomodoroReducer from '../features/pomodoroSlice';
import calendarReducer from '../features/calendarSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    reminders: remindersReducer,
    pomodoro: pomodoroReducer,
    calendar: calendarReducer,
  },
});
