import React from "react";
import { NavLink } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";


const HomePage = () => {

    const { isLoggedIn } = React.useContext(AuthContext);
    const [movies, setMovies] = React.useState({});

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const afterFetchMovies = React.useCallback((movies) => {
        setMovies(movies);
    },[]);

    React.useEffect(() => {

        const requestConfig = {
            action: "getMovies",
            path: '/movies',
        };

        request(requestConfig, afterFetchMovies)

    }, [afterFetchMovies, request]);


    return (
        <>
            {isLoading && <SpinnerModal />}
            <section id="home-page" className="view-section">
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

                {!isLoading &&
                    <section id="movie">
                        <div className=" mt-3 ">
                            <div className="row d-flex d-wrap">

                                <div className="card-deck d-flex justify-content-center">
                                    {Object.entries(movies).map(([movie, props]) => {
                                        return (
                                            <Movie 
                                                key={movie}
                                                dexcription={props.dexcription}
                                                imageUrl={props.imageUrl}
                                                likes={props.likes}
                                                ownerId={props.ownerId}
                                                title={props.title}
                                            />
                                        );
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>}
            </section>
        </>
    );
};

export default HomePage;
