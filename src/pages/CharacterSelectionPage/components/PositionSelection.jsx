import PropTypes from "prop-types";

import AccordionSection from "@/common/AccordionSection";

const PositionSelection = ({
  selectedPosition,
  onPositionSelect,
  isOpen,
  onToggle,
}) => {
  const baseButtonClass =
    "border-none focus:outline-none px-6 py-3 rounded-md transition-colors";

  const getButtonClass = (position) => `
    ${baseButtonClass}
    ${selectedPosition === position ? "bg-indigo-500 text-white font-bold" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
  `;

  return (
    <AccordionSection
      title="1. 분석할 캐릭터의 위치를 선택하세요"
      selectedValue={selectedPosition === "left" ? "왼쪽" : selectedPosition === "right" ? "오른쪽" : null}
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

PositionSelection.propTypes = {
  selectedPosition: PropTypes.string,
  onPositionSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default PositionSelection;
