import { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import TrimSlider from "./components/TrimSlider";
import VideoPlayer from "./components/VideoPlayer";
import Button from "@/common/Button";
import ErrorModal from "@/common/ErrorModal";
import LoadingOverlay from "@/common/LoadingOverlay";
import PageHeader from "@/common/PageHeader";
import useVideoEditStore from "@/store/videoEditStore";
import useObjectUrl from "./hooks/useObjectUrl";
import useLoadingTimeout from "./hooks/useLoadingTimeout";

const VideoEditPage = () => {
  const { state } = useLocation() as { state: { videoFile: File } };
  const { videoFile } = state || {};

  const navigate = useNavigate();

  const playerRef = useRef<HTMLVideoElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!!videoFile);
  const [duration, setDuration] = useState(0);

  const trim = useVideoEditStore((state) => state.trim);
  const setTrim = useVideoEditStore((state) => state.setTrim);

  const videoSrc = useObjectUrl(videoFile);
  const timeoutError = useLoadingTimeout(isLoading);

  useEffect(() => {
    if (timeoutError) {
      setError(timeoutError);
      setIsLoading(false);
    }
  }, [timeoutError]);

  const roundToSliderStep = (seconds: number) => {
    return Math.round(seconds * 100) / 100;
  };

  const handleDuration = (videoDuration: number) => {
    const roundedDuration = roundToSliderStep(videoDuration);
    setDuration(roundedDuration);

    setTrim([0, roundedDuration]);
  };

  const handleTrimChange = (newTrim: number[]) => {
    const [newStart, newEnd] = newTrim;
    const [prevStart, prevEnd] = trim || [0, 0];

    const roundedTrim: [number, number] = [
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

  const handleEdit = () => {
    try {
      if (!trim) return;

      const MAX_TRIM_MINUTES = 30;
      const [start, end] = trim;
      const currentTrimMinutes = (end - start) / 60;
      if (currentTrimMinutes > MAX_TRIM_MINUTES) {
        setError("영상 길이는 최대 30분까지 지원합니다.");
        return;
      }

      navigate("/character-selection", {
        state: { videoFile },
      });
    } catch (err) {
      setError("편집에 실패했습니다.");
    }
  };

  const closeError = () => {
    setError(null);
    navigate("/");
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
        <div className="flex flex-col items-center w-full">
          <PageHeader title="영상 편집" description="분석할 구간을 설정하세요" />
          <div className="w-full bg-gray-800 rounded-lg p-6 space-y-6">
            <VideoPlayer
              videoRef={playerRef}
              url={videoSrc}
              onDuration={handleDuration}
            />
            {duration > 0 && (
              <TrimSlider
                trim={trim}
                duration={duration}
                videoSrc={videoSrc}
                onChange={handleTrimChange}
                onLoadComplete={() => setIsLoading(false)}
              />
            )}
          </div>
          <div className="w-full flex justify-end mt-6">
            <Button onClick={handleEdit}>다음</Button>
          </div>
        </div>
      )}
      {isLoading && <LoadingOverlay />}
      {error && (
        <ErrorModal onClose={closeError} onClick={closeError} message={error} />
      )}
    </>
  );
};

export default VideoEditPage;
