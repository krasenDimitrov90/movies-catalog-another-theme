import React from "react";
import { Link } from "react-router-dom";

const PaginatorTemplate = ({ page, currentPage }) => {

    // const [searchParams] = useSearchParams();

    return (
        <li className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <Link className="page-link"
                to={`/movies?page=${page}`} >
                {page}
            </Link>
        </li>
    );
};

export default PaginatorTemplate;