import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/common/Button";
import useVideoEditStore from "@/store/videoEditStore";

const SubmitSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const reset = useVideoEditStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <>
      <img
        src="/imgs/background/ryu.png"
        alt="배경 이미지"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="relative space-y-4 max-w-md">
          <h1 className="text-3xl font-bold text-white">
            제출이 완료되었습니다!
          </h1>
          <p className="text-xl text-white font-medium">
            분석이 완료되면 아래 이메일로 영상 링크를 보내드릴게요.
          </p>
          <span className="text-white font-medium">{state.email}</span>

          <Button onClick={() => navigate("/")}>홈으로</Button>
        </div>
      </div>
    </>
  );
};

export default SubmitSuccess;
