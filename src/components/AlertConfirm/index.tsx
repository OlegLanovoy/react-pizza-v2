import "./AlertConfirm.scss";

interface AlertConfirmProps {
  message?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

const AlertConfirm: React.FC<AlertConfirmProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  return (
    <>
      <div className="alert-confirm__overlay" onClick={handleOverlayClick}>
        <div className="alert-confirm__modal">
          <button className="alert-confirm__close" onClick={onCancel}>
            &times;
          </button>
          <p className="alert-confirm__message">{message}</p>
          <div className="alert-confirm__buttons">
            <button
              className="alert-confirm__button alert-confirm__button--confirm"
              onClick={onConfirm}
            >
              Of course
            </button>
            <button
              className="alert-confirm__button alert-confirm__button--cancel"
              onClick={onCancel}
            >
              No bro sorry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertConfirm;
