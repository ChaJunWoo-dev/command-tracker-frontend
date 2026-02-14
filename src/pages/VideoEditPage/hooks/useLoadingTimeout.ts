import { useEffect, useState } from "react";

const useLoadingTimeout = (isLoading: boolean) => {
  const [timeoutError, setTimeoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setTimeoutError(
        "영상 로딩 실패: 파일이 손상되었거나 지원되지 않는 형식입니다."
      );
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return timeoutError;
};

export default useLoadingTimeout;
