import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

const Movie = ({
    movieId,
    imageUrl,
    title}) => {

    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <div className='card mb-4'>
            <img className="card-img-top" src={imageUrl}
                alt="Card cap" style={{height: "100%"}} />
            <div className="card-body" style={{height: "5rem"}} >
                <h4 className="card-title" style={{textAlign: "center"}} >{title}</h4>
            </div>
            {isLoggedIn &&
                <div className="card-footer">
                    <NavLink to={`/movie/${movieId}/details`} >
                        <button type="button" className="btn btn-info">Details</button>
                    </NavLink>
                </div>
            }
        </div>
    );
};

export default Movie;