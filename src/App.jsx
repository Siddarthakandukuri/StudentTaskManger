import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import CompletedTasks from "./pages/CompletedTasks";
import PendingTasks from "./pages/PendingTasks";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/completed" element={<CompletedTasks />} />
              <Route path="/pending" element={<PendingTasks />} />
            </Route>
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
