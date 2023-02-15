import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth-context";
import useHttp from "../../../hooks/use-http";
import useInput from "../../../hooks/use-input";

const AddMovie = () => {

    const navigate = useNavigate();

    const [formIsInvalid, setFormIsInvalid] = React.useState(false);
    const { getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();
    const [movieId, setMovieId] = React.useState(0);

    const {
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
                likes: { ownerId: userId },
                ownerId: userId,
                title: enteredTitleValue,
            }
        };

        const requestConfig = { action: "patchNewMovie", path: "/movies", data };

        request(requestConfig, afterPatchNewMovie);
    };



    return (
        <>
            <div className="col-md-4 col-sm-12 col-xs-12">
                <div className="sidebar">
                    <div className="searh-form">
                        <h4 className="sb-title">Add new movie</h4>

                        <div className="form-style-1 user-pro" action="#">
                            <form onSubmit={submitNewMovie} action="#" className="password">

                                <div className="row">
                                    <div className="col-md-6 form-it" style={{ "width": "100%" }}>
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter title"
                                            value={enteredTitleValue}
                                            onChange={titleInputOnChangeHandler}
                                            onBlur={titleInputOnBlurHandler}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-it" style={{ "width": "100%" }}>
                                        <label>Image Link</label>
                                        <input type="text" placeholder="Enter image url"
                                            value={enteredImageUrlValue}
                                            onChange={imageUrlInputOnChangeHandler}
                                            onBlur={imageUrlInputOnBlurHandler}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-it" style={{ "width": "100%" }}>
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
                                                "height": "180px",
                                            }}
                                            value={enteredDescriptionValue}
                                            onChange={descriptionInputOnChangeHandler}
                                            onBlur={descriptionInputOnBlurHandler}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2" style={{ "width": "100%" }}>
                                        <input disabled={formIsInvalid} className="submit" type="submit" value="add movie" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddMovie;