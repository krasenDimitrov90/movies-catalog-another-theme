import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

const Navigation = () => {

    const { isLoggedIn, getUserCredentials, loggout } = React.useContext(AuthContext);
    const { userEmail } = getUserCredentials();

    const onLoggoutHandler = (e) => loggout();

    return (
        <header className="ht-header">
            <div className="container">
                <nav className="navbar navbar-default navbar-custom">
                    <div className="navbar-header logo">
                        <div className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <div id="nav-icon1">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <NavLink to="/"><img className="logo" src="/images/logo1.png" alt="" width="119" height="58" /></NavLink>
                    </div>
                    <div className="collapse navbar-collapse flex-parent" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav flex-child-menu menu-right">
                            {isLoggedIn && <>
                                <NavLink to="/" className="welcome-krs">Welcome {userEmail}</NavLink>
                                <NavLink to="/movies" className="home-btn-krs">home</NavLink>
                                <NavLink to="#" className="logout-btn-krs" onClick={onLoggoutHandler}>logout</NavLink>
                            </>
                            }
                            {!isLoggedIn && <>
                                <NavLink to="/movies" className="home-btn-krs">home</NavLink>
                                <NavLink to="/login" className="login-btn-krs">LOG In</NavLink>
                                <NavLink to="/register" className="register-btn-krs">sign up</NavLink>
                            </>}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );

    // return (
    //     <nav classNameName="navbar navbar-expand-lg navbar-dark bg-dark ">
    //         <NavLink classNameName="navbar-brand text-light" to="/">Movies</NavLink>
    //         <ul classNameName="navbar-nav ml-auto ">

    //             {isLoggedIn && <>
    //                 <li classNameName="nav-item user">
    //                     <NavLink classNameName="nav-link" id="welcome-msg" to="/">Welcome, {userEmail}</NavLink>
    //                 </li>
    //                 <li classNameName="nav-item user">
    //                     <NavLink onClick={onLoggoutHandler} classNameName="nav-link" to="login" >Logout</NavLink>
    //                 </li>
    //             </>
    //             }
    //             {!isLoggedIn && <>

    //                 <li classNameName="nav-item guest">
    //                     <NavLink classNameName="nav-link" to="/login">Login</NavLink>
    //                 </li>
    //                 <li classNameName="nav-item guest">
    //                     <NavLink classNameName="nav-link" to="/register">Register</NavLink>
    //                 </li>
    //             </>
    //             }
    //         </ul>
    //     </nav>
    // );
};

export default Navigation;