import React from "react";

const Navigation = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a className="navbar-brand text-light" href="/">Movies</a>
            <ul className="navbar-nav ml-auto ">
                <li className="nav-item user">
                    <a className="nav-link" id="welcome-msg" href="/">Welcome, email</a>
                </li>
                <li className="nav-item user">
                    <a className="nav-link" href="/logout">Logout</a>
                </li>
                <li className="nav-item guest">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item guest">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;