import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import TaskForm from "../components/TaskForm";
import FloatingActionButton from "../components/FloatingActionButton";
import { useTasks } from "../hooks/useTasks";

function AppLayout() {
  const { toast } = useTasks();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <div className="app-shell">
      <div className="dashboard-frame">
        <Sidebar
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        <div className="content-shell">
          <Navbar
            onMenuClick={() => setIsMobileOpen(true)}
            onAddTask={() => setIsTaskModalOpen(true)}
          />
          <main className="main-content">
            <Outlet context={{ openTaskModal: () => setIsTaskModalOpen(true) }} />
          </main>
          <Footer />
        </div>
      </div>

      <FloatingActionButton onClick={() => setIsTaskModalOpen(true)} />
      <TaskForm isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default AppLayout;
