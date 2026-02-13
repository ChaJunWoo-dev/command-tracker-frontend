import AccordionSection from "@/common/AccordionSection";

interface PositionSelectionProps {
  selectedPosition: string;
  isOpen: boolean;
  onPositionSelect: (position: string) => void;
  onToggle: () => void;
}

const PositionSelection = ({
  selectedPosition,
  isOpen,
  onPositionSelect,
  onToggle,
}: PositionSelectionProps) => {
  const baseButtonClass =
    "border-none focus:outline-none px-6 py-3 rounded-md transition-colors";

  const getButtonClass = (position: string) => `
    ${baseButtonClass}
    ${selectedPosition === position ? "bg-indigo-500 text-white font-bold" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
  `;

  return (
    <AccordionSection
      title="1. 분석할 캐릭터의 위치를 선택하세요"
      selectedValue={
        selectedPosition === "left"
          ? "왼쪽"
          : selectedPosition === "right"
            ? "오른쪽"
            : undefined
      }
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="flex justify-center items-center gap-6">
        <button
          type="button"
          onClick={() => onPositionSelect("left")}
          className={getButtonClass("left")}
        >
          왼쪽
        </button>
        <div className="text-gray-400">|</div>
        <button
          type="button"
          onClick={() => onPositionSelect("right")}
          className={getButtonClass("right")}
        >
          오른쪽
        </button>
      </div>
    </AccordionSection>
  );
};

export default PositionSelection;
