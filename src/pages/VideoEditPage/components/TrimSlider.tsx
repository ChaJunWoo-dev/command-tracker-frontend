import formatTime from "@/utils/formatTime";
import { useEffect, useRef, useState } from "react";

import { Range } from "react-range";

const THUMB_COUNT = 10;
const THUMB_H = 60;

interface TrimSliderProps {
  trim: [number, number];
  duration: number;
  videoSrc: string;
  onChange: (newTrim: number[]) => void;
  onLoadComplete: () => void;
}

const TrimSlider = ({
  trim,
  duration,
  videoSrc,
  onChange,
  onLoadComplete,
}: TrimSliderProps) => {
  const [thumbs, setThumbs] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.load();

    const canvas = document.createElement("canvas");

    videoRef.current = video;
    canvasRef.current = canvas;

    return () => {
      video.src = "";
      videoRef.current = null;
      canvasRef.current = null;
    };
  }, [videoSrc]);

  useEffect(() => {
    if (
      !videoSrc ||
      !duration ||
      !videoRef.current ||
      !canvasRef.current ||
      thumbs.length > 0
    ) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const captureFrame = () => {
      canvas.width = 160;
      canvas.height = (video.videoHeight / video.videoWidth) * 160;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.55);
    };

    const seekToTime = (time: number) =>
      new Promise<string>((resolve) => {
        video.addEventListener("seeked", () => resolve(captureFrame()), {
          once: true,
        });
        video.currentTime = time;
      });

    const generateThumbnails = async () => {
      const thumbCount = THUMB_COUNT;
      const thumbnails = [];

      for (let i = 0; i < thumbCount; i++) {
        const timestamp = (duration * i) / (thumbCount - 1);
        thumbnails.push(await seekToTime(timestamp));
      }

      setThumbs(thumbnails);
      onLoadComplete?.();
    };

    const onMetadataLoaded = () => {
      generateThumbnails();
    };

    if (video.readyState >= 1) {
      generateThumbnails();
    } else {
      video.addEventListener("loadedmetadata", onMetadataLoaded, {
        once: true,
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
    };
  }, [videoSrc, duration, onLoadComplete]);

  return (
    <div className="w-full select-none">
      <div
        className="relative rounded-lg overflow-hidden border-2 border-gray-700"
        style={{ height: THUMB_H }}
      >
        <div className="flex w-full h-full pointer-events-none">
          {thumbs.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="thumb"
              style={{
                width: `${100 / thumbs.length}%`,
              }}
              className="h-full object-cover"
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right,
              rgba(0,0,0,0.7) 0%,
              rgba(0,0,0,0.7) ${(trim[0] / duration) * 100}%,
              transparent ${(trim[0] / duration) * 100}%,
              transparent ${(trim[1] / duration) * 100}%,
              rgba(0,0,0,0.7) ${(trim[1] / duration) * 100}%,
              rgba(0,0,0,0.7) 100%)`,
          }}
        />

        <Range
          step={0.01}
          min={0}
          max={duration || 1}
          values={trim}
          onChange={onChange}
          disabled={!duration}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="absolute inset-0"
              style={{
                ...props.style,
              }}
            >
              {children}
              <div
                className="absolute border-t-[3px] border-b-[3px] border-yellow-400"
                style={{
                  left: `${(trim[0] / (duration || 1)) * 100}%`,
                  right: `${100 - (trim[1] / (duration || 1)) * 100}%`,
                  top: 0,
                  bottom: 0,
                }}
              />
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={props.key}
              className="w-1 bg-yellow-400 cursor-ew-resize focus:outline-none"
              style={{
                ...props.style,
                height: THUMB_H,
              }}
              title={formatTime(trim[index])}
            />
          )}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-300">
        <span>{formatTime(trim[0])}</span>
        <span>{formatTime(trim[1])}</span>
      </div>
    </div>
  );
};

export default TrimSlider;
