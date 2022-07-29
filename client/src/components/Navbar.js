import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };

  const navigate = useNavigate();
  const navigateSettings = () => {
    navigate("/settings");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-secondary rounded"
      style={{ fontSize: "1.2em" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="/"
          style={{ color: "white", fontSize: "1.5em" }}
        >
          Todo List 📝
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className="nav-link btn btn-secondary"
                style={{ color: "white", borderRadius: "15px" }}
                onClick={navigateSettings}
              >
                Settings
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-secondary"
                style={{ color: "white", borderRadius: "15px"}}
                onClick={(e) => logout(e)}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
