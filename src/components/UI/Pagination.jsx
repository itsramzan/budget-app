import React from "react";
import ReactPagination from "rc-pagination";
// import "rc-pagination/assets/index.css";

const Pagination = ({ page, totalResults, pageSize, handlePaginate }) => {
  return (
    <div className="flex justify-end items-center pt-4">
      <ReactPagination
        defaultCurrent={page}
        current={page}
        total={totalResults}
        pageSize={pageSize}
        locale="en-US"
        onChange={handlePaginate}
        itemRender={(current, type, element) => {
          if (type === "prev") {
            return <div>Prev</div>;
          }
          if (type === "next") {
            return <div>Next</div>;
          }
          return element;
        }}
      />
    </div>
  );
};

export default Pagination;
