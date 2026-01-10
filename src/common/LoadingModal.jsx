const LoadingModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="rounded-md flex flex-col items-center">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip [animation-delay:0ms]" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip [animation-delay:300ms]" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip [animation-delay:900ms]" />
          <div className="h-4 w-4 rounded-full bg-gray-400 animate-dot-flip [animation-delay:600ms]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
