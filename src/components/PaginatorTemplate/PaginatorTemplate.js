import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const PaginatorTemplate = ({ page }) => {

    const [searchParams] = useSearchParams();

    return (
        <li className="page-item ">
            <Link className="page-link"
                to={`/movies?page=${page}`} >
                {page}
            </Link>
        </li>
    );
};

export default PaginatorTemplate;