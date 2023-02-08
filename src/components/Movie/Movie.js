import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";

const Movie = () => {

    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <div className='card mb-4'>
            <img class="card-img-top" src="https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
                alt="Card cap" width="400" />
            <div class="card-body">
                <h4 class="card-title">$movie.title</h4>
            </div>
            {isLoggedIn &&
                <div class="card-footer">
                    <NavLink to="movie/details">
                        <button type="button" class="btn btn-info">Details</button>
                    </NavLink>
                </div>
            }
        </div>
    );
};

export default Movie;