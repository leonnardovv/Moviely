/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import _ from "lodash"; // underscore
import PropTypes from "prop-types";
const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  //   const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize); // doing this for converting into integer because it will return 0.something and it will still show the [1] pagination
  const pages = _.range(1, pagesCount + 1);
  // [1...pagesCount].map()

  if (pagesCount === 1) return null;
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
