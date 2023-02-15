import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {


    return (
        <div class="page-single-2">
            <div class="container">
                <div class="row">
                    <div class="middle-content">
                        <Link to={'/'} ><img class="md-logo" src="images/logo1.png" alt="" /></Link>
                        <img src="images/uploads/err-img.png" alt="" />
                        <h1>Page not found</h1>
                        <Link to={'/'} class="redbtn">go home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;