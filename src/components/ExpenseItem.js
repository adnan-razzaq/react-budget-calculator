import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({
  expense: { id, charge, amount },
  handleedit,
  handledelete,
}) => {
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          onClick={() => handleedit(id)}
          className="edit-btn"
          aria-label="edit-btn"
        >
          <MdEdit />
        </button>
        <button
          onClick={() => handledelete(id)}
          className="clear-btn"
          aria-label="clear-btn"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
