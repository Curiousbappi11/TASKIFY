import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import uiReducer from '../features/uiSlice';
import notesReducer from '../features/notesSlice';
import remindersReducer from '../features/remindersSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    notes: notesReducer,
    reminders: remindersReducer,
  },
});
