import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkTask, editTask, deleteTask, toggleTaskFirebase, editTaskFirebase, deleteTaskFirebase } from '../features/tasksSlice';

function TaskItems({ task, user }) {
  const dispatch = useDispatch();

  const [isEditable, setIsEditable] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleCheckboxToggle = () => {
    if (user) dispatch(toggleTaskFirebase({ id: task.id, uid: user.uid }));
    else dispatch(checkTask(task.id));
  };

  const handleEdit = () => {
    if (user) dispatch(editTaskFirebase({ id: task.id, newText: editedText, uid: user.uid }));
    else dispatch(editTask({ id: task.id, newText: editedText, completed: false }));
    setIsEditable(false);
  };

  const handleDelete = () => {
    if (user) dispatch(deleteTaskFirebase({ id: task.id, uid: user.uid }));
    else dispatch(deleteTask(task.id));
  };

  return (
    <div className='border rounded-xl pl-4 pr-2 py-2.5 flex gap-2'>
      <div className='grid place-items-center w-6 h-7'>
        <button type='button' onClick={handleCheckboxToggle}>
          {task.completed ?
            <div className='border border-dashed bg-[#444] rounded-sm'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="size-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            :
            <div className='border border-dashed rounded-sm grid place-content-center w-5 h-5 hover:bg-[#ccc]'></div>
          }
        </button>
      </div>

      <div className='pt-[3px] w-full'>
        {isEditable ?
          <input
            type="text"
            className='w-full outline-none bg-transparent italic text-[#111]'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEdit}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") {
                setEditedText(task.text);
                setIsEditable(false);
              }
            }}
          />
          :
          <p className={`w-full leading-6 wrap-anywhere ${task.completed ? 'line-through' : ''}`}>
            {task.text}
          </p>
        }
      </div>

      <div className='grid place-items-center h-7'>
        <button type='button' onClick={() => setIsEditable(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </button>
      </div>

      <div className='grid place-items-center h-7'>
        <button type='button' onClick={handleDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TaskItems;
