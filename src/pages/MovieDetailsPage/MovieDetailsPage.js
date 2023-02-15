import React from "react";
import { Link, NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import DeleteMovie from "../../components/MovieActions/DeleteMovie/DeleteMovie";
import EditMovie from "../../components/MovieActions/EditMovie/EditMovie";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import MovieLikes from "../../components/MovieActions/MovieLikes/MovieLikes";
import LoaderContext from "../../contexts/loader-context";


const MovieDetailsPage = () => {

    const navigate = useNavigate();

    const { startLoader, stopLoader, } = React.useContext(LoaderContext);

    const [searchParams] = useSearchParams();
    const pageParams = searchParams.get('state');

    const { isLoggedIn, getUserCredentials } = React.useContext(AuthContext);
    const { userId } = getUserCredentials();
    const { movieId } = useParams();
    const [movie, setMovie] = React.useState({});

    const [userHasEditTheMovie, setUserHasEditTheMovie] = React.useState(false);


    const {
        sendRequest: request,
    } = useHttp();


    const afterFetchMovie = React.useCallback((movie) => {

        setMovie(movie);
        stopLoader();

    }, [userId]);

    React.useEffect(() => {
        startLoader();
        const requestConfig = { action: "getMovie", path: `/movies/${movieId}` };
        console.log('Get movie details');
        request(requestConfig, afterFetchMovie, (err) => console.log(err));
    }, [navigate, request, afterFetchMovie, movieId, userHasEditTheMovie]);


    const imgOnErrorHandler = ({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = "/images/no-image.jpg";
    }

    return (
        <>
            <div className="hero mv-single-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-single movie-single movie_single">
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="movie-img sticky-sb" style={{ "top": "0px" }}>
                                <img src={movie.imageUrl} onError={imgOnErrorHandler} alt="movie wallpaper" />
                                {userId === movie.ownerId && <div className="movie-btn">
                                    <div className="btn-transform transform-vertical red">
                                        <div><Link to={`/movie/${movieId}/details?state=delete-movie`} className="item item-1 redbtn" style={{ "display": "flex", "justifyContent": "center" }} > <svg fill="#ffffff" style={{ "paddingRight": "5px" }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" /></svg> DELETE</Link></div>
                                        <div><Link to={`/movie/${movieId}/details?state=delete-movie`} className="item item-2 redbtn fancybox-media hvr-grow" rel="playlist" style={{ "display": "flex", "justifyContent": "center" }}  ><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" /></svg></Link></div>
                                    </div>
                                    <div className="btn-transform transform-vertical">
                                        <div><Link to={`/movie/${movieId}/details?state=edit-movie`} className="item item-1 yellowbtn" style={{ "display": "flex", "justifyContent": "center" }}>
                                            <svg fill="#000000" style={{ "paddingRight": "5px" }} viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                <title>edit</title>
                                                <path d="M17.438 22.469v-4.031l2.5-2.5v7.344c0 1.469-1.219 2.688-2.656 2.688h-14.625c-1.469 0-2.656-1.219-2.656-2.688v-14.594c0-1.469 1.188-2.688 2.656-2.688h14.844v0.031l-2.5 2.469h-11.5c-0.531 0-1 0.469-1 1.031v12.938c0 0.563 0.469 1 1 1h12.938c0.531 0 1-0.438 1-1zM19.813 7.219l2.656 2.656 1.219-1.219-2.656-2.656zM10.469 16.594l2.625 2.656 8.469-8.469-2.625-2.656zM8.594 21.094l3.625-0.969-2.656-2.656z"></path>
                                            </svg>
                                            EDIT</Link></div>
                                        <div>
                                            <Link to={`/movie/${movieId}/details?state=edit-movie`} className="item item-2 yellowbtn" style={{ "display": "flex", "justifyContent": "center" }}>
                                                <svg fill="#000000" style={{ "paddingRight": "5px" }} viewBox="-4 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                    <title>edit</title>
                                                    <path d="M17.438 22.469v-4.031l2.5-2.5v7.344c0 1.469-1.219 2.688-2.656 2.688h-14.625c-1.469 0-2.656-1.219-2.656-2.688v-14.594c0-1.469 1.188-2.688 2.656-2.688h14.844v0.031l-2.5 2.469h-11.5c-0.531 0-1 0.469-1 1.031v12.938c0 0.563 0.469 1 1 1h12.938c0.531 0 1-0.438 1-1zM19.813 7.219l2.656 2.656 1.219-1.219-2.656-2.656zM10.469 16.594l2.625 2.656 8.469-8.469-2.625-2.656zM8.594 21.094l3.625-0.969-2.656-2.656z"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="movie-single-ct main-content">
                                <h1 className="bd-hd">{movie.title}<span></span></h1>
                                <div className="social-btn">
                                    <div className="hover-bnt">

                                        {userId !== movie.ownerId && isLoggedIn &&
                                            <MovieLikes
                                                movie={movie}
                                                userId={userId}
                                                movieId={movieId}
                                            />
                                        }
                                        {userId === movie.ownerId &&
                                            <p style={{ "marginLeft": "15px", "fontSize": "18px" }} >{Object.entries(movie?.likes).length - 1} Likes
                                            </p>
                                        }
                                    </div>
                                </div>
                                <div className="movie-tabs">
                                    <div className="tabs">
                                        <ul className="tab-links tabs-mv">
                                            <li className={pageParams === 'overview' ? "active" : ""}><NavLink to="?state=overview" >Overview</NavLink></li>
                                            {userId === movie.ownerId && <li className={pageParams === 'edit-movie' ? "active" : ""}><NavLink to="?state=edit-movie">Edit movie</NavLink></li>}
                                            {userId === movie.ownerId && <li className={pageParams === 'delete-movie' ? "active" : ""}><NavLink to="?state=delete-movie">Delete movie</NavLink></li>}
                                        </ul>
                                        <div className="tab-content">
                                            {pageParams === 'overview' &&
                                                <div id="overview" className="tab active">
                                                    <div className="row">
                                                        <div className="col-md-8 col-sm-12 col-xs-12">
                                                            <p>{movie.dexcription}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {pageParams === 'edit-movie' &&
                                                <EditMovie
                                                    userHasEditMovieSetter={() => setUserHasEditTheMovie((prev) => !prev)}
                                                />
                                            }
                                            {pageParams === 'delete-movie' &&
                                                <DeleteMovie
                                                    movie={movie.title}
                                                    movieId={movieId}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetailsPage;