import PropTypes from "prop-types";

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
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">
            1. 분석할 캐릭터의 팀을 선택하세요
          </span>
          {selectedPosition && (
            <span className="text-sm text-indigo-500 font-medium">
              {selectedPosition === "left" ? "왼쪽 팀" : "오른쪽 팀"}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 bg-gray-50">
          <div className="flex justify-center items-center gap-6">
            <button
              type="button"
              onClick={() => onPositionSelect("left")}
              className={getButtonClass("left")}
            >
              왼쪽 팀
            </button>
            <div className="text-gray-400">|</div>
            <button
              type="button"
              onClick={() => onPositionSelect("right")}
              className={getButtonClass("right")}
            >
              오른쪽 팀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PositionSelection.propTypes = {
  selectedPosition: PropTypes.string,
  onPositionSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default PositionSelection;
