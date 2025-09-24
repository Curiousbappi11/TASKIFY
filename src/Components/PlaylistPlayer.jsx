// "/TASKIFY/Nonsense.m4a",
// "/TASKIFY/Mexico.m4a",
import React, { useRef, useState, useEffect } from "react";

const PlaylistPlayer = ({ isRunning, resetTrigger }) => {
  const tracks = [
    { src: "/TASKIFY/musics/Nonsense.m4a", name: "Nonsense" },
    { src: "/TASKIFY/musics/Mexico.m4a", name: "Mexico" },
    { src: "/TASKIFY/musics/Mera Mann.m4a", name: "Mera Mann" },
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
      // directly go to next track
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    // ✅ important: remove old listener before adding new one
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, isPlaying, isRunning]); // added deps


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

    if (isRunning || isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(() => { });
    }
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

  const formatTime = (sec) => {
    if (isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };


  return (
    <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-md">
      <p className="font-semibold">
        Now Playing: {tracks[currentTrack].name}
      </p>


      {/* Scrollable progress bar */}
      <div className="flex items-center gap-2 w-full">
        {/* Current time */}
        <div className="text-xs w-10 text-left">
          {formatTime(progress)}
        </div>

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-blue-500"
        />

        {/* Total duration */}
        <div className="text-xs w-10">
          {formatTime(duration)}
        </div>
      </div>


      <div className="flex">
        <button
          onClick={handlePrev}
          className="text-orange-500 px-4 py-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
          </svg>

        </button>
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-full ${isPlaying ? "text-green-500" : "text-amber-500"}`}
        >
          {isPlaying ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>

          }
        </button>
        <button
          onClick={handleNext}
          className="text-blue-600 px-4 py-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
          </svg>

        </button>
      </div>
    </div>
  );
};

export default PlaylistPlayer;
