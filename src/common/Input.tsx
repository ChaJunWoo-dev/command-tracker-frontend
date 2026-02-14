const inputClass = `
  flex-grow border border-gray-500 rounded-md px-3 py-3 focus:outline-[#E08345]
`;

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: () => void;
}

const Input = ({ type = "text", value, placeholder, onChange }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass}
    />
  );
};

export default Input;
