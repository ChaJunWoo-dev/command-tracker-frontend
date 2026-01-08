import { forwardRef } from "react";

import PropTypes from "prop-types";

const VideoPlayer = forwardRef(({ url, onDuration }, ref) => {
  const handleLoadedMetadata = (e) => {
    if (onDuration) {
      onDuration(e.target.duration);
    }
  };

  return (
    <video
      ref={ref}
      src={url}
      controls
      onLoadedMetadata={handleLoadedMetadata}
      className="max-w-full w-[1080px] h-auto"
    />
  );
});

VideoPlayer.displayName = "VideoPlayer";

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  onDuration: PropTypes.func,
};

export default VideoPlayer;
