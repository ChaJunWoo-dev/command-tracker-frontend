import CardSection from "@/common/CardSection";

interface EmailInputProps {
  email: string;
  onEmailChange: (value: string) => void;
}

const EmailInput = ({
  email,
  onEmailChange,
}: EmailInputProps) => {
  return (
    <CardSection
      title="3. 이메일을 입력하세요"
      selectedValue={email}
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
    </CardSection>
  );
};

export default EmailInput;
