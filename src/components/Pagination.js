import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export function Pagination({ currentPage, totalPages }) {
  const [searchParams] = useSearchParams();

  // Create new search parameters with updated page number
  const createPageUrl = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    return `?${newParams.toString()}`;
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="row mb-3">
      <div className="col-12">
        {/* Older Posts (Previous Page) */}
        {!isFirstPage ? (
          <Link
            to={createPageUrl(currentPage - 1)}
            className="btn btn-outline-secondary float-left"
          >
            &larr; Newer
          </Link>
        ) : (
          <span className="btn btn-outline-secondary float-left disabled">
            &larr; Newer
          </span>
        )}

        {/* Newer Posts (Next Page) */}
        {!isLastPage ? (
          <Link
            to={createPageUrl(currentPage + 1)}
            className="btn btn-outline-dark float-right"
          >
            Older &rarr;
          </Link>
        ) : (
          <span className="btn btn-outline-dark float-right disabled">
            Older &rarr;
          </span>
        )}
      </div>
    </div>
  );
}
