// src/Components/ReminderHandler.jsx
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateReminder, setActiveReminder } from "../features/remindersSlice";

export default function ReminderHandler() {
  const dispatch = useDispatch();
  const allReminders = useSelector((state) => state.reminders.allReminders);
  const audioRef = useRef(new Audio("/TASKIFY/reminderTone.mp3"));
  audioRef.current.loop = true;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedNow = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}T${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;

      allReminders.forEach(reminder => {
        if (!reminder.triggered && reminder.time === formattedNow) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {}); // autoplay may fail if no interaction yet

          dispatch(updateReminder({ ...reminder, triggered: true }));
          dispatch(setActiveReminder({ id: reminder.id, title: reminder.title, audioRef: audioRef.current }));
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [allReminders, dispatch]);

  return null; // this component renders nothing
}
