import { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import TrimSlider from "./components/TrimSlider";
import VideoPlayer from "./components/VideoPlayer";
import useVideoEdit from "./hooks/useVideoEdit";
import Button from "@/common/Button";
import ErrorModal from "@/common/ErrorModal";
import LoadingModal from "@/common/LoadingModal";

const VideoEditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoWrapperRef = useRef(null);
  const { videoFile, trim: initialTrim } = location.state || {};
  const [videoSrc, setVideoSrc] = useState();
  const [playerWidth, setPlayerWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(!!videoFile);
  const [error, setError] = useState(null);

  const {
    trim,
    duration,
    playerRef,
    handleDuration,
    handleTrimChange,
    setTrim,
  } = useVideoEdit();

  useEffect(() => {
    if (!videoFile) {
      return;
    }

    const url = URL.createObjectURL(videoFile);
    setVideoSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [videoFile]);

  useEffect(() => {
    if (initialTrim && duration > 0) {
      setTrim(initialTrim);
    }
  }, [initialTrim, duration, setTrim]);

  useEffect(() => {
    if (!videoWrapperRef.current || !videoSrc) {
      return;
    }

    const measureWidth = () => {
      if (videoWrapperRef.current) {
        setPlayerWidth(videoWrapperRef.current.offsetWidth);
      }
    };

    const rafId = requestAnimationFrame(measureWidth);

    return () => cancelAnimationFrame(rafId);
  }, [videoSrc]);

  const handleEdit = () => {
    try {
      navigate("/character-selection", {
        state: { videoFile, trim },
      });
    } catch (err) {
      setError(err.message || "편집 요청 실패");
    }
  };

  const closeError = () => {
    setError(null);
  };

  if (!videoFile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">비디오 파일이 없습니다.</p>
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {videoSrc && (
        <div className="w-full flex flex-col items-center">
          <div className="space-y-6">
            <div ref={videoWrapperRef} className="w-fit mx-auto">
              <VideoPlayer
                ref={playerRef}
                url={videoSrc}
                onDuration={handleDuration}
              />
            </div>
            {playerWidth > 0 && duration > 0 && (
              <TrimSlider
                trim={trim}
                duration={duration}
                videoSrc={videoSrc}
                onChange={handleTrimChange}
                width={playerWidth}
                onLoadComplete={() => setIsLoading(false)}
              />
            )}
            <Button onClick={handleEdit}>다음</Button>
          </div>
        </div>
      )}
      {isLoading && <LoadingModal />}
      {error && (
        <ErrorModal onClose={closeError} onClick={closeError} message={error} />
      )}
    </>
  );
};

export default VideoEditPage;
