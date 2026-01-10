import PropTypes from "prop-types";

import champions from "@/shared/data/champions";

const CharacterSelection = ({
  selectedCharacter,
  onCharacterSelect,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">
            2. 분석할 캐릭터를 선택하세요
          </span>
          {selectedCharacter && (
            <span className="text-sm text-indigo-500 font-medium">
              {selectedCharacter}
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
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 bg-gray-50">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {champions.map(({ name, src, isSupported }) => (
              <button
                key={name}
                type="button"
                onClick={() => isSupported && onCharacterSelect(name)}
                disabled={!isSupported}
                className={`flex flex-col items-center text-xs font-medium transition-all ${
                  selectedCharacter === name
                    ? "ring-2 ring-indigo-500 ring-offset-2"
                    : ""
                } ${
                  isSupported
                    ? "cursor-pointer hover:scale-105"
                    : "opacity-50 grayscale cursor-not-allowed"
                }`}
              >
                <img
                  src={src}
                  alt={name}
                  className="w-14 h-14 rounded object-cover shadow"
                />
                <span className="truncate w-14 text-center mt-1">{name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CharacterSelection.propTypes = {
  selectedCharacter: PropTypes.string,
  onCharacterSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CharacterSelection;
