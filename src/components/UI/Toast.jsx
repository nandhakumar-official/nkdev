const Toast = ({ show, message, type, onClose }) => {
  if (!show) return null;

  return (
    <div className={`toast ${type} show`}>
      <span>{type === "success" ? "✓" : "✕"}</span>

      <span className="toast-message">{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
