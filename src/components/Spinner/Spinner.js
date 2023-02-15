import React from "react";
import ReactDOM from "react-dom";

import './Spinner.styles.css';

const Spinner = () => {

    return (
        <div id="spinner" className="spinner-overlay">
            <div className="spinner-container">
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

const portalElement = document.getElementById('spinner');

const SpinnerModal = () => {
    return (
        <>
            {ReactDOM.createPortal(<Spinner />, portalElement)}
        </>
    );
};

export default SpinnerModal;