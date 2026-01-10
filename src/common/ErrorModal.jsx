import PropTypes from "prop-types";

import Modal from "./Modal";

const ErrorModal = ({ onClose, message, onClick }) => {
  return (
    <Modal onClose={onClose} onClick={onClick}>
      <p className="text-lg text-red-600">{message}</p>
    </Modal>
  );
};

ErrorModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;
