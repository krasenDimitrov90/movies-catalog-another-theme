import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";

import './MovieDetailsPage.styles.css';

const MovieDetailsPage = () => {

    const navigate = useNavigate();

    const { getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();
    const { movieId } = useParams();
    const [movie, setMovie] = React.useState({});
    const [likeBtnTxt, setLikeBtnTxt] = React.useState('Like');
    const [likesCount, setLikesCount] = React.useState(0);
    const [likeBtnHasCliked, setLikeBtnHasCliked] = React.useState(false);

    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const getLikesCount = React.useCallback((movie) => {
        return Object.entries(movie.likes).filter(([owner, state]) => state === 'Like').length;
    }, []);

    const afterFetchMovie = React.useCallback((movie) => {
        setLikeBtnTxt(movie.likes[userId] === 'Like' ? 'Dislike' : 'Like');

        setMovie(movie);
        setLikesCount(getLikesCount(movie));
    }, [getLikesCount, userId]);

    React.useEffect(() => {
        const requestConfig = { action: "getMovie", path: `/movies/${movieId}` };

        request(requestConfig, afterFetchMovie);
    }, [request, afterFetchMovie, movieId]);

    const onDeleteHandler = (e) => {

        const requestConfig = { action: "deleteMovie", path: `/movies/${movieId}` };
        request(requestConfig, () => navigate('/'));
    };

    const onLikeHandler = (e) => {

        if (!likeBtnHasCliked) {
            setLikeBtnHasCliked(true);
        }
        const afterFetch = (like) => {
            console.log(like);
        };

        const data = { [userId]: likeBtnTxt };
        const requestConfig = { action: "updateMovieLikes", path: `/movies/${movieId}/likes`, data };
        request(requestConfig, afterFetch);
        
        setLikeBtnTxt((prev) => prev === 'Like' ? 'Dislike' : 'Like');
        setLikesCount((prev) => likeBtnTxt === 'Like' ? prev + 1 : prev - 1);
        
    };

    return (
        <>
            {isLoading && !likeBtnHasCliked && <SpinnerModal />}
            {
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
                                    <button onClick={onDeleteHandler} className="btn btn-danger" >Delete</button>
                                    <Link className="btn btn-warning" to={`/movie/${movieId}/edit`}>Edit</Link>
                                </>}
                                {userId !== movie.ownerId && <button onClick={onLikeHandler} className="btn btn-primary" >{likeBtnTxt}</button>}
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