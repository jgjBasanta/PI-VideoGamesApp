import React from "react";
import './paginado.styles.css';

export default function Paginado({gamesPerPage, games, setCurrentPage}) {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(games/gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="pagination-container">
                {pageNumbers?.map((page, index) => (
                    <button className="page-link" key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                ))}
               
        </div>
    )
}