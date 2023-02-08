import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

const Layout = (props) => {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default Layout;