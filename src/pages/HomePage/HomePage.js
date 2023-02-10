import React from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import PaginatorTemplate from "../../components/PaginatorTemplate/PaginatorTemplate";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";


const HomePage = () => {

    const navigate = useNavigate();

    const { isLoggedIn } = React.useContext(AuthContext);
    const [movies, setMovies] = React.useState({});
    const [moviesIDs, setMoviesIDs] = React.useState(["empty"]);
    const [pages, setPages] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [moviesPerPage, setMoviesPerPage] = React.useState(2);
    // const moviesPerPage = 2;
    const [searchParams] = useSearchParams();

    const pegesInputRef = React.useRef();

    React.useEffect(() => {
        setCurrentPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);


    const {
        isLoading,
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
    }, []);

    React.useEffect(() => {

        console.log(moviesIDs);

        const startIdx = (currentPage - 1) * moviesPerPage + 1;
        const endIdx = (currentPage - 1) * moviesPerPage + moviesPerPage;
        const startId = moviesIDs[startIdx];
        const endId = moviesIDs[endIdx];

        console.log({ startIdx, endIdx, startId, endId });

        //movies.json?orderBy=%22$key%22&startAt=%22-NNkTuRl2SmccE-A03Ay%22&endAt=%22-NNkoZ5FKS8-MZ-5C4Na%22

        const requestConfig = {
            action: "getMovies",
            path: '/movies',
            query: `?orderBy=%22$key%22&startAt=%22${startId}%22&endAt=%22${endId}%22`,
        };

        request(requestConfig, afterFetchMovies)

    }, [afterFetchMovies, request, currentPage, moviesIDs]);

    const handlePreviousPage = () => navigate(`/movies?page=${Math.max(1, currentPage - 1)}`);
    const handleNextPage = () => navigate(`/movies?page=${Math.min(pages.length, currentPage + 1)}`);

    const moviesPerPageHandler = (e) => {
        if (pegesInputRef.current.value > 5 || pegesInputRef.current.value < 1) {
            return;
        }
        setMoviesPerPage(Number(pegesInputRef.current.value));
    };

    console.log({currentPage, pages});

    // if (currentPage > pages.length) {
    //     navigate(`/movies?page=${pages.length}`);
    // }

    return (
        <>
            {isLoading && <SpinnerModal />}
            <section id="home-page" className="view-section">
                <div className="jumbotron jumbotron-fluid text-light" style={{ "backgroundColor": "#343a40", "padding-top": "0" }} >
                    <img src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
                        className="img-fluid" alt="Responsive" style={{ width: "150%", "height": "200px" }} />
                    <h1 className="display-4">Movies</h1>
                    <p className="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
                </div>

                <h1 className="text-center">Movies</h1>

                <section className="home-page-pages-input-section">
                    {isLoggedIn &&
                        <section id="add-movie-button" style={{ paddingLeft: "54px" }} className="user">
                            <NavLink to="/add-movie" className="btn btn-warning ">Add Movie</NavLink>
                        </section>
                    }
                    <div class="input-group mb-3">
                        <input ref={pegesInputRef} type="number" min={1} max={5} class="form-control" placeholder="Movies per page" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div class="input-group-append">
                            <button onClick={moviesPerPageHandler} class="btn btn-outline-secondary" type="button">OK</button>
                        </div>
                    </div>
                </section>

                {!isLoading &&
                    <section id="movie">
                        <div className=" mt-3 ">
                            <div className="row d-flex d-wrap">
                                <div className="card-deck d-flex">
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
                            </div>
                        </div>
                    </section>}
            </section>
            <nav aria-label="..." className="pagination-container">
                <ul className="pagination">
                    <li className="page-item">
                        <button className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} onClick={handlePreviousPage} >Previous</button>
                    </li>

                    {pages.map(page => {
                        return (
                            <PaginatorTemplate
                                key={page}
                                page={page}
                                currentPage={currentPage}
                            />
                        );
                    })}

                    <li className="page-item">
                        <button className={`page-link ${currentPage === pages.length ? 'disabled' : ''}`} onClick={handleNextPage}  >Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default HomePage;
