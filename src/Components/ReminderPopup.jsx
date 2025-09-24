// src/Components/ReminderPopup.jsx
import { useSelector, useDispatch } from "react-redux";
import { clearActiveReminder } from "../features/remindersSlice";

export default function ReminderPopup() {
  const dispatch = useDispatch();
  const activeReminder = useSelector(state => state.reminders.activeReminder);

  if (!activeReminder) return null;

  const handleStop = () => {
    if (activeReminder.audioRef) {
      activeReminder.audioRef.pause();
      activeReminder.audioRef.currentTime = 0;
    }
    dispatch(clearActiveReminder());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50">
      <div className="px-20 py-10 bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">{activeReminder.title}</h2>
        <button 
          onClick={handleStop} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
