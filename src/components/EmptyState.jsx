import "../styles/components/EmptyState.css";

function EmptyState({ title, text, onCreate }) {
  return (
    <div className="empty-state panel">
      <h2>{title}</h2>
      <p>{text}</p>
      {onCreate && (
        <button className="primary-button" onClick={onCreate}>
          Add task
        </button>
      )}
    </div>
  );
}

export default EmptyState;
