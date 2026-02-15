import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="custom-navbar d-flex justify-content-between align-items-center px-4">

      <h5 className="text-white m-0 fw-semibold">
        Room Reservation Dashboard
      </h5>

      <div className="dropdown">
        <button
          className="btn user-btn dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i className="bi bi-person-circle me-2"></i>
          {name}
        </button>

        <ul className="dropdown-menu dropdown-menu-end shadow">
          <li>
            <span className="dropdown-item-text fw-semibold">
              {name}
            </span>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item text-danger" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>

    </nav>
  );
}

export default Navbar;
