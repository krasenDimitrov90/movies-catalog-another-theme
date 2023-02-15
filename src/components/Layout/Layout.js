import React from "react";
import { Outlet } from "react-router-dom";
import LoaderContext from "../../contexts/loader-context";
import Navigation from "../Navigation/Navigation";
import SpinnerModal from "../Spinner/Spinner";

const Layout = (props) => {

    const { isLoading } = React.useContext(LoaderContext);


    return (
        <>
            {isLoading && <SpinnerModal />}
            <Navigation />
            <Outlet />
        </>
    );
};

export default Layout;