import React from "react";
import { Link, useParams } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";

import './MovieDetailsPage.styles.css';

const MovieDetailsPage = () => {

    const { movieId } = useParams();
    const [movie, setMovie] = React.useState({});
    const [likesCount, setLikesCount] = React.useState(0);
    const { getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const getLikesCount = React.useCallback((movie) => {
            return movie.likes.filter(id => id !== 'empty').length;
    },[]);

    const afterFetchMovie = React.useCallback((movie) => {
        setMovie(movie);
        setLikesCount(getLikesCount(movie));
    }, [getLikesCount]);

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
                            <div className="movie-title-and-img">
                                <h1 className="movie-title">{movie.title}</h1>

                                <div className="col-md-8">
                                    <img className="img-thumbnail" src={movie.imageUrl}
                                        alt="Movie" />
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <h3 className="my-3 ">Movie Description</h3>
                                <p>{movie.dexcription}</p>
                                {userId === movie.ownerId && <>
                                    <Link className="btn btn-danger" to="#">Delete</Link>
                                    <Link className="btn btn-warning" to="/movie/edit">Edit</Link>
                                </>}
                                {userId !== movie.ownerId && <Link className="btn btn-primary" to="#">Like</Link>}
                                <span className="enrolled-span">Liked {likesCount}</span>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default MovieDetailsPage;