import { useState } from "react";

import { LuFilm, LuCircleCheck, LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import CharacterGrid from "@/common/character/characterGrid";
import StepCard from "./components/StepCard";
import VideoUploader from "./components/VideoUploader";
import ErrorModal from "@/common/ErrorModal";
import characters from "@/data/characters";

const MainPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (data) => {
    navigate("/video-edit", {
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

      <p className="text-gray-300 text-center text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
        SF6 영상 플레이 중{" "}
        <span className="font-semibold text-indigo-400">커맨드 입력</span>을
        <br className="hidden sm:block" /> 한눈에 확인하고 분석할 수 있습니다.
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
        <h2 className="text-xl font-semibold mb-6 text-white">사용 방법</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={<LuUpload className="h-10 w-10 text-indigo-500" />}
            title="1. 영상 업로드"
            desc="분석할 영상 파일을 선택하고 업로드하세요."
          />
          <StepCard
            icon={<LuFilm className="h-10 w-10 text-indigo-500" />}
            title="2. 분석 요청"
            desc="분석할 구간을 설정하고 제출하세요."
          />
          <StepCard
            icon={<LuCircleCheck className="h-10 w-10 text-indigo-500" />}
            title="3. 결과 확인"
            desc="커맨드 해독 결과를 이메일로 받아볼 수 있습니다."
          />
        </div>

        <section className="w-full max-w-3xl mt-20">
          <h2 className="text-xl font-semibold mb-2 text-white">SF6 캐릭터</h2>
          <p className="text-gray-400 text-sm mb-4">
            현재 분석 가능한 캐릭터 목록입니다.
          </p>
          <CharacterGrid list={characters} />
        </section>
      </section>
    </div>
  );
};

export default MainPage;
