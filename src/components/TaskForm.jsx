import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import "../styles/components/TaskForm.css";

const emptyForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "medium",
};

function TaskFormContent({ onClose, editingTask }) {
  const { addTask, updateTask } = useTasks();
  const [form, setForm] = useState(editingTask || emptyForm);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, form);
    } else {
      addTask(form);
    }

    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="task-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <header className="task-modal-header">
          <div>
            <span className="eyebrow">{editingTask ? "Edit task" : "New task"}</span>
            <h2>{editingTask ? "Refine the details" : "Capture the next step"}</h2>
          </div>
          <button className="secondary-button" onClick={onClose} type="button">
            Close
          </button>
        </header>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="task-title">Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="e.g. Revise chapter 6"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="task-description">Notes</label>
            <textarea
              id="task-description"
              placeholder="Add context, links, or reminders"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="task-due-date">Due date</label>
              <input
                id="task-due-date"
                type="date"
                value={form.dueDate}
                onChange={(event) => updateField("dueDate", event.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(event) => updateField("priority", event.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <footer className="task-form-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button className="primary-button" type="submit">
              {editingTask ? "Save changes" : "Add task"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function TaskForm({ isOpen, onClose, editingTask }) {
  if (!isOpen) return null;

  return (
    <TaskFormContent
      key={editingTask?.id || "new-task"}
      editingTask={editingTask}
      onClose={onClose}
    />
  );
}

export default TaskForm;
