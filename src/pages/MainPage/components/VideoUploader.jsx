import { useState, useRef } from "react";
import { LuUpload } from "react-icons/lu";

import Button from "@/common/Button";
import LoadingModal from "@/common/LoadingModal";

const MAX_SIZE = 500 * 1024 * 1024;

const VideoUploader = ({ onUploadSuccess, onError }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file.type.startsWith("video/")) {
      onError("비디오 파일만 업로드 가능합니다.");
      return false;
    }

    if (file.size > MAX_SIZE) {
      onError("영상 파일이 너무 큽니다. 최대 500MB까지 업로드 가능합니다.");
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      onError("파일을 선택해주세요.");
      return;
    }

    try {
    setIsUploading(true);

    await onUploadSuccess({ file: selectedFile });
  } catch (err) {
    onError("업로드에 실패했습니다.");
  } finally {
    setIsUploading(false);
  }
  };

  return (
    <>
      {isUploading && <LoadingModal />}
      <div className="w-full max-w-2xl">
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 transition-colors
            ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50"}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <LuUpload
              className={`h-12 w-12 ${isDragging ? "text-indigo-500" : "text-gray-400"}`}
            />

            <div className="text-center">
              <p className="text-lg font-medium text-gray-700 mb-1">
                {selectedFile
                  ? selectedFile.name
                  : "비디오 파일을 드래그하거나 클릭하세요"}
              </p>
              <p className="text-sm text-gray-500">
                지원 형식: MP4, AVI, MOV, MKV 등
              </p>
              <p className="text-sm text-gray-500">
                크기: 최대 500MB
              </p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              파일 선택
            </Button>

            {selectedFile && (
              <Button
                onClick={handleFileUpload}
                className="mt-2"
                disabled={isUploading}
              >
                업로드
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoUploader;
