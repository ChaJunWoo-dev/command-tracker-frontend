import { useState, useRef } from "react";

const roundToSliderStep = (seconds) => {
  return Math.round(seconds * 100) / 100;
};

const useVideoEdit = () => {
  const [trim, setTrim] = useState([0, 0]);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handleDuration = (videoDuration) => {
    const roundedDuration = roundToSliderStep(videoDuration);
    setDuration(roundedDuration);
    setTrim([0, roundedDuration]);
  };

  const handleTrimChange = (newTrim) => {
    const [newStart, newEnd] = newTrim;
    const [prevStart, prevEnd] = trim;

    const roundedTrim = [
      roundToSliderStep(newStart),
      roundToSliderStep(newEnd),
    ];

    setTrim(roundedTrim);

    if (playerRef.current) {
      if (newStart !== prevStart) {
        playerRef.current.currentTime = roundedTrim[0];
      } else if (newEnd !== prevEnd) {
        playerRef.current.currentTime = roundedTrim[1];
      }
    }
  };

  return {
    trim,
    setTrim,
    duration,
    playerRef,
    handleDuration,
    handleTrimChange,
  };
};

export default useVideoEdit;
