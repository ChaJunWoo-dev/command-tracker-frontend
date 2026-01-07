import { useState } from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import LoadingModal from "@/shared/components/LoadingModal";
import Modal from "@/shared/components/Modal";

import CharacterSelectFrom from "./CharacterSelectForm";
import EmailInputForm from "./EmailInputForm";

const VideoSubmitModal = ({
  videoId,
  trim,
  closeModal,
  setError,
  step,
  setStep,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (email.trim() === "") {
        throw new Error("이메일을 입력해주세요");
      }

      if (!videoId) {
        throw new Error("비디오 ID가 없습니다.");
      }

      setIsLoading(true);

      await axios.post("/api/edit", {
        videoId,
        trimStart: trim[0],
        trimEnd: trim[1],
        email,
        selectedCharacter,
      });

      setIsLoading(false);
      setStep(1);
      setSelectedCharacter(null);
      setEmail("");

      navigate("/submit-success", { state: { email, selectedCharacter } });
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  const selectCharacter = () => {
    try {
      if (!selectedCharacter) {
        throw new Error("캐릭터를 선택해주세요");
      }

      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const goToPreviousStep = () => {
    setStep(1);
  };

  return (
    <>
      <Modal
        onClose={closeModal}
        onClick={step === 1 ? selectCharacter : handleSubmit}
        buttonText={step === 1 ? "다음" : "제출"}
      >
        {step === 1 ? (
          <CharacterSelectFrom
            selectedCharacter={selectedCharacter}
            onCharacterSelect={setSelectedCharacter}
          />
        ) : (
          <EmailInputForm
            email={email}
            onEmailChange={setEmail}
            goToPreviousStep={goToPreviousStep}
          />
        )}
      </Modal>
      {isLoading && <LoadingModal />}
    </>
  );
};

VideoSubmitModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  trim: PropTypes.arrayOf(PropTypes.number).isRequired,
  closeModal: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
};

export default VideoSubmitModal;
