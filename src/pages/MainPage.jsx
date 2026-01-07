import { useState } from "react";

import { LuLoader, LuCircleCheck, LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import CharacterGrid from "@/features/Character/CharacterGrid";
import StepCard from "@/features/userGuide/components/StepCard";
import VideoUploader from "@/features/videoUpload/components/VideoUploader";
import ErrorModal from "@/shared/components/ErrorModal";
import champions from "@/shared/data/champions";

const MainPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (data) => {
    navigate("/video-editor", {
      state: {
        videoFile: data.file,
      },
    });
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="flex flex-col items-center py-5 px-4 w-full">
      <div className="mb-6">
        <img src="/imgs/logo.png" alt="Command Tracker Logo" className="h-32" />
      </div>
      <p className="text-gray-700 text-lg mb-10">
        캐릭터의 동작을 분석하고, 커맨드 입력을 추적합니다.
      </p>

      <VideoUploader
        onUploadSuccess={handleUploadSuccess}
        onError={handleError}
      />

      {error && (
        <ErrorModal
          onClose={() => setError(null)}
          onClick={() => setError(null)}
          message={error}
        />
      )}

      <section className="w-full max-w-3xl mt-16">
        <h2 className="text-xl font-semibold mb-6">사용 방법</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={<LuUpload className="h-10 w-10 text-indigo-500" />}
            title="1. 비디오 업로드"
            desc="분석할 비디오 파일을 선택하고 업로드하세요."
          />
          <StepCard
            icon={
              <LuLoader className="h-10 w-10 text-indigo-500 animate-spin" />
            }
            title="2. 분석 요청"
            desc="원하는 길이만큼 영상을 편집하고 제출해주세요."
          />
          <StepCard
            icon={<LuCircleCheck className="h-10 w-10 text-indigo-500" />}
            title="3. 결과 확인"
            desc="커맨드 해독 결과를 메일로 확인할 수 있습니다."
          />
        </div>

        <section className="w-full max-w-3xl mt-20">
          <h2 className="text-xl font-semibold mb-6">챔피언 목록</h2>
          <CharacterGrid list={champions} />
        </section>
      </section>
    </div>
  );
};

export default MainPage;
