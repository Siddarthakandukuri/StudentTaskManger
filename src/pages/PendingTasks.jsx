import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

function PendingTasks() {
  const { tasks } = useTasks();
  const { openTaskModal } = useOutletContext();
  const [editingTask, setEditingTask] = useState(null);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Queue</p>
          <h1>Pending tasks</h1>
          <p>Everything still in motion, sorted into the same premium cards as your dashboard.</p>
        </div>
        <button className="primary-button" onClick={openTaskModal}>
          Add task
        </button>
      </div>

      <TaskList
        tasks={pendingTasks}
        onEdit={setEditingTask}
        onCreate={openTaskModal}
        emptyTitle="Nothing pending"
        emptyText="Your active queue is empty. Add a task when the next assignment arrives."
      />

      <TaskForm isOpen={Boolean(editingTask)} editingTask={editingTask} onClose={() => setEditingTask(null)} />
    </>
  );
}

export default PendingTasks;
