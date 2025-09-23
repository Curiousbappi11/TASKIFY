import React, { useState, useEffect, useRef } from "react";
import PlaylistPlayer from "./PlaylistPlayer";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [customWork, setCustomWork] = useState('25');
  const [customBreak, setCustomBreak] = useState('5');
  const [resetTrigger, setResetTrigger] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const audioRef = useRef(new Audio("/TASKIFY/reminderTone.mp3"));

  // Timer countdown
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (isRunning && time === 0) {
      handleComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const handleComplete = () => {
    // 🔔 Play alarm
    audioRef.current.currentTime = 0;
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => { });

    setShowPopup(true);     // Show popup
    setIsRunning(false);    // ⛔ Pause timer
  };

  const handleStopAlarm = () => {
    // Stop ringtone
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setShowPopup(false);

    // ✅ Now switch mode only when popup is closed
    if (isWork) {
      setTime(customBreak * 60);
    } else {
      setTime(customWork * 60);
    }
    setIsWork(!isWork);
    setIsRunning(true); // Auto-start next session
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(customWork * 60);
    setIsWork(true);
    setShowPopup(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setResetTrigger((prev) => prev + 1); // Trigger reset in PlaylistPlayer
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-3xl font-bold">
        {isWork ? "Work Session" : "Break Time"}
      </h2>

      <div className="text-6xl font-mono">{formatTime(time)}</div>

      <div className="flex gap-4">
        <button
          onClick={handleStartStop}
          className="bg-blue-500 w-20 text-white px-4 py-2 rounded"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-4 mt-4 items-end">
  {/* Work Timer */}
  <div className="flex flex-col items-center">
    <label className="block text-[0.7rem]">Work (min)</label>
    <input
      type="number"
      min="0"
      value={customWork}
      onChange={(e) => setCustomWork(e.target.value)}
      onBlur={() => {
        if (customWork === "" || isNaN(customWork)) setCustomWork("0");
      }}
      className="border px-2 py-1 rounded w-20 text-center"
    />
  </div>

  {/* Break Timer */}
  <div className="flex flex-col items-center">
    <label className="block text-[0.7rem]">Break (min)</label>
    <input
      type="number"
      min="0"
      value={customBreak}
      onChange={(e) => setCustomBreak(e.target.value)}
      onBlur={() => {
        if (customBreak === "" || isNaN(customBreak)) setCustomBreak("0");
      }}
      className="border px-2 py-1 rounded w-20 text-center"
    />
  </div>

  {/* Apply Button */}
  <button
    onClick={() => {
      const work = Number(customWork) || 0;
      setTime(work * 60);
      setIsWork(true);
      handleReset();
    }}
    className="bg-green-600 text-white px-4 py-2 rounded self-end"
  >
    Apply
  </button>
</div>




      {/* <iframe
        src="https://audiomack.com//embed/rodyeon/song/nonsense"
        scrolling="no"
        width="100%"
        height="400"
        frameborder="0"
        allow="autoplay">
      </iframe> */}

      <PlaylistPlayer isRunning={isRunning} resetTrigger={resetTrigger} />

      {/* 🔔 Popup */}
      {
        showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
              <h3 className="text-xl font-bold mb-2">
                {isWork ? "Work session finished!" : "Break over!"}
              </h3>
              <p className="mb-4">Time’s up! ⏰</p>
              <button
                onClick={handleStopAlarm}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Stop Alarm & Continue
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default Pomodoro;