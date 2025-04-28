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
        <div className="d-flex flex-wrap gap-2 justify-content-end align-items-center">
          {token ? (
            <>
              <Link className="btn btn-warning" to="/create-product">
                Add Product
              </Link>

              {firstName && (
                <span className="text-white">
                  Welcome, {firstName}!
                </span>
              )}

              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-dark" to="/login">
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
