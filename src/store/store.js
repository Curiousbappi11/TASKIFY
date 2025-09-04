import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import uiReducer from '../features/uiSlice';
import notesReducer from '../features/notesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    notes: notesReducer,
  },
});
