import React from "react";

interface VideoPlayerProps {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onDuration: (duration: number) => void;
}
const VideoPlayer = ({ url, videoRef, onDuration }: VideoPlayerProps) => {
  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (onDuration) {
      onDuration(e.currentTarget.duration);
    }
  };

  return (
    <video
      ref={videoRef}
      src={url}
      controls
      onLoadedMetadata={handleLoadedMetadata}
      className="max-w-full h-auto"
    />
  );
};

export default VideoPlayer;
