import { NavLink } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="sidebar d-flex flex-column p-3">

      <NavLink to="/dashboard" className="sidebar-link">
        <i className="bi bi-speedometer2 me-2"></i>
        Dashboard
      </NavLink>

      {role === "user" && (
      <NavLink to="/rooms" className="sidebar-link">
        <i className="bi bi-building me-2"></i>
        Rooms
      </NavLink>)}

      {role === "user" && (
      <NavLink to="/reservations" className="sidebar-link">
        <i className="bi bi-calendar-check me-2"></i>
        Reservations
      </NavLink>
      )}

      {role === "admin" && (
        <NavLink to="/rooms" className="sidebar-link">
          <i className="bi bi-gear me-2"></i>
          Manage Rooms
        </NavLink>
      )}

    </div>
  );
}

export default Sidebar;
