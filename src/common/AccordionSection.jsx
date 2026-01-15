import PropTypes from "prop-types";

const AccordionSection = ({ title, selectedValue, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-700">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">{title}</span>
          {selectedValue && (
            <span className="text-sm text-indigo-500 font-medium">
              {selectedValue}
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
        <div className="px-6 py-6 bg-gray-900">{children}</div>
      </div>
    </div>
  );
};

AccordionSection.propTypes = {
  title: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccordionSection;
