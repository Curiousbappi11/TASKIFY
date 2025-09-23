import React, { useState } from "react";
import { useSelector } from "react-redux";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const allReminders = useSelector((state) => state.reminders.allReminders);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // First day of month and total days
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Generate array for calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null); // empty slots before month starts
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (day) => {
    if (day) setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const remindersForSelectedDate = selectedDate
    ? allReminders.filter(r => {
        const rDate = new Date(r.time);
        return rDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-3 py-1 bg-gray-300 rounded">◀</button>
        <h2 className="text-xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth} className="px-3 py-1 bg-gray-300 rounded">▶</button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 text-center font-semibold mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {calendarDays.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 rounded cursor-pointer
                        ${isToday(day) ? "bg-blue-300 text-white" : ""}
                        ${selectedDate && day === selectedDate.getDate() ? "bg-green-300 text-white" : ""}
                        ${!day ? "" : "hover:bg-gray-200"}`}
            onClick={() => handleDateClick(day)}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Selected date reminders */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Reminders on {selectedDate.toDateString()}:</h3>
          {remindersForSelectedDate.length === 0 ? (
            <p className="text-gray-500">No reminders</p>
          ) : (
            <ul className="list-disc list-inside">
              {remindersForSelectedDate.map(r => (
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
