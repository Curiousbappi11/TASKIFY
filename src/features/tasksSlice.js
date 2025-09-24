import { createSlice } from '@reduxjs/toolkit';
import { db } from '../firebase/firebase';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';

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

    // =================== Firebase Actions ===================

    addTaskFirebase: (state, action) => {
      const { text, uid } = action.payload;
      const newTask = { id: Date.now(), text, completed: false };
      state.taskList.push(newTask);
      setDoc(doc(db, 'users', uid, 'tasks', `${newTask.id}`), newTask);
    },

    toggleTaskFirebase: (state, action) => {
      const { id, uid } = action.payload;
      const task = state.taskList.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
        setDoc(doc(db, 'users', uid, 'tasks', `${id}`), task);
      }
    },

    editTaskFirebase: (state, action) => {
      const { id, newText, uid } = action.payload;
      const task = state.taskList.find(t => t.id === id);
      if (task) {
        task.text = newText;
        setDoc(doc(db, 'users', uid, 'tasks', `${id}`), task);
      }
    },

    deleteTaskFirebase: (state, action) => {
      const { id, uid } = action.payload;
      state.taskList = state.taskList.filter(t => t.id !== id);
      deleteDoc(doc(db, 'users', uid, 'tasks', `${id}`));
    },

    setTasks: (state, action) => {
      state.taskList = action.payload;
    },
  }
});

export const {
  addTask,
  checkTask,
  editTask,
  deleteTask,
  addTaskFirebase,
  toggleTaskFirebase,
  editTaskFirebase,
  deleteTaskFirebase,
  setTasks
} = tasksSlice.actions;

export const fetchTasks = (uid) => async (dispatch) => {
  const tasksCol = collection(db, 'users', uid, 'tasks');
  const snapshot = await getDocs(tasksCol);
  const tasks = snapshot.docs.map(doc => doc.data());
  dispatch(setTasks(tasks));
};

export default tasksSlice.reducer;
