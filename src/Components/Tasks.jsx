import React, { useState, useEffect } from 'react';
import TaskItems from './TaskItems';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, addTaskFirebase, fetchTasks } from '../features/tasksSlice';
import { auth } from '../firebase/firebase';

function Tasks() {
  const taskList = useSelector((state) => state.tasks.taskList);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [user, setUser] = useState(null);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => setUser(u));
    return unsubscribe;
  }, []);

  // Fetch tasks when user logs in
  useEffect(() => {
    if (user) dispatch(fetchTasks(user.uid));
  }, [user, dispatch]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    if (user) {
      dispatch(addTaskFirebase({ text, uid: user.uid }));
    } else {
      dispatch(addTask(text));
    }

    setText('');
  };

  return (
    <>
      <div className='w-full h-full grid place-content-center'>
        <h2 className='font-black text-3xl mb-4'>Your To Do</h2>

        <form>
          <div className='flex gap-4 mb-6'>
            <input
              type="text"
              placeholder='Add new task'
              className='border-b-1 px-1 w-full outline-none'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type='submit'
              className='bg-[#444] p-1 rounded-lg hover:bg-[#111]'
              onClick={handleAddTask}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>

          <div className='h-[19rem] overflow-y-scroll flex flex-col gap-3 snap-y snap-mandatory hide-scrollbar'>
            {taskList.length === 0 ? (
              <p className="text-center text-4xl font-black text-gray-500 mt-30">No Todos Yet!!</p>
            ) : (
              [...taskList].reverse().map((task) => (
                <div key={task.id} className='snap-start'>
                  <TaskItems task={task} user={user} />
                </div>
              ))
            )}
          </div>
        </form>

        <div className='mt-2'>
          <p><em><strong>Your remaining todos: {taskList.filter(t => !t.completed).length}</strong></em></p>
          <p><em>"Doing what you love is the cornerstone of having abundance in your life" - Wayne Dyer</em></p>
        </div>
      </div>
    </>
  );
}

export default Tasks;
