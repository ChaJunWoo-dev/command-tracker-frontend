import Modal from "./Modal";

interface ErrorModalProps {
  message: string;
  onClose: () => void;
  onClick: () => void;
}

const ErrorModal = ({ message, onClose, onClick }: ErrorModalProps) => {
  return (
    <Modal onClose={onClose} onClick={onClick}>
      <p className="text-lg text-red-600">{message}</p>
    </Modal>
  );
};

export default ErrorModal;
