import PropTypes from "prop-types";

const VideoPlayer = ({ url, onDuration, videoRef }) => {
  const handleLoadedMetadata = (e) => {
    if (onDuration) {
      onDuration(e.target.duration);
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

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  onDuration: PropTypes.func,
  videoRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default VideoPlayer;
