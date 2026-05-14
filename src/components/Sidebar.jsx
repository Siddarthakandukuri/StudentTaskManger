import { NavLink } from "react-router-dom";
import "../styles/components/Sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/completed", label: "Completed Tasks" },
  { to: "/pending", label: "Pending Tasks" },
];

function Sidebar({ isMobileOpen, onCloseMobile }) {
  return (
    <>
      <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div>
              <strong>Task Manager</strong>
              <small>Student Panel</small>
            </div>
          </div>
          <button className="secondary-button close-mobile" onClick={onCloseMobile}>
            Close
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              to={item.to}
              key={item.to}
              onClick={onCloseMobile}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {isMobileOpen && <button className="sidebar-overlay" onClick={onCloseMobile} aria-label="Close menu" />}
    </>
  );
}

export default Sidebar;
