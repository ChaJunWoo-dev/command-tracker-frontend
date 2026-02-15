import CardSection from "@/common/CardSection";

interface PositionSelectionProps {
  selectedPosition?: string;
  onPositionSelect: (position: string) => void;
}

const PositionSelection = ({
  selectedPosition,
  onPositionSelect,
}: PositionSelectionProps) => {
  const baseButtonClass =
    "border-none focus:outline-none px-6 py-3 rounded-md transition-colors";

  const getButtonClass = (position: string) => `
    ${baseButtonClass}
    ${selectedPosition === position ? "bg-indigo-500 text-white font-bold" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}
  `;

  return (
    <CardSection
      title="1. 분석할 캐릭터의 위치를 선택하세요"
      selectedValue={
        selectedPosition === "left"
          ? "왼쪽"
          : selectedPosition === "right"
            ? "오른쪽"
            : undefined
      }
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
    </CardSection>
  );
};

export default PositionSelection;
