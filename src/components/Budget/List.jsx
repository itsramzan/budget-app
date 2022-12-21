import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import UpdateBudgetModal from "./UpdateBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";
import Pagination from "../../components/UI/Pagination";
import { useGetBudgetsQuery } from "../../features/budget/budgetApi";
import Search from "./Search";
import Filter from "./Filter";
import { AnimatePresence, motion } from "framer-motion";

const List = () => {
  const [mutationData, setMutationData] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const pageSize = 5;
  const { isFetching, data, isError } = useGetBudgetsQuery({
    page,
    search,
    filter,
  });

  useEffect(() => {
    if (data?.results?.length === 0 && page > 1) {
      setPage((prevState) => prevState - 1);
    }
  }, [data, page]);

  const handlePaginate = (current) => {
    setPage(current);
  };

  // Decide what to render
  let content = null;

  if (isFetching) content = <p>Loading...</p>;

  if (!isFetching && isError) content = <p>Something went wrong</p>;

  if (!isFetching && !isError && data?.results?.length === 0)
    content = <p>No item found</p>;

  if (!isFetching && !isError && data?.results?.length > 0) {
    const { results, currentPage, totalItem } = data;

    content = (
      <>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {results.map((result, index) => {
                  const initial =
                    result.type === "income"
                      ? { opacity: 0, x: -150 }
                      : { opacity: 0, x: 150 };
                  const animate = { opacity: 1, x: 0 };

                  return (
                    <motion.tr
                      initial={initial}
                      animate={animate}
                      transition={{ duration: 1 }}
                      key={result._id}
                    >
                      <th>{(page - 1) * pageSize + index + 1}</th>
                      <td>{result.title}</td>
                      <td
                        className={`${
                          result.type === "income"
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {result.type}
                      </td>
                      <td>{moment(result.createdAt).format("MMM Do YY")}</td>
                      <td>{result.amount}</td>
                      <td className="flex justify-center items-center gap-4">
                        <label
                          htmlFor="update-budget-modal"
                          className="btn btn-xs btn-success"
                          onClick={() => setMutationData(result)}
                        >
                          Update
                        </label>
                        <label
                          htmlFor="delete-budget-modal"
                          className="btn btn-xs btn-error"
                          onClick={() => setMutationData(result)}
                        >
                          Delete
                        </label>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          <UpdateBudgetModal
            data={mutationData}
            {...{ page, search, filter }}
          />
          <DeleteBudgetModal data={mutationData} />
        </div>

        {totalItem > pageSize && (
          <Pagination
            page={currentPage}
            totalResults={totalItem}
            pageSize={pageSize}
            handlePaginate={handlePaginate}
          />
        )}
      </>
    );
  }

  return (
    <div className="col-span-12 md:col-span-8 space-y-4">
      <div className="flex justify-between items-center">
        <Search {...{ search, setSearch }} />
        <Filter {...{ filter, setFilter }} />
      </div>
      {content}
    </div>
  );
};

export default List;
