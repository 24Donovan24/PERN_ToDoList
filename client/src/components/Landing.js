import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div className="mt-4 p-5 bg-secondary text-white rounded">
            <h1>Welcome to Todo Page</h1>
            <p>Sign In and start building your Todo List</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-primary ms-3">Register</Link>
        </div>
    );
};

export default Landing;