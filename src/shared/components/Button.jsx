import PropTypes from "prop-types";

const buttonClass = `
  text-white text-lg py-2 min-w-32 w-auto
  rounded bg-indigo-600
  hover:bg-indigo-700
  active:font-bold focus:outline-none
  disabled:bg-gray-400 disabled:cursor-not-allowed
  transition-colors duration-200
`;

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
