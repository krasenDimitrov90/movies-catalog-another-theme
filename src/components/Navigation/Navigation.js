import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

const Navigation = () => {

    const { isLoggedIn, getUserCredentials, loggoutHandler } = React.useContext(AuthContext);
    const { userEmail } = getUserCredentials();

    const onLoggoutHandler = (e) => {
        loggoutHandler();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <NavLink className="navbar-brand text-light" to="/">Movies</NavLink>
            <ul className="navbar-nav ml-auto ">

                {isLoggedIn && <>
                    <li className="nav-item user">
                        <NavLink className="nav-link" id="welcome-msg" to="/">Welcome, {userEmail}</NavLink>
                    </li>
                    <li className="nav-item user">
                        <NavLink onClick={onLoggoutHandler} className="nav-link" to="/login">Logout</NavLink>
                    </li>
                </>
                }
                {!isLoggedIn && <>

                    <li className="nav-item guest">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item guest">
                        <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                </>
                }
            </ul>
        </nav>
    );
};

export default Navigation;