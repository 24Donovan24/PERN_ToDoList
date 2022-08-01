import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="mt-4 p-5 bg-dark text-white rounded">
            <h1>Welcome to Todo Page 📝</h1>
            <p>Sign in and start building your Todo List</p>
            <Link to="/login" className="btn btn-light">Login</Link>
            <Link to="/register" className="btn btn-light ms-3">Register</Link>
        </div>
    );
};

export default Landing;