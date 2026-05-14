import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import { useTasks } from "../hooks/useTasks";
import "../styles/pages/Dashboard.css";

function Dashboard() {
  const { filteredTasks, stats, tasks } = useTasks();
  const { openTaskModal } = useOutletContext();
  const [editingTask, setEditingTask] = useState(null);

  return (
    <>
      <section className="dashboard-hero">
        <div className="task-banner">
          <h1>Plan smarter. Finish calmer.</h1>
          <p>
            A polished student task board for assignments, lab work, revision plans, and everything that needs a clear next step.
          </p>
        </div>
      </section>

      <Stats />

      <section className="workspace-grid">
        <div className="task-board">
          <SearchBar />
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onCreate={openTaskModal}
            emptyTitle="No tasks match this view"
            emptyText="Adjust your search or create a fresh task to keep the board moving."
          />
        </div>

        <aside className="focus-panel panel">
          <p className="eyebrow">Today</p>
          <h2>Focus stack</h2>
          <div className="focus-list">
            {tasks
              .filter((task) => !task.completed)
              .slice(0, 4)
              .map((task) => (
                <button key={task.id} onClick={() => setEditingTask(task)}>
                  <span className={`mini-dot priority-${task.priority}`} />
                  <span>{task.title}</span>
                </button>
              ))}
            {stats.pending === 0 && <p className="quiet-copy">All clear. Nice and tidy.</p>}
          </div>
        </aside>
      </section>

      <TaskForm isOpen={Boolean(editingTask)} editingTask={editingTask} onClose={() => setEditingTask(null)} />
    </>
  );
}

export default Dashboard;
