import React, { useState } from 'react';
import '../../styles/styles.scss';

const Pagination = ({ moviesPerPage, totalMovie, paginate, currentPage, setCurrentPage }) => {
  const pageNumbers = [];
  const pagesCount = Math.ceil(totalMovie / moviesPerPage);
  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit - 1) {
      return (
        <li key={number} className="pagination__pageNumbers">
          <button
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : null}
            id={number}
          >
            {number}
          </button>
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextBtn = () => {
    if (currentPage < pageNumbers.length - 1) {
      paginate(currentPage + 1);

      if (currentPage + 1 > maxPageNumberLimit) {
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }
    }
  };

  const handlePrevtBtn = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);

      if ((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }
    }
  };

  console.log(currentPage);
  return (
    <nav>
      <ul className="pagination">
        <li>
          {totalMovie && (
            <button className="pagination__button" onClick={handlePrevtBtn}>
              &lt;
            </button>
          )}
        </li>
        {renderPageNumbers}
        <li>
          {totalMovie && (
            <button className="pagination__button" onClick={handleNextBtn}>
              &gt;
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
