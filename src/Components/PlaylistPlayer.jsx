// "/TASKIFY/Nonsense.m4a",
// "/TASKIFY/Mexico.m4a",
import React, { useRef, useState, useEffect } from "react";

const PlaylistPlayer = ({ isRunning, resetTrigger }) => {
  const tracks = [
    { src: "/TASKIFY/Nonsense.m4a", name: "Nonsense" },
    { src: "/TASKIFY/Mexico.m4a", name: "Mexico" },
    { src: "/TASKIFY/Mera Mann.m4a", name: "Mera Mann" },
  ];


  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // for seek bar
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio(tracks[0].src));

  // Track events
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  // Sync play/pause with Pomodoro
  useEffect(() => {
    if (isRunning) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isRunning]);

  // Reset → start from first track, paused
  useEffect(() => {
    if (resetTrigger) {
      const audio = audioRef.current;
      setCurrentTrack(0);
      setIsPlaying(false);
      audio.pause();
      audio.src = tracks[0].src;
      audio.load();
      audio.currentTime = 0;
      setProgress(0);
      setDuration(audio.duration || 0);
    }
  }, [resetTrigger]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    const next = (currentTrack + 1) % tracks.length;
    setCurrentTrack(next);

    const audio = audioRef.current;
    audio.src = tracks[next].src;
    audio.load();
    audio.currentTime = 0;

    if (isPlaying || isRunning) audio.play().catch(() => { });
  };

  const handlePrev = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(prev);

    const audio = audioRef.current;
    audio.src = tracks[prev].src;
    audio.load();
    audio.currentTime = 0;

    if (isPlaying || isRunning) audio.play().catch(() => { });
  };

  // Seek handler
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = e.target.value;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-md">
      <p className="font-semibold">
        Now Playing: {tracks[currentTrack].name}
      </p>


      {/* Scrollable progress bar */}
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleSeek}
        className="w-full accent-blue-500"
      />

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⏮️ Prev
        </button>
        <button
          onClick={togglePlay}
          className={`px-4 py-2 w-20 rounded ${isPlaying ? "bg-yellow-500" : "bg-green-500"
            } text-white`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={handleNext}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⏭️ Next
        </button>
      </div>
    </div>
  );
};

export default PlaylistPlayer;
