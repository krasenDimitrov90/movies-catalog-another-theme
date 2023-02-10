import React from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import PaginatorTemplate from "../../components/PaginatorTemplate/PaginatorTemplate";
import SpinnerModal from "../../components/Spinner/Spinner";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";


const HomePage = () => {

    const { isLoggedIn } = React.useContext(AuthContext);
    const [movies, setMovies] = React.useState({});
    const [pages, setPages] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const moviesPerPage = 2;
    const [searchParams] = useSearchParams();

    React.useEffect(() => {
        setCurrentPage(searchParams.get('page') || 1);
    },[searchParams]);


    const {
        isLoading,
        sendRequest: request,
    } = useHttp();

    const afterFetchColectionCount = React.useCallback((movies) => {
        // const moviesCount = Number(Object.values(movie)[0].position);
        const moviesCount = Number(Object.keys(movies).length);
        const newPages = [];
        const length = Math.ceil(moviesCount / moviesPerPage);

        for (let i = 1; i <= length; i++) {
            newPages.push(i);
        }

        setPages(newPages);
    }, []);

    React.useEffect(() => {
        const requestConfig = {
            action: "getColectionCount",
            path: '/movies',
            // query: '?orderBy="position"&limitToLast=1',
            query: '?shallow=true',
        };

        request(requestConfig, afterFetchColectionCount);
    }, [request, afterFetchColectionCount]);

    const afterFetchMovies = React.useCallback((movies) => {
        setMovies(movies);
    }, []);

    React.useEffect(() => {

        let allPositions = Object.keys(movies).reduce((acc, movie) => {
            acc.push(Number(movies[movie].position));
            return acc;
        },[]);

        // const positionToStart = currentPage === 1 ? 1 : (Math.max(...allPositions) + 1);
        const positionToStart = currentPage === 1 ? 1 : (currentPage * moviesPerPage) - 1;

        const requestConfig = {
            action: "getMovies",
            path: '/movies',
            query: `?orderBy="position"&startAt=${positionToStart}&limitToFirst=${moviesPerPage}`,
        };

        request(requestConfig, afterFetchMovies)

    }, [afterFetchMovies, request, currentPage]);
    

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
                    <section id="add-movie-button" style={{ paddingLeft: "54px" }} className="user">
                        <NavLink to="/add-movie" className="btn btn-warning ">Add Movie</NavLink>
                    </section>
                }

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
                        <Link className="page-link" to="prev" >Previous</Link>
                    </li>

                    {pages.map(page => {
                        return (
                            <PaginatorTemplate
                                key={page}
                                page={page}
                            />
                        );
                    })}

                    <li className="page-item">
                        <Link className="page-link" to="next">Next</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default HomePage;
