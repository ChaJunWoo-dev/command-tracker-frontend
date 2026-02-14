import React from "react";

const baseClass = `
  text-lg py-2 px-6 min-w-32 w-auto
  rounded
  active:font-bold focus:outline-none
  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white
  transition-colors duration-200
`;

const variants = {
  primary: "text-white bg-indigo-600 hover:bg-indigo-700",
  secondary: "text-indigo-300 bg-transparent hover:bg-indigo-900/30 border border-indigo-500",
};

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: keyof typeof variants;
  onClick: () => void;
}

const Button = ({
  children,
  disabled = false,
  className,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
