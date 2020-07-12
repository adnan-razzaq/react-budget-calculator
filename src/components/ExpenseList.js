import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
const ExpenseList = ({ expenses, handleclear, handleedit, handledelete }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleedit={handleedit}
              handledelete={handledelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={handleclear}>
          Clear expenses <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
