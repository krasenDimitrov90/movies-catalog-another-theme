import React from "react";
import { NavLink } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import AuthContext from "../../contexts/auth-context";


const HomePage = () => {

    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <section id="home-page" class="view-section">
            <div className="jumbotron jumbotron-fluid text-light" style={{ "backgroundColor": "#343a40" }} >
                <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                    className="img-fluid" alt="Responsive" style={{ width: "150%", "height": "200px" }} />
                <h1 className="display-4">Movies</h1>
                <p className="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
            </div>

            <h1 className="text-center">Movies</h1>

            {isLoggedIn &&
                <section id="add-movie-button" className="user">
                    <NavLink to="add-movie" className="btn btn-warning ">Add Movie</NavLink>
                </section>
            }

            <section id="movie">
                <div className=" mt-3 ">
                    <div className="row d-flex d-wrap">

                        <div className="card-deck d-flex justify-content-center">
                            {/* <!-- movie list --> */}
                            {<Movie />}
                            {<Movie />}
                            {<Movie />}
                            {<Movie />}
                            {<Movie />}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default HomePage;
