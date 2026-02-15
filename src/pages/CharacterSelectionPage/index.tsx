import { useLocation, useNavigate } from "react-router-dom";

import CharacterSelection from "./components/CharacterSelection";
import EmailInput from "./components/EmailInput";
import PositionSelection from "./components/PositionSelection";
import useSubmit from "./hooks/useSubmit";
import Button from "@/common/Button";
import ErrorModal from "@/common/ErrorModal";
import LoadingOverlay from "@/common/LoadingOverlay";
import PageHeader from "@/common/PageHeader";
import useVideoEditStore from "@/store/videoEditStore";
import formatTime from "@/utils/formatTime";

const CharacterSelectionPage = () => {
  const { state } = useLocation() as { state: { videoFile: File } };
  const { videoFile } = state || {};

  const navigate = useNavigate();

  const trim = useVideoEditStore((state) => state.trim);
  const selectedCharacter = useVideoEditStore((state) => state.character);
  const selectedPosition = useVideoEditStore((state) => state.position);
  const email = useVideoEditStore((state) => state.email);

  const setCharacter = useVideoEditStore((state) => state.setCharacter);
  const setPosition = useVideoEditStore((state) => state.setPosition);
  const setEmail = useVideoEditStore((state) => state.setEmail);

  const { error, isSubmitting, submit, clearError } = useSubmit();

  const handleSubmit = () => {
    if (!selectedPosition || !selectedCharacter || !trim || !videoFile) return;
    submit({
      position: selectedPosition,
      character: selectedCharacter,
      email,
      trim,
      videoFile,
    });
  };

  if (!videoFile || !trim) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">비디오 정보가 없습니다.</p>
          <Button onClick={() => navigate("/")}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full space-y-4">
        <PageHeader title="캐릭터 선택" description="분석할 캐릭터 정보를 선택해주세요">
          {trim && (
            <div className="mt-3 inline-block px-4 py-2 bg-indigo-900/50 border border-indigo-700 rounded-md">
              <p className="text-sm font-medium text-indigo-200">
                편집 구간:{" "}
                <span className="font-bold">
                  {formatTime(trim[0])} ~ {formatTime(trim[1])}
                </span>
              </p>
            </div>
          )}
        </PageHeader>

        <PositionSelection
          selectedPosition={selectedPosition}
          onPositionSelect={setPosition}
        />

        <CharacterSelection
          selectedCharacter={selectedCharacter}
          onCharacterSelect={setCharacter}
        />

        <EmailInput
          email={email}
          onEmailChange={setEmail}
        />

        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() =>
              navigate("/video-edit", { state: { videoFile } })
            }
          >
            다시 편집하기
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedPosition || !selectedCharacter || !email}
          >
            제출하기
          </Button>
        </div>
      </div>

      {error && (
        <ErrorModal onClose={clearError} onClick={clearError} message={error} />
      )}

      {isSubmitting && <LoadingOverlay />}
    </>
  );
};

export default CharacterSelectionPage;
