import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";
/* const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
]; */
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  /* initial states */
  const [expenses, setexpenses] = useState(initialExpenses);
  const [charge, setcharge] = useState("");
  const [amount, setamount] = useState("");
  const [id, setid] = useState("");
  const [edit, setedit] = useState(false);

  /* useeffect */
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  //alert
  const [alert, setalert] = useState({ show: false });

  /* functions */
  const handlealert = ({ type, text }) => {
    setalert({ show: true, type, text });

    setTimeout(() => {
      setalert({ show: false });
    }, 3000);
  };

  //function handlecharge

  const handlecharge = (e) => {
    setcharge(e.target.value);
  };

  //handleamount
  const handleamount = (e) => {
    setamount(e.target.value);
  };

  //handlesubmit
  const handlesubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const filtered = expenses.map((item) => {
          return item.id === id
            ? { ...item, charge: charge, amount: amount }
            : item;
        });
        setedit(false);
        setexpenses(filtered);
      } else {
        const singleexpense = { id: uuid(), charge: charge, amount: amount };
        setexpenses([...expenses, singleexpense]);
      }

      setcharge("");
      setamount("");
      handlealert({ type: "success", text: "items added" });
    } else {
      //handle alert
      handlealert({ type: "danger", text: "values cannot be empty" });
    }
  };
  //handleclear
  const handleclear = () => {
    console.log("clicked");
    setexpenses([]);
    handlealert({ type: "success", text: "item cleared" });
  };

  //handleedit
  const handleedit = (id) => {
    let filtered = expenses.find((item) => item.id === id);
    setcharge(filtered.charge);
    setamount(filtered.amount);
    setedit(true);
    setid(id);
  };

  //handledelete
  const handledelete = (id) => {
    let filtered = expenses.filter((item) => item.id !== id);
    setexpenses(filtered);
    handlealert({ type: "success", text: "item deleted" });
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Budget calcuator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handlecharge={handlecharge}
          handleamount={handleamount}
          handlesubmit={handlesubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleclear={handleclear}
          handleedit={handleedit}
          handledelete={handledelete}
        />
      </main>
      <h1>
        Total spending:
        <span className="total">
          ${" "}
          {expenses.reduce((sum, curr) => {
            return (sum += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
