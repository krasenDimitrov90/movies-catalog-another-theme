import React from "react";
import { Link, useParams } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import useHttp from "../../hooks/use-http";

const MovieDetailsPage = () => {

    const { movieId } = useParams();
    const [movie, setMovie] = React.useState({});

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const afterFetchMovie = React.useCallback((movie) => {
        setMovie(movie);
    }, []);

    React.useEffect(() => {

        const requestConfig = { action: "getMovie", path: `/movies/${movieId}` };

        request(requestConfig, afterFetchMovie);
    }, [request, afterFetchMovie, movieId]);

    return (
        <>
            {isLoading && <SpinnerModal />}
            {!isLoading &&
                <section id="movie-example" className="view-section">
                    <div className="container">
                        <div className="row bg-light text-dark">
                            <h1>{movie.title}</h1>

                            <div className="col-md-8">
                                <img className="img-thumbnail" src={movie.imageUrl}
                                    alt="Movie" />
                            </div>
                            <div className="col-md-4 text-center">
                                <h3 className="my-3 ">Movie Description</h3>
                                <p>{movie.dexcription}</p>
                                <Link className="btn btn-danger" to="#">Delete</Link>
                                <Link className="btn btn-warning" to="/movie/edit">Edit</Link>
                                <Link className="btn btn-primary" to="#">Like</Link>
                                <span className="enrolled-span">Liked 1</span>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default MovieDetailsPage;