const VideoPlayer = ({ url }) => {
  return (
    <video
      src={url}
      controls
      width="1080"
      height="640"
    />
  );
};

export default VideoPlayer;
