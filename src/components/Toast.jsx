import "../styles/components/Toast.css";

function Toast({ toast }) {
  return (
    <div className={`toast toast-${toast.type}`}>
      <span>{toast.message}</span>
    </div>
  );
}

export default Toast;
