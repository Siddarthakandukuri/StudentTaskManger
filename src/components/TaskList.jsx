import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import "../styles/components/TaskList.css";

function TaskList({ tasks, onEdit, emptyTitle, emptyText, onCreate }) {
  return (
    <section className="task-list-section">
      {tasks.length === 0 ? (
        <EmptyState title={emptyTitle} text={emptyText} onCreate={onCreate} />
      ) : (
        <div className="task-list">
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} onEdit={onEdit} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
