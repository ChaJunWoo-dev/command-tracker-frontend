import React from "react";

interface StepCardProps {
  icon: React.ReactElement;
  title: string;
  desc: string;
}

const StepCard = ({ icon, title, desc }: StepCardProps) => (
  <div className="flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow w-full">
    {icon}
    <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
    <p className="mt-2 text-center text-sm text-gray-400">{desc}</p>
  </div>
);

export default StepCard;
