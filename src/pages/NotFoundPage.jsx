import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Go back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
