import React from "react";
import "./pagination.css"
import {PaginationProps} from "./types/types";

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const getVisiblePages = (currentPage: number, totalPages: number) => {
        const delta = 2;
        const visiblePages = [];

        for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
            visiblePages.push(i);
        }

        return visiblePages;
    };

    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="pagination-container">
            <ul className="pagination">
                {visiblePages.map((page, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && page - visiblePages[index - 1] > 1 && (
                            <li className="ellipsis">...</li>
                        )}
                        <li
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </li>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default Pagination
