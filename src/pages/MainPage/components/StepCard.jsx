import PropTypes from "prop-types";

const StepCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow w-full">
    {icon}
    <h3 className="mt-4 text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-center text-sm text-gray-600">{desc}</p>
  </div>
);

StepCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default StepCard;
