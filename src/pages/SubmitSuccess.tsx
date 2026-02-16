import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuCircleCheck, LuMail } from "react-icons/lu";

import Button from "@/common/Button";
import useVideoEditStore from "@/store/videoEditStore";

const SubmitSuccess = () => {
  const { state } = useLocation() as { state: { email: string } };
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-10 max-w-md w-full text-center space-y-6 border border-gray-700">
          <div className="flex justify-center">
            <LuCircleCheck className="h-16 w-16 text-green-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              제출이 완료되었습니다!
            </h1>
            <p className="text-gray-300">
              분석이 완료되면 아래 이메일로 영상를 보내드릴게요.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-gray-800 rounded-lg px-4 py-3 border border-gray-600">
            <LuMail className="h-5 w-5 text-indigo-400" />
            <span className="text-indigo-300 font-medium">{state.email}</span>
          </div>

          <Button onClick={() => navigate("/")}>홈으로</Button>
        </div>
      </div>
    </>
  );
};

export default SubmitSuccess;
