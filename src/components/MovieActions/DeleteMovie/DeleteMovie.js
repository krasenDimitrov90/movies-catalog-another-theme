import React from "react";
import { useNavigate } from "react-router-dom";
import LoaderContext from "../../../contexts/loader-context";
import useHttp from "../../../hooks/use-http";
import usePopUp from "../../../hooks/use-popUp";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";
import Modal from "../../Modal/Modal";
import SuccessPopUp from "../../SuccessPopUp/SuccessPopUp";

const DeleteMovie = ({ movie, movieId }) => {

    const navigate = useNavigate();

    const { startLoader, stopLoader, } = React.useContext(LoaderContext);

    const afterRequestDeleteMovie = () => {
        navigate('/');
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterRequestDeleteMovie);

    const {
        sendRequest: request,
        error: requestError,
    } = useHttp();

    const afterRequestDeleteHandler = () => {
        setRequestIsFinished(true);
        stopLoader();
    };

    const afterRequestDeleteErrorHandler = () => {
        setRequestIsFinished(true);
        stopLoader();
    };

    const onDeleteHandler = (e) => {
        e.preventDefault();

        setModalIsOpen(true);
        startLoader();

        const requestConfig = { action: "deleteMovie", path: `/movies/${movieId}` };
        request(requestConfig, afterRequestDeleteHandler, afterRequestDeleteErrorHandler);
    };

    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={"Somthing went wrong, try again later"} />}
                    {requestError === null && <SuccessPopUp />}
                </Modal>}
            <div className="col-md-9 col-sm-12 col-xs-12" style={{ "padding": "0" }}>
                <div className="form-style-1 user-pro" action="#">
                    <form onSubmit={onDeleteHandler} action="#" className="password">

                        <div className="row">
                            <div className="col-md-6 form-it" style={{ "width": "84%" }}>
                                <label>Are you sure you whant to delete {movie}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <input className="submit" type="submit" value="delete" style={{ "width": "80px" }} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default DeleteMovie;