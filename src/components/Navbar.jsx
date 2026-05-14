import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import "../styles/components/Navbar.css";

function Navbar({ onMenuClick, onAddTask }) {
  const { search, setSearch } = useTasks();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-left">
        <div className="brand-lockup">
          <span className="brand-text-icon">STM</span>
          <div>
            <strong>Student Task Manger</strong>
          </div>
        </div>
      </div>

      <label className="navbar-search" aria-label="Search tasks">
        <input
          type="search"
          placeholder="Search tasks, notes, priority..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <div className="navbar-actions">
        <button className="primary-button navbar-add" onClick={onAddTask}>
          <span>Add Task</span>
        </button>
        <button className="profile-chip" onClick={onMenuClick} aria-label="Open sidebar">
          <div className="avatar">{user?.name?.slice(0, 2).toUpperCase() || "ST"}</div>
        </button>
        <button className="secondary-button logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
