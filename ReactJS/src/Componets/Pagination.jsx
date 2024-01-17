import React from 'react';

const Pagination = ({ meta, currentPage, handlePageChange }) => {
  const renderPaginationItems = () => {
    const items = [];

    for (let i = meta?.startPage; i <= meta?.endPage; i++) {
      items.push(
        <li key={i} className={`page-item m-1 ${currentPage === i ? 'active' : ''}`}>
          <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }

    return items;
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <nav aria-label="Page navigation example ">
        <ul className="pagination">
          <li className="page-item m-1">
            <a
              className="page-link"
              href="#"
              onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
              disabled={meta?.currentPage === 1}
            >
              Pre
            </a>
          </li>
          {renderPaginationItems()}
          <li className="page-item m-1">
            <a
              className="page-link"
              href="#"
              onClick={() =>
                handlePageChange(meta?.totalPages > currentPage ? currentPage + 1 : currentPage)
              }
              disabled={currentPage === meta?.totalPages}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
