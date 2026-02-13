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
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="py-4 px-6 bg-white rounded-md relative space-y-4">
        <IoCloseOutline
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={onClose}
        />
        {children}
        <Button onClick={onClick}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default Modal;
