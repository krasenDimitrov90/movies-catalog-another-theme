import React from "react";
import { useNavigate } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";

const AddMoviePage = () => {

    const navigate = useNavigate();

    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();
    const [movieId, setMovieId] = React.useState(0);

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const {
        value: enteredTitleValue,
        valueIsValid: enteredTitleIsValid,
        onChangeHandler: titleInputOnChangeHandler,
        onBlurHandler: titleInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredDescriptionValue,
        valueIsValid: enteredDescriptionIsValid,
        onChangeHandler: descriptionInputOnChangeHandler,
        onBlurHandler: descriptionInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredImageUrlValue,
        valueIsValid: enteredImageUrlIsValid,
        onChangeHandler: imageUrlInputOnChangeHandler,
        onBlurHandler: imageUrlInputOnBlurHandler,
    } = useInput(value => value.trim().length > 0);

    React.useEffect(() => {
        const setMovieIDHanler = (movie) => setMovieId(Number(Object.keys(movie)[0]));

        const requestConfig = {
            action: 'getPosition',
            path: '/movies',
            query: '?orderBy="$key"&limitToLast=1'
        };

        request(requestConfig, setMovieIDHanler);
    }, [request, movieId]);

    React.useEffect(() => {
        if (!enteredTitleIsValid || !enteredDescriptionIsValid || !enteredImageUrlIsValid) {
            setFormIsInvalid(true);
        } else {
            setFormIsInvalid(false);
        }
    }, [enteredTitleIsValid, enteredDescriptionIsValid, enteredImageUrlIsValid]);

    const afterPatchNewMovie = React.useCallback(() => {
        navigate('/');
    }, [navigate]);

    const submitNewMovie = (e) => {
        e.preventDefault();

        const ID = movieId + 1

        const data = {
            [ID]: {
                dexcription: enteredDescriptionValue,
                imageUrl: enteredImageUrlValue,
                likes: ["empty"],
                ownerId: userId,
                title: enteredTitleValue,
            }
        };

        const requestConfig = { action: "patchNewMovie", path: "/movies", data };

        request(requestConfig, afterPatchNewMovie);
    };


    return (
        <>
            {isLoading && <SpinnerModal />}
            <section id="add-movie" className="view-section">
                <form onSubmit={submitNewMovie} className="text-center border border-light p-5" action="#" method="">
                    <h1>Add Movie</h1>
                    <div className="form-group">
                        <label htmlFor="title">Movie Title</label>
                        <input id="title" type="text" className="form-control" placeholder="Title" name="title"
                            value={enteredTitleValue}
                            onChange={titleInputOnChangeHandler}
                            onBlur={titleInputOnBlurHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Movie Description</label>
                        <textarea className="form-control" placeholder="Description" name="description"
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

export default AddMoviePage;