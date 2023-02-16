import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";
import usePopUp from "../../../hooks/use-popUp";
import Modal from "../../Modal/Modal";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";
import SuccessPopUp from "../../SuccessPopUp/SuccessPopUp";
import LoaderContext from "../../../contexts/loader-context";

const EditMovie = ({ onChange }) => {

    const navigate = useNavigate();
    const { startLoader, stopLoader, } = React.useContext(LoaderContext);
    const { movieId } = useParams();


    const {
        sendRequest: request,
        error: requestError,
    } = useHttp();

    const afterEditRequestFInished = () => {
        navigate(`/movie/${movieId}/details?state=overview`);
    };

    const {
        modalIsOpen,
        setModalIsOpen,
        requestIsFinished,
        setRequestIsFinished } = usePopUp(afterEditRequestFInished);

    const {
        value: enteredTitleValue,
        valueIsValid: enteredTitleIsValid,
        onChangeHandler: titleInputOnChangeHandler,
        onBlurHandler: titleInputOnBlurHandler,
        autoCompleteValueHandler: autoCompleteTitleHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredDescriptionValue,
        valueIsValid: enteredDescriptionIsValid,
        onChangeHandler: descriptionInputOnChangeHandler,
        onBlurHandler: descriptionInputOnBlurHandler,
        autoCompleteValueHandler: autoCompleteDescriptionHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredImageUrlValue,
        valueIsValid: enteredImageUrlIsValid,
        onChangeHandler: imageUrlInputOnChangeHandler,
        onBlurHandler: imageUrlInputOnBlurHandler,
        autoCompleteValueHandler: autoCompleteImageUrlHandler,
    } = useInput(value => value.trim().length > 0);

    let formIsInvalid = false;
    if ((!enteredTitleIsValid || !enteredDescriptionIsValid || !enteredImageUrlIsValid)) {
        formIsInvalid = true;
    }

    React.useEffect(() => {
        const fillTheInputFields = (movie) => {
            autoCompleteTitleHandler(movie.title);
            autoCompleteDescriptionHandler(movie.dexcription);
            autoCompleteImageUrlHandler(movie.imageUrl);
        };

        const requestConfig = { action: "getMovie", path: `/movies/${movieId}` };

        request(requestConfig, fillTheInputFields);

    }, [request, movieId, autoCompleteTitleHandler, autoCompleteDescriptionHandler, autoCompleteImageUrlHandler]);

    const afterEdit = (movieData) => {
        setModalIsOpen(true);
        setRequestIsFinished(true);
        onChange && onChange(movieData)
        stopLoader();
    };


    const submitEdit = (e) => {
        e.preventDefault();

        const data = {
            dexcription: enteredDescriptionValue,
            imageUrl: enteredImageUrlValue,
            title: enteredTitleValue,
        };

        const requestConfig = { action: "updateMovie", path: `/movies/${movieId}`, data };

        startLoader();
        request(requestConfig, afterEdit);
        
    };

    return (
        <>
            {modalIsOpen && requestIsFinished &&
                <Modal>
                    {requestError !== null && <ErrorPopUp message={requestError} />}
                    {requestError === null && <SuccessPopUp />}
                </Modal>}
            <div id="reviews" className="tab active" >
                <div className="page-single" style={{ "padding": "0" }}  >
                    <div className="container">
                        <div className="row ipad-width" style={{ "display": "flex", "justifyContent": "flex-start" }} >

                            <div className="col-md-9 col-sm-12 col-xs-12" style={{ "padding": "0" }}>
                                <div className="form-style-1 user-pro" action="#">
                                    <form onSubmit={submitEdit} action="#" className="password">

                                        <div className="row">
                                            <div className="col-md-6 form-it" style={{ "width": "84%" }}>
                                                <label>Title</label>
                                                <input type="text" placeholder="Enter title"
                                                    value={enteredTitleValue}
                                                    onChange={titleInputOnChangeHandler}
                                                    onBlur={titleInputOnBlurHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-it" style={{ "width": "84%" }}>
                                                <label>Image Link</label>
                                                <input type="text" placeholder="Enter image url"
                                                    value={enteredImageUrlValue}
                                                    onChange={imageUrlInputOnChangeHandler}
                                                    onBlur={imageUrlInputOnBlurHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-it" style={{ "width": "84%" }}>
                                                <label>Description</label>
                                                <textarea placeholder="Enter description"
                                                    style={{
                                                        "fontFamily": "Nunito, sans-serif",
                                                        "fontSize": "12px",
                                                        "color": "#abb7c4",
                                                        "fontWeight": "300",
                                                        "textTransform": "none",
                                                        "backgroundColor": "#233a50",
                                                        "border": "none",
                                                        "WebkitBorderRadius": "3px !important",
                                                        "MozBorderRadius": "3px !important",
                                                        "borderRadius": "3px !important",
                                                        "height": "140px",
                                                    }}
                                                    value={enteredDescriptionValue}
                                                    onChange={descriptionInputOnChangeHandler}
                                                    onBlur={descriptionInputOnBlurHandler}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <input className="submit" disabled={formIsInvalid} type="submit" value="edit" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    // return (
    //     <>
    //         {isLoading && <SpinnerModal />}
    //         <section id="edit-movie" classNameName="view-section">
    //             <form onSubmit={submitEdit} classNameName="text-center border border-light p-5" action="#" method="">
    //                 <h1>Edit Movie</h1>
    //                 <div classNameName="form-group">
    //                     <label htmlFor="title">Movie Title</label>
    //                     <input id="title" type="text" classNameName="form-control" placeholder="Movie Title" name="title"
    //                         value={enteredTitleValue}
    //                         onChange={titleInputOnChangeHandler}
    //                         onBlur={titleInputOnBlurHandler}
    //                     />
    //                 </div>
    //                 <div classNameName="form-group">
    //                     <label htmlFor="description">Movie Description</label>
    //                     <textarea classNameName="form-control" placeholder="Movie Description..." name="description"
    //                         value={enteredDescriptionValue}
    //                         onChange={descriptionInputOnChangeHandler}
    //                         onBlur={descriptionInputOnBlurHandler}
    //                     ></textarea>
    //                 </div>
    //                 <div classNameName="form-group">
    //                     <label htmlFor="imageUrl">Image url</label>
    //                     <input id="imageUrl" type="text" classNameName="form-control" placeholder="Image Url" name="imageUrl"
    //                         value={enteredImageUrlValue}
    //                         onChange={imageUrlInputOnChangeHandler}
    //                         onBlur={imageUrlInputOnBlurHandler}
    //                     />
    //                 </div>
    //                 <button type="submit" disabled={formIsInvalid} classNameName="btn btn-primary">Submit</button>
    //             </form>
    //         </section>
    //     </>
    // );
};

export default EditMovie;