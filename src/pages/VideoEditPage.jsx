import { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import TrimSlider from "@/features/videoEditor/components/TrimSlider";
import VideoPlayer from "@/features/videoEditor/components/VideoPlayer";
import useVideoEditor from "@/features/videoEditor/hooks/useVideoEditor";
import VideoSubmitModal from "@/features/videoSubmit/components/VideoSubmitModal";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/ErrorModal";
import LoadingModal from "@/shared/components/LoadingModal";

const VideoEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoWrapperRef = useRef(null);
  const { videoFile } = location.state || {};
  const [videoSrc, setVideoSrc] = useState();
  const [playerWidth, setPlayerWidth] = useState(0);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    trim,
    duration,
    playerRef,
    handleDuration,
    handleTrimChange,
    validateTrim,
  } = useVideoEditor();

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setError("영상을 불러올 수 없습니다. 다시 시도해주세요.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!videoWrapperRef.current || !videoSrc) {
      return () => {};
    }

    const obs = new ResizeObserver(([entry]) => {
      return setPlayerWidth(entry.contentRect.width);
    });

    obs.observe(videoWrapperRef.current);

    return () => obs.disconnect();
  }, [videoSrc]);

  const handleEdit = () => {
    try {
      validateTrim();
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message || "편집 요청 실패");
    }
  };

  const closeModal = () => {
    setStep(1);
    setIsModalOpen(false);
  };

  const closeError = () => {
    setError(null);

    if (!videoSrc) navigate("/");
  };

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
            <Button onClick={handleEdit}>편집 요청</Button>
          </div>
          {isModalOpen && !error && (
            <VideoSubmitModal
              trim={trim}
              closeModal={closeModal}
              setError={setError}
              step={step}
              setStep={setStep}
            />
          )}
        </div>
      )}
      {isLoading && <LoadingModal />}
      {error && (
        <ErrorModal onClose={closeError} onClick={closeError} message={error} />
      )}
    </>
  );
};

export default VideoEditor;
