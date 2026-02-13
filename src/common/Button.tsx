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
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

const Button = ({
  children,
  disabled = false,
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
