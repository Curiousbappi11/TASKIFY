import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReminder, deleteReminder } from "../features/remindersSlice";

function Reminders() {
  const dispatch = useDispatch();
  const allReminders = useSelector((state) => state.reminders.allReminders);

  const now = new Date();
  const defaultTime = new Date(now.getTime() + 60 * 60 * 1000)
  .toISOString()
  .slice(0, 16);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(defaultTime);
  
  const handleAddReminder = () => {
    if (!title.trim() || !time) return;
    dispatch(addReminder({ title, time }));
    setTitle("");
    setTime("");
  };

  const handleDeleteReminder = (id) => {
    dispatch(deleteReminder(id));
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-[40rem] w-full flex flex-col gap-4">
        <h2 className="font-black text-4xl mt-2 mb-4">All Reminders</h2>

        {/* Form */}
        <div className="flex flex-col gap-2">

          <input
            type="text"
            placeholder="Reminder Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full flex-1 border px-2 py-1 rounded-lg"
          />

          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-2 py-1 rounded-lg"
          />
          <button
            onClick={handleAddReminder}
            className="bg-[#444] text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>

        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {allReminders.length === 0 ? (
            <p className="text-center text-gray-500">No reminders set</p>
          ) : (
            allReminders.map((reminder) => (
              <div
                key={reminder.id}
                className="border rounded-xl px-4 py-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{reminder.title}</p>
                  <p className="text-sm text-gray-600">{reminder.time}</p>
                </div>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Reminders;
