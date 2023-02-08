import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";

const EditMoviePage = () => {

    const navigate = useNavigate();
    const { movieId } = useParams();

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

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



    const submitEdit = (e) => {
        e.preventDefault();

        const data = {
            dexcription: enteredDescriptionValue,
            imageUrl: enteredImageUrlValue,
            title: enteredTitleValue,
        };

        const requestConfig = {action: "updateMovie", path: `/movies/${movieId}`, data};

        request(requestConfig, () => navigate(`/movie/${movieId}/details`));
    };

    return (
        <>
            {isLoading && <SpinnerModal />}
            <section id="edit-movie" className="view-section">
                <form onSubmit={submitEdit} className="text-center border border-light p-5" action="#" method="">
                    <h1>Edit Movie</h1>
                    <div className="form-group">
                        <label htmlFor="title">Movie Title</label>
                        <input id="title" type="text" className="form-control" placeholder="Movie Title" name="title"
                            value={enteredTitleValue}
                            onChange={titleInputOnChangeHandler}
                            onBlur={titleInputOnBlurHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Movie Description</label>
                        <textarea className="form-control" placeholder="Movie Description..." name="description"
                            value={enteredDescriptionValue}
                            onChange={descriptionInputOnChangeHandler}
                            onBlur={descriptionInputOnBlurHandler}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image url</label>
                        <input id="imageUrl" type="text" className="form-control" placeholder="Image Url" name="imageUrl"
                            value={enteredImageUrlValue}
                            onChange={imageUrlInputOnChangeHandler}
                            onBlur={imageUrlInputOnBlurHandler}
                        />
                    </div>
                    <button type="submit" disabled={formIsInvalid} className="btn btn-primary">Submit</button>
                </form>
            </section>
        </>
    );
};

export default EditMoviePage;