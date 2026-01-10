import PropTypes from "prop-types";

const EmailInput = ({ email, onEmailChange, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">3. 이메일을 입력하세요</span>
          {email && (
            <span className="text-sm text-indigo-500 font-medium">{email}</span>
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
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500">
            분석 완료 시 위 이메일로 결과를 보내드립니다.
          </p>
        </div>
      </div>
    </div>
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default EmailInput;
