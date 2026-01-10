import { useState } from "react";

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import CharacterSelection from "@/features/characterSelection/components/CharacterSelection";
import EmailInput from "@/features/characterSelection/components/EmailInput";
import PositionSelection from "@/features/characterSelection/components/PositionSelection";
import Button from "@/shared/components/Button";
import ErrorModal from "@/shared/components/ErrorModal";

const CharacterSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoFile, trim } = location.state || {};

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({
    Position: true,
    character: false,
    email: false,
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePositionSelect = (Position) => {
    setSelectedPosition(Position);
    setOpenSections({ Position: false, character: true, email: false });
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
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
      setError(err.response?.data?.message || err.message);
    }
  };

  const closeError = () => {
    setError(null);
  };

  const toggleSection = (section) => setOpenSections({ [section]: true });

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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900">캐릭터 선택</h1>
              <p className="mt-2 text-gray-600">
                분석할 캐릭터 정보를 선택해주세요
              </p>
              {trim && (
                <div className="mt-3 inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-900">
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

            <div className="px-6 py-6 bg-white flex gap-4">
              <Button
                onClick={() =>
                  navigate("/video-edit", { state: { videoFile, trim } })
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
