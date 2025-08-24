import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasksSlice';
import uiReducer from '../features/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
  },
});
