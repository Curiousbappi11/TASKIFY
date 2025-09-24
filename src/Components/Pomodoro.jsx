import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startStop,
  reset,
  tick,
  complete,
  stopAlarmAndContinue,
  setCustomWork,
  setCustomBreak,
  apply,
} from "../features/pomodoroSlice";
import PlaylistPlayer from "./PlaylistPlayer";

function Pomodoro() {
  const dispatch = useDispatch();
  const {
    time,
    isRunning,
    isWork,
    customWork,
    customBreak,
    resetTrigger,
    showPopup,
  } = useSelector((state) => state.pomodoro);

  const audioRef = useRef(new Audio("/TASKIFY/reminderTone.mp3"));
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => dispatch(tick()), 1000);
    } else if (isRunning && time === 0) {
      dispatch(complete());
    }
    return () => clearInterval(timer);
  }, [isRunning, time, dispatch]);

  useEffect(() => {
    if (showPopup && userInteracted) {
      const audio = audioRef.current;
      audio.currentTime = 0;
      audio.loop = true;
      audio.play().catch(() => console.log("Autoplay blocked"));
    }
  }, [showPopup, userInteracted]);

  const handleStopAlarm = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    dispatch(stopAlarmAndContinue());
  };

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-b">
      {/* Session Badge */}
      <div className={`px-4 py-1 rounded-full text-white font-bold ${isWork ? "bg-red-500" : "bg-green-500"} ${isRunning ? "animate-pulse ":""}`}>
        {isWork ? "Work Session" : "Break Time"}
      </div>

      {/* Timer */}
      <div className={`text-8xl text-purple-600 font-extrabold ${isRunning ? "font-extrabold text-purple-600" : "text-gray-700"}`}>
        {formatTime(time)}
      </div>

      {/* Start / Pause / Reset Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            dispatch(startStop());
            setUserInteracted(true);
          }}
          className={`w-30 px-6 py-3 rounded-full text-white font-bold transition-transform transform hover:scale-105 ${isRunning ? "bg-pink-500 hover:bg-rose-500" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            dispatch(reset());
          }}
          className="w-30 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Custom Work / Break Inputs */}
      <div className="flex gap-6 mt-4 items-end">
        {/* Work */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold mb-1">Work (min)</label>
          <input
            type="number"
            min="0"
            value={customWork}
            onChange={(e) => dispatch(setCustomWork(e.target.value))}
            onBlur={() => {
              if (customWork === "" || isNaN(customWork)) dispatch(setCustomWork("0"));
            }}
            className="border-2 border-purple-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-300 rounded-lg px-3 py-1 w-24 text-center font-semibold"
          />
        </div>

        {/* Break */}
        <div className="flex flex-col items-center">
          <label className="block text-sm font-semibold mb-1">Break (min)</label>
          <input
            type="number"
            min="0"
            value={customBreak}
            onChange={(e) => dispatch(setCustomBreak(e.target.value))}
            onBlur={() => {
              if (customBreak === "" || isNaN(customBreak)) dispatch(setCustomBreak("0"));
            }}
            className="border-2 border-green-400 focus:border-green-600 focus:ring-1 focus:ring-green-300 rounded-lg px-3 py-1 w-24 text-center font-semibold"
          />
        </div>

        {/* Apply */}
        <button
          onClick={() => dispatch(apply())}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full font-bold transition-all"
        >
          Apply
        </button>
      </div>

      {/* Playlist Player */}
      <PlaylistPlayer isRunning={isRunning} resetTrigger={resetTrigger} />

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center animate-fadeIn">
            <h3 className="text-2xl font-bold mb-2">{isWork ? "Work session finished!" : "Break over!"}</h3>
            <p className="mb-4 text-gray-700">Time's up! ⏰</p>
            <button
              onClick={handleStopAlarm}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
            >
              Stop Alarm & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
