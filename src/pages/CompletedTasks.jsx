import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

function CompletedTasks() {
  const { tasks, clearCompleted } = useTasks();
  const { openTaskModal } = useOutletContext();
  const [editingTask, setEditingTask] = useState(null);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Archive</p>
          <h1>Completed tasks</h1>
          <p>Review finished work, reopen a task, or clear the completed list when your board needs breathing room.</p>
        </div>
        {completedTasks.length > 0 && (
          <button className="secondary-button" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </div>

      <TaskList
        tasks={completedTasks}
        onEdit={setEditingTask}
        onCreate={openTaskModal}
        emptyTitle="No completed tasks yet"
        emptyText="Finished work will appear here once you mark tasks complete."
      />

      <TaskForm isOpen={Boolean(editingTask)} editingTask={editingTask} onClose={() => setEditingTask(null)} />
    </>
  );
}

export default CompletedTasks;
