import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReminder, updateReminder, deleteReminder, fetchReminders } from "../features/remindersSlice";

function Reminders() {
  const dispatch = useDispatch();
  const allReminders = useSelector((state) => state.reminders.allReminders);

  const now = new Date();
  const defaultTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(defaultTime);
  const [editingId, setEditingId] = useState(null);

  // State for active reminder popup
  const [activeReminder, setActiveReminder] = useState(null);
  const audioRef = useRef(new Audio("/TASKIFY/reminderTone.mp3"));

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(allReminders));
  }, [allReminders]);

  useEffect(() => {
    dispatch(fetchReminders());
  }, [dispatch]);

  // Check reminders every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      allReminders.forEach(reminder => {
        if (!reminder.triggered && reminder.time === formattedNow) {
          // Trigger popup and audio
          setActiveReminder(reminder);
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => { });

          // Mark reminder as triggered
          dispatch(updateReminder({ ...reminder, triggered: true }));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [allReminders, dispatch]);

  const handleAddOrUpdateReminder = () => {
    if (!title.trim() || !time) return;

    if (editingId) {
      dispatch(updateReminder({
        id: editingId,
        title,
        time,
        triggered: false // reset trigger if editing
      }));
      setEditingId(null);
    } else {
      dispatch(addReminder({ title, time, triggered: false }));
    }

    setTitle("");
    setTime(defaultTime);
  };

  const handleEditReminder = (reminder) => {
    setTitle(reminder.title);
    setTime(reminder.time);
    setEditingId(reminder.id);
  };

  const handleDeleteReminder = (id) => {
    dispatch(deleteReminder(id));
  };

  const handleStopReminder = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.loop = false;
    }
    setActiveReminder(null);
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
            onClick={handleAddOrUpdateReminder}
            className="bg-[#444] text-white px-4 py-2 rounded-lg"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </div>

        {/* Reminder List */}
        <div className="flex flex-col gap-2 overflow-y-scroll hide-scrollbar">
          {allReminders.length === 0 ? (
            <p className="text-center text-gray-500">No reminders set</p>
          ) : (
            allReminders.map(reminder => (
              <div
                key={reminder.id}
                className="border rounded-xl px-4 py-2 flex justify-between items-center"
              >
                <div className="w-44">
                  <p className="font-bold overflow-hidden">{reminder.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(reminder.time).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                </div>
                <div className="flex gap-5">
                  <button
                    onClick={() => handleEditReminder(reminder)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Reminder Popup */}
      {activeReminder && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">{activeReminder.title}</h2>
            <button
              onClick={handleStopReminder}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reminders;
