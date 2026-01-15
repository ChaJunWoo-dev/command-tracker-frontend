import { useState } from "react";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import CharacterSelection from "./components/CharacterSelection";
import EmailInput from "./components/EmailInput";
import PositionSelection from "./components/PositionSelection";
import Button from "@/common/Button";
import ErrorModal from "@/common/ErrorModal";
import useVideoEditStore from "@/store/videoEditStore";

const CharacterSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoFile } = location.state || {};

  const trim = useVideoEditStore((state) => state.trim);
  const selectedCharacter = useVideoEditStore((state) => state.character);
  const selectedPosition = useVideoEditStore((state) => state.position);
  const email = useVideoEditStore((state) => state.email);
  const setCharacter = useVideoEditStore((state) => state.setCharacter);
  const setPosition = useVideoEditStore((state) => state.setPosition);
  const setEmail = useVideoEditStore((state) => state.setEmail);

  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({
    Position: !selectedPosition,
    character: selectedPosition && !selectedCharacter,
    email: selectedPosition && selectedCharacter,
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePositionSelect = (Position) => {
    setPosition(Position);
    setOpenSections({ Position: false, character: true, email: false });
  };

  const handleCharacterSelect = (character) => {
    setCharacter(character);
    setOpenSections({ Position: false, character: false, email: true });
  };

  const handleSubmit = async () => {
    try {
      if (!selectedPosition) {
        throw new Error("분석할 캐릭터 위치를 선택해주세요");
      }
      if (!selectedCharacter) {
        throw new Error("캐릭터를 선택해주세요");
      }
      if (email.trim() === "") {
        throw new Error("이메일을 입력해주세요");
      }
      if (!videoFile) {
        throw new Error("비디오 파일이 없습니다.");
      }

      const response = await axios.post("/api/edit-video/prepare", {
        trimStart: trim[0],
        trimEnd: trim[1],
        position: selectedPosition,
        character: selectedCharacter,
        email: email,
      });

      const { uploadToken } = response.data;

      const formData = new FormData();
      formData.append("video", videoFile);

      await axios.post(`/api/edit-video/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${uploadToken}`,
        },
      });

      navigate("/submit-success", { state: { email } });
    } catch (err) {
      if (!err.response) {
        setError("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
      } else {
        const serverMessage = err.response?.data?.message;
        const defaultMessage =
          err.response.status >= 500
            ? "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            : "요청 처리 중 오류가 발생했습니다.";
        setError(serverMessage || defaultMessage);
      }
    }
  };

  const closeError = () => {
    setError(null);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-700">
              <h1 className="text-3xl font-bold text-white">캐릭터 선택</h1>
              <p className="mt-2 text-gray-300">
                분석할 캐릭터 정보를 선택해주세요
              </p>
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
            </div>

            <PositionSelection
              selectedPosition={selectedPosition}
              onPositionSelect={handlePositionSelect}
              isOpen={openSections.Position}
              onToggle={() => toggleSection("Position")}
            />

            <CharacterSelection
              selectedCharacter={selectedCharacter}
              onCharacterSelect={handleCharacterSelect}
              isOpen={openSections.character}
              onToggle={() => toggleSection("character")}
            />

            <EmailInput
              email={email}
              onEmailChange={setEmail}
              isOpen={openSections.email}
              onToggle={() => toggleSection("email")}
            />

            <div className="px-6 py-6 bg-gray-800 flex gap-4">
              <Button
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
        </div>
      </div>

      {error && (
        <ErrorModal onClose={closeError} onClick={closeError} message={error} />
      )}
    </>
  );
};

export default CharacterSelectionPage;
