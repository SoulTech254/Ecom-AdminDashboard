import React from "react";

const PaginationSelector = ({ page, pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div className="pagination-content">
        {page !== 1 && (
          <div className="pagination-item">
            <a
              href="#"
              className="pagination-link"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page - 1);
              }}
            >
              Previous
            </a>
          </div>
        )}
        {pageNumbers.map((number) => (
          <div className="pagination-item" key={number}>
            <a
              href="#"
              className={`pagination-link ${page === number ? "active" : ""}`}
              onClick={(e) => {
                onPageChange(number);
              }}
            >
              {number}
            </a>
          </div>
        ))}
        {page !== pages && (
          <div className="pagination-item">
            <a
              href="#"
              className="pagination-link"
              onClick={(e) => {
                onPageChange(page + 1);
              }}
            >
              Next
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaginationSelector;
