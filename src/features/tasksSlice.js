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
      const task = state.taskList.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    editTask: (state, action) => {
      const { id, newText, completed } = action.payload;
      const task = state.taskList.find(t => t.id === id);
      if (task) {
        task.text = newText;
        task.completed = completed;
      }
    },

    deleteTask: (state, action) => {
      state.taskList = state.taskList.filter(t => t.id !== action.payload);
    },
    
  }
})

export const {
  addTask,
  checkTask,
  editTask,
  deleteTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;