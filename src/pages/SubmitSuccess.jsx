import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button";

const SubmitSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <img
        src="/imgs/background/ryu.png"
        alt="배경 이미지"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="relative space-y-4 max-w-md">
          <h1 className="text-3xl font-extrabold text-white">
            제출이 완료되었습니다!
          </h1>
          <p className="text-xl text-white font-medium">
            분석이 완료되면
            <span className="text-white font-bold">{state.email}</span>에서
            결과물을 보내드릴게요
          </p>
          <Button onClick={() => navigate("/")}>홈으로</Button>
        </div>
      </div>
    </>
  );
};

export default SubmitSuccess;
