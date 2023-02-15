import React from "react";
import ReactDOM from "react-dom";

import './Modal.styles.css';

const Backdrop = (props) => {
    return <div id='backdrop-container' onClick={props.onClose}/>;
  };
  
  const ModalOverlay = (props) => {

    const classes = `${props.classes ? props.classes : ''}`;

    return (
      <div id="modal-container" className={classes}>
        <div id="content" >{props.children}</div>
      </div>
    );
  };
  
  const portalElement = document.getElementById('modal');
  
  const Modal = (props) => {
    return (
      <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(
          <ModalOverlay classes={props.classes} >{props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  };

export default Modal;