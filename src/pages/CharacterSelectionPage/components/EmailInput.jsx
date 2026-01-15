import PropTypes from "prop-types";

import AccordionSection from "@/common/AccordionSection";

const EmailInput = ({ email, onEmailChange, isOpen, onToggle }) => {
  return (
    <AccordionSection
      title="3. 이메일을 입력하세요"
      selectedValue={email}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="example@email.com"
        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <p className="mt-2 text-sm text-gray-400">
        분석이 끝나면 위 이메일로 결과를 보내드립니다.
      </p>
    </AccordionSection>
  );
};

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default EmailInput;
