import { IoCloseOutline } from "react-icons/io5";

import Button from "./Button";
import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClick: () => void;
  onClose: () => void;
  buttonText?: string;
}

const Modal = ({
  children,
  onClick,
  onClose,
  buttonText = "확인",
}: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60">
      <div className="py-8 px-10 bg-gray-800 border border-gray-700 rounded-lg relative space-y-6 max-w-md w-full mx-4">
        <IoCloseOutline
          className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
        />
        {children}
        <div className="flex justify-center">
          <Button variant="secondary" onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
