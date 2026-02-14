import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SubmitParams {
  position: string;
  character: string;
  email: string;
  trim: [number, number];
  videoFile: File;
}

const validate = (params: SubmitParams) => {
  if (!params.position) throw new Error("분석할 캐릭터 위치를 선택해주세요");
  if (!params.character) throw new Error("캐릭터를 선택해주세요");
  if (params.email.trim() === "") throw new Error("이메일을 입력해주세요");
  if (!params.trim) throw new Error("편집 구간이 없습니다.");
  if (!params.videoFile) throw new Error("비디오 파일이 없습니다.");
};

const useSubmit = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submit = async (params: SubmitParams) => {
    try {
      validate(params);
      setIsSubmitting(true);

      const response = await axios.post("/api/video/prepare", {
        trimStart: params.trim[0],
        trimEnd: params.trim[1],
        position: params.position,
        character: params.character,
        email: params.email,
      });
      const { uploadToken } = response.data;

      const formData = new FormData();
      formData.append("video", params.videoFile);

      await axios.post("/api/video/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${uploadToken}`,
        },
      });

      navigate("/submit-success", { state: { email: params.email } });
    } catch (err) {
      if (err instanceof Error && !(err as AxiosError).response) {
        setError(err.message);
      } else {
        const axiosError = err as AxiosError<{ message?: string }>;
        const serverMessage = axiosError.response?.data?.message;
        const defaultMessage =
          axiosError.response && axiosError.response.status >= 500
            ? "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            : "요청 처리 중 오류가 발생했습니다.";
        setError(serverMessage || defaultMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return { error, isSubmitting, submit, clearError };
};

export default useSubmit;
