import { Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CompletedTasks from "./pages/CompletedTasks";
import PendingTasks from "./pages/PendingTasks";

function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/completed" element={<CompletedTasks />} />
          <Route path="/pending" element={<PendingTasks />} />
        </Route>
      </Routes>
    </TaskProvider>
  );
}

export default App;
