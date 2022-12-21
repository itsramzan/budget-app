import React, { useRef, useEffect } from "react";
import { useDeleteBudgetMutation } from "../../features/budget/budgetApi";

const DeleteBudgetModal = ({ data }) => {
  const { _id, title, type, amount } = data || {};

  const ref = useRef(null);

  const closeModal = () => {
    ref.current.click();
  };

  const [deleteBudget, { isSuccess }] = useDeleteBudgetMutation();

  const handleDeleteBudget = () => {
    deleteBudget(_id);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);

  return (
    <div>
      <input
        type="checkbox"
        id="delete-budget-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-12/12 md:w-4/12 max-w-5xl">
          <p>
            Are you confirm to delete
            <span className="text-primary font-semibold pl-2">
              {title} with {type} {amount}
            </span>{" "}
            ?
          </p>

          <div className="modal-action">
            <button
              onClick={handleDeleteBudget}
              className="btn btn-sm btn-primary"
            >
              Okey
            </button>
            <label
              htmlFor="delete-budget-modal"
              className="btn btn-sm btn-error"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBudgetModal;
