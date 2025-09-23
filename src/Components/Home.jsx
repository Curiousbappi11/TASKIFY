import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import PomodoroPreview from "./PomodoroPreview";

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
    <div className="h-screen flex flex-col max-w-sm mx-auto">
      {/* Fixed Header */}
      <header className="p-4">
        <h1 className="text-2xl font-bold text-center">Taskify</h1>
        <p className="text-gray-600 text-center text-sm">
          Stay productive, one step at a time 🚀
        </p>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 p-4 flex flex-col gap-4">
        {/* Quick Navigation */}
        <div className="flex flex-col gap-3">
          <Link
            to="/pomodoro"
            className="bg-blue-500 text-white rounded-xl py-3 text-center text-lg font-semibold shadow-md active:scale-95"
          >
            Pomodoro
          </Link>
          <Link
            to="/calendar"
            className="bg-green-500 text-white rounded-xl py-3 text-center text-lg font-semibold shadow-md active:scale-95"
          >
            Calendar
          </Link>
          <Link
            to="/reminders"
            className="bg-yellow-500 text-white rounded-xl py-3 text-center text-lg font-semibold shadow-md active:scale-95"
          >
            Reminders
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-gray-100 p-3 rounded-xl shadow text-center">
          <h2 className="font-semibold mb-1">Tasks Summary</h2>
          <p className="text-sm">Total: {totalTasks}</p>
          <p className="text-sm">Completed: {completedTasks}</p>
          <p className="text-sm">Pending: {totalTasks - completedTasks}</p>
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-gray-100 p-3 rounded-xl shadow">
          <h2 className="font-semibold mb-2 text-center">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No upcoming reminders
            </p>
          ) : (
            <ul className="text-sm space-y-1">
              {upcoming.map((r) => (
                <li key={r.id} className="flex justify-between">
                  <span className="font-medium truncate">{r.title}</span>
                  <span className="text-gray-600 text-xs">
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

        {/* Pomodoro Preview */}
        <div className="bg-gray-100 p-3 rounded-xl shadow">
          <h2 className="font-semibold text-center mb-2">Pomodoro Preview</h2>
          <PomodoroPreview />
        </div>

        {/* Quote */}
        <div className="bg-purple-100 p-3 rounded-xl text-center">
          <p className="italic text-gray-700 text-sm">
            "Focus on being productive instead of busy."
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
