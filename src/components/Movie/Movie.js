import React from "react";
import { NavLink } from "react-router-dom";

const Movie = ({
    movieId,
    imageUrl,
    title }) => {

    const imgOnErrorHandler = ({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "/images/no-image.jpg";
    }

    return (
        <div className="movie-item-style-2 movie-item-style-1">
            {/* <img src={imageUrl} alt="" /> */}
            <img src={imageUrl}
                onError={imgOnErrorHandler}
                alt="" />
            <div className="hvr-inner">
                <NavLink to={`/movie/${movieId}/details?state=overview`}> Details <i className="ion-android-arrow-dropright"></i> </NavLink>
            </div>

        </div>
    );
};

export default Movie;