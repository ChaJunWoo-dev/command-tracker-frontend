import React from "react";

const buttonClass = `
  text-white text-lg py-2 min-w-32 w-auto
  rounded bg-indigo-600
  hover:bg-indigo-700
  active:font-bold focus:outline-none
  disabled:bg-gray-400 disabled:cursor-not-allowed
  transition-colors duration-200
`;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, disabled = false }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

export default Button;
