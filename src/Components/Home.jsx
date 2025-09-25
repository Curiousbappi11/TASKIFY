import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { FaTasks, FaStickyNote, FaBell, FaClock, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const allReminders = useSelector((state) => state.reminders.allReminders);

  const now = new Date();
  const upcoming = allReminders
    .filter((r) => new Date(r.time) >= now)
    .sort((a, b) => new Date(a.time) - new Date(b.time))
    .slice(0, 3);

  const totalTasks = allReminders.length;
  const completedTasks = allReminders.filter((r) => r.triggered).length;

  return (
    <div className="h-screen flex flex-col max-w-md mx-auto bg-gradient-to-b">
      {/* Header */}
      <header className="p-4 pt-6 text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-1">Welcome !!</h1>
        <p className="text-gray-600 text-sm">Stay productive, one step at a time 🚀</p>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/tasks"
            className="border border-[#888] flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold shadow-lg hover:scale-105 transform transition-all"
          >
            <FaTasks size={20} /> Tasks
          </Link>
          <Link
            to="/notes"
            className="border border-[#888] flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold shadow-lg hover:scale-105 transform transition-all"
          >
            <FaStickyNote size={20} /> Notes
          </Link>
          <Link
            to="/reminders"
            className="border border-[#888] flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold shadow-lg hover:scale-105 transform transition-all"
          >
            <FaBell size={20} /> Reminders
          </Link>
          <Link
            to="/pomodoro"
            className="border border-[#888] flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold shadow-lg hover:scale-105 transform transition-all"
          >
            <FaClock size={20} /> Pomodoro
          </Link>
          <Link
            to="/calendar"
            className="border border-[#888] flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold shadow-lg hover:scale-105 transform transition-all col-span-2"
          >
            <FaCalendarAlt size={20} /> Calendar
          </Link>
        </div>

        {/* Stats Card */}
        <div className="bg-[#e6e6e6] rounded-2xl p-4 shadow-md border border-[#888] text-center transition-all">
          <h2 className="font-bold text-lg mb-2">Tasks Summary</h2>
          <div className="flex justify-around text-sm text-gray-600">
            <p>Total: <span className="font-semibold">{totalTasks}</span></p>
            <p>Completed: <span className="font-semibold">{completedTasks}</span></p>
            <p>Pending: <span className="font-semibold">{totalTasks - completedTasks}</span></p>
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-[#e6e6e6] rounded-2xl p-4 shadow-md border border-[#888] transition-all">
          <h2 className="font-semibold mb-2 text-center">Upcoming Reminders</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-400 text-sm text-center">No upcoming reminders</p>
          ) : (
            <ul className="space-y-2">
              {upcoming.map((r) => (
                <li
                  key={r.id}
                  className="flex justify-between items-center bg-purple-50 px-3 py-2 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <span className="font-medium truncate">{r.title}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(r.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quote Card */}
        <div className="bg-[#e6e6e6] border border-[#888] p-4 rounded-2xl shadow-md text-center italic text-gray-700 transition-all">
          "Focus on being productive instead of busy."
        </div>
      </main>
    </div>
  );
};

export default Home;
