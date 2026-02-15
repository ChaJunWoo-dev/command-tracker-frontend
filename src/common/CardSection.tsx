import React from "react";

interface CardSectionProps {
  title: string;
  selectedValue?: string;
  children: React.ReactNode;
}

const CardSection = ({ title, selectedValue, children }: CardSectionProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">{title}</span>
        {selectedValue && (
          <span className="text-sm text-indigo-400 font-medium">
            {selectedValue}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default CardSection;
