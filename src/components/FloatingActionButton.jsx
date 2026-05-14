import "../styles/components/FloatingActionButton.css";

function FloatingActionButton({ onClick }) {
  return (
    <button className="floating-action-button" onClick={onClick} aria-label="Add task" title="Add task">
      Add
    </button>
  );
}

export default FloatingActionButton;
