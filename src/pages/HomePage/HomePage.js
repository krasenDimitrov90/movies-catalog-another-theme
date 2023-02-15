import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddMovie from "../../components/MovieActions/AddMovie/AddMovie";
import Movie from "../../components/Movie/Movie";
import PaginatorTemplate from "../../components/PaginatorTemplate/PaginatorTemplate";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import LoaderContext from "../../contexts/loader-context";


const HomePage = () => {

    const navigate = useNavigate();

    const { startLoader, stopLoader, } = React.useContext(LoaderContext);

    const { isLoggedIn } = React.useContext(AuthContext);
    const [movies, setMovies] = React.useState({});
    const [moviesIDs, setMoviesIDs] = React.useState(["empty"]);
    const [pages, setPages] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [moviesPerPage, setMoviesPerPage] = React.useState(8);
    const [searchParams] = useSearchParams();


    const pegesInputRef = React.useRef();


    React.useEffect(() => {
        if (!isLoggedIn) {
            setMoviesPerPage(12);
        } else {
            setMoviesPerPage(8);
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        setCurrentPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);


    const {
        sendRequest: request,
    } = useHttp();

    const afterFetchColectionCount = React.useCallback((movies) => {
        const moviesCount = Number(Object.keys(movies).length);
        const newPages = [];
        const length = Math.ceil(moviesCount / moviesPerPage);

        for (let i = 1; i <= length; i++) {
            newPages.push(i);
        }

        setPages(newPages);
        setMoviesIDs((prev) => [prev, ...Object.keys(movies).map(Number).sort((a, b) => a - b)]);
    }, [moviesPerPage]);

    React.useEffect(() => {
        const requestConfig = {
            action: "getColectionCount",
            path: '/movies',
            query: '?shallow=true',
        };

        request(requestConfig, afterFetchColectionCount);
    }, [request, afterFetchColectionCount]);

    const afterFetchMovies = React.useCallback((movies) => {
        setMovies(movies);
        stopLoader();
    }, []);

    React.useEffect(() => {

        const startIdx = (currentPage - 1) * moviesPerPage + 1;
        const endIdx = (currentPage - 1) * moviesPerPage + moviesPerPage;
        const startId = moviesIDs[startIdx];
        const endId = moviesIDs[endIdx];

        const requestConfig = {
            action: "getMovies",
            path: '/movies',
            query: `?orderBy=%22$key%22&startAt=%22${startId}%22&endAt=%22${endId}%22`,
        };

        startLoader();
        request(requestConfig, afterFetchMovies);
    }, [afterFetchMovies, request, currentPage, moviesIDs]);

    const handlePreviousPage = () => navigate(`/movies?page=${Math.max(1, currentPage - 1)}`);
    const handleNextPage = () => navigate(`/movies?page=${Math.min(pages.length, currentPage + 1)}`);

    const moviesPerPageHandler = (e) => {
        if (pegesInputRef.current.value > 5 || pegesInputRef.current.value < 1) {
            return;
        }
        setMoviesPerPage(Number(pegesInputRef.current.value));
    };



    return (
        <>
            <div className="hero common-hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="hero-ct">
                                <h1> Share your favorit movies with others</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-single">
                <div className="container">
                    <div className="row ipad-width" style={{ "display": "flex" }} >
                        <div className="col-md-8 col-sm-12 col-xs-12" style={{ "flex": "1", "marginTop": "32px" }} >
                            <div className="flex-wrap-movielist">
                                {Object.entries(movies).map(([movie, props]) => {
                                    return (
                                        <Movie
                                            key={movie}
                                            movieId={movie}
                                            imageUrl={props.imageUrl}
                                            ownerId={props.ownerId}
                                            title={props.title}
                                        />
                                    );
                                })}
                            </div>
                            <div className="topbar-filter" style={{ "justifyContent": "center" }} >

                                <ul className="pagination">
                                    {currentPage > 1 &&
                                        <li onClick={handlePreviousPage} className="icon-prev"><a href="#"><i className="ion-ios-arrow-left"></i></a></li>
                                    }
                                    {pages.map(page => {
                                        return (
                                            <PaginatorTemplate
                                                key={page}
                                                page={page}
                                                currentPage={currentPage}
                                            />
                                        );
                                    })}
                                    {currentPage < pages.length &&
                                        <li onClick={handleNextPage} className="icon-next"><a href="#"><i className="ion-ios-arrow-right"></i></a></li>
                                    }

                                </ul>
                            </div>
                        </div>

                        {isLoggedIn && <AddMovie />}

                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
