import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

const Movie = ({
    dexcription,
    imageUrl,
    likes,
    ownerId,
    title}) => {

    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <div className='card mb-4'>
            <img className="card-img-top" src={imageUrl}
                alt="Card cap" width="400" />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
            </div>
            {isLoggedIn &&
                <div className="card-footer">
                    <NavLink to="movie/details">
                        <button type="button" className="btn btn-info">Details</button>
                    </NavLink>
                </div>
            }
        </div>
    );
};

export default Movie;