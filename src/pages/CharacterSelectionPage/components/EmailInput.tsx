import AccordionSection from "@/common/AccordionSection";

interface EmailInputProps {
  email: string;
  isOpen: boolean;
  onEmailChange: (value: string) => void;
  onToggle: () => void;
}

const EmailInput = ({
  email,
  isOpen,
  onEmailChange,
  onToggle,
}: EmailInputProps) => {
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

export default EmailInput;
