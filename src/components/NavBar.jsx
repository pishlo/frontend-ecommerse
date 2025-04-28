import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-commerce
        </Link>
        <div className="col-md-3 text-end d-flex align-items-center justify-content-end">
          {token ? (
            <>
              {/* Add Product Button */}
              <Link className="btn btn-warning me-3" to="/create-product">
                Add Product
              </Link>

              {/* Welcome Message */}
              <span className="text-white me-3">Welcome, {firstName}!</span>

              {/* Logout Button */}
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-dark me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success" to="/signup">
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
