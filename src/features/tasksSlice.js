import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    addTask: (state, action) => {
      state.taskList.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    
    checkTask: (state, action) => {
      const task = state.taskList.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    
  }
})

export const {
  addTask,
  checkTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;