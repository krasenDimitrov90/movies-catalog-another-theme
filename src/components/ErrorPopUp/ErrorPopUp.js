import React from "react";

import './ErrorPopUp.styles.css';

const ErrorPopUp = ({ message }) => {

    return (
        <>
            <div id="error-popup-wrapper">
                <svg fill="#DD003F" width="20%" height="20%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">

                    <g id="Security_alert">

                        <path d="M80.9175,377.0605H202V439.16H139a9.8965,9.8965,0,1,0,0,19.7929H373a9.8965,9.8965,0,1,0,0-19.7929H310V377.0605H431.0869A49.9019,49.9019,0,0,0,480.64,332.9351H31.36A49.9094,49.9094,0,0,0,80.9175,377.0605Z" />

                        <path d="M431.0836,53.0474H80.9175A49.9174,49.9174,0,0,0,31,102.9648V313.1421H481V102.9637A49.9163,49.9163,0,0,0,431.0836,53.0474ZM171.5252,239.4111l65.0274-112.6322a22.4559,22.4559,0,0,1,38.8948,0l65.0274,112.6322a22.4558,22.4558,0,0,1-19.4473,33.6836H190.9725A22.4558,22.4558,0,0,1,171.5252,239.4111Z" />

                        <circle cx="256" cy="235.8676" r="11.25" />

                        <path d="M246.1079,166.3208v37.2305a9.8965,9.8965,0,0,0,19.793,0V166.3208a9.8965,9.8965,0,0,0-19.793,0Z" />

                    </g>

                </svg>
                {/* <div id="error-popup">
                    <span id="error-popup-bars" className="bar1"></span>
                    <span id="error-popup-bars" className="bar2"></span>
                </div> */}
            </div>
            <div id="error-popup-message-container">
                <div id="error-popup-message">
                    <h3>{message || "Somthing went wrong"}</h3>
                </div>
            </div>

        </>
    );
};

export default ErrorPopUp;