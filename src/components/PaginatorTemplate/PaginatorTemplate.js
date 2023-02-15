import React from "react";
import { NavLink } from "react-router-dom";

const PaginatorTemplate = ({ page, currentPage }) => {

    return (
        <li><NavLink className={`${page === currentPage ? 'active' : ''}`}
            to={`/movies?page=${page}`} >
            {page}
        </NavLink>
        </li>
    );
};

export default PaginatorTemplate;