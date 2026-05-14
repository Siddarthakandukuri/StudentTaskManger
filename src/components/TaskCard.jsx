import { useTasks } from "../hooks/useTasks";
import { formatDate, getDueState } from "../utils/formatters";
import "../styles/components/TaskCard.css";

function TaskCard({ task, index = 0, onEdit }) {
  const { deleteTask, toggleComplete } = useTasks();
  const dueState = getDueState(task.dueDate, task.completed);

  return (
    <article
      className={`task-card ${task.completed ? "is-complete" : ""}`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="task-card-top">
        <span className={`status-dot ${task.completed ? "done" : "open"}`} />
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-card-body">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>

      <div className="task-card-footer">
        <span className={`due-chip due-${dueState}`}>
          {formatDate(task.dueDate)}
        </span>
        <div className="actions">
          <button
            className="secondary-button"
            onClick={() => toggleComplete(task.id)}
          >
            {task.completed ? "Pending" : "Done"}
          </button>
          <button className="secondary-button" onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className="secondary-button danger" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
