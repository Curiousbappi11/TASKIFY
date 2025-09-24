import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  prevMonth,
  nextMonth,
  setSelectedDate,
} from "../features/calendarSlice";

const Calendar = () => {
  const dispatch = useDispatch();
  const { currentDate, selectedDate } = useSelector((state) => state.calendar);
  const allReminders = useSelector((state) => state.reminders.allReminders);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Build calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    if (!day) return;
    dispatch(
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    );
  };

  const remindersForSelectedDate = selectedDate
    ? allReminders.filter((r) => {
        const rDate = new Date(r.time);
        return rDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="p-4 max-w-sm mx-auto h-screen flex flex-col">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => dispatch(prevMonth())}
          className="px-3 py-1 bg-gray-200 rounded shadow active:scale-95"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => dispatch(nextMonth())}
          className="px-3 py-1 bg-gray-200 rounded shadow active:scale-95"
        >
          ▶
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold mb-1 text-xs">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 rounded cursor-pointer select-none
              ${isToday(day) ? "bg-blue-500 text-white" : ""}
              ${selectedDate && day === selectedDate.getDate() ? "bg-green-500 text-white" : ""}
              ${day ? "hover:bg-gray-200" : ""}
            `}
            onClick={() => handleDateClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Reminders */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-bold mb-2 text-center text-sm">
            Reminders on {selectedDate.toDateString()}:
          </h3>
          {remindersForSelectedDate.length === 0 ? (
            <p className="text-gray-500 text-center text-sm">No reminders</p>
          ) : (
            <ul className="list-disc list-inside text-sm space-y-1">
              {remindersForSelectedDate.map((r) => (
                <li key={r.id}>{r.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
