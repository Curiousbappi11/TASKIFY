import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

// Add new task
export const addTaskToDB = async (userId, task) => {
  await addDoc(collection(db, "users", userId, "tasks"), {
    ...task,
    createdAt: new Date(),
  });
};

// Get all tasks
export const getTasksFromDB = async (userId) => {
  const querySnapshot = await getDocs(collection(db, "users", userId, "tasks"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete a task
export const deleteTaskFromDB = async (userId, taskId) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
};

// Update a task
export const updateTaskInDB = async (userId, taskId, newData) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), newData);
};
