import React from "react";

interface VideoPlayerProps {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement>;
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
      className="max-w-full w-[1080px] h-auto"
    />
  );
};

export default VideoPlayer;
