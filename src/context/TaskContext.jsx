import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TaskContext } from "./TaskContextObject";

const starterTasks = [
  {
    id: "starter-1",
    title: "Finish data structures assignment",
    description: "Review stack and queue problems before the evening study block.",
    dueDate: "2026-05-16",
    priority: "high",
    completed: false,
    createdAt: "2026-05-14T09:00:00.000Z",
  },
  {
    id: "starter-2",
    title: "Prepare chemistry lab notes",
    description: "Add observations, calculations, and one-page summary.",
    dueDate: "2026-05-18",
    priority: "medium",
    completed: false,
    createdAt: "2026-05-14T10:00:00.000Z",
  },
  {
    id: "starter-3",
    title: "Submit React journal reflection",
    description: "Upload final PDF and confirm rubric requirements.",
    dueDate: "2026-05-13",
    priority: "low",
    completed: true,
    createdAt: "2026-05-13T08:00:00.000Z",
  },
];

function normalizeTask(task) {
  return {
    id: task.id || uuidv4(),
    title: task.title || "Untitled task",
    description: task.description || "",
    dueDate: task.dueDate || "",
    priority: task.priority || "medium",
    completed: Boolean(task.completed),
    createdAt: task.createdAt || new Date().toISOString(),
  };
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", starterTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setTasks((currentTasks) => currentTasks.map(normalizeTask));
  }, [setTasks]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const addTask = (task) => {
    setTasks((currentTasks) => [
      {
        id: uuidv4(),
        title: task.title.trim(),
        description: (task.description || "").trim(),
        dueDate: task.dueDate || "",
        priority: task.priority || "medium",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...currentTasks,
    ]);
    notify("Task added to your board");
  };

  const updateTask = (taskId, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              title: updates.title.trim(),
              description: (updates.description || "").trim(),
              dueDate: updates.dueDate || "",
              priority: updates.priority || "medium",
            }
          : task
      )
    );
    notify("Task updated");
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    notify("Task removed", "danger");
  };

  const toggleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    notify("Task status changed");
  };

  const clearCompleted = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
    notify("Completed tasks cleared");
  };

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query);
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && task.completed) ||
        (filter === "pending" && !task.completed) ||
        filter === task.priority;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search, tasks]);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;
    const percentage = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    return {
      total: tasks.length,
      completed,
      pending,
      percentage,
    };
  }, [tasks]);

  const value = {
    tasks,
    filteredTasks,
    stats,
    search,
    setSearch,
    filter,
    setFilter,
    toast,
    notify,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearCompleted,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
