import React, { useState, useEffect } from "react";

const PomodoroPreview = ({ workMinutes = 25, breakMinutes = 5 }) => {
  const [time, setTime] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime(prev => prev - 1), 1000);
    } else if (isRunning && time === 0) {
      // Auto switch mode
      if (isWork) setTime(breakMinutes * 60);
      else setTime(workMinutes * 60);
      setIsWork(!isWork);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, isWork, workMinutes, breakMinutes]);

  const formatTime = sec => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-semibold text-sm">{isWork ? "Work" : "Break"}</span>
      <span className="text-xl font-mono">{formatTime(time)}</span>
      <button
        onClick={handleStartPause}
        className={`px-3 py-1 rounded ${isRunning ? "bg-yellow-500" : "bg-green-500"} text-white text-sm`}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroPreview;
