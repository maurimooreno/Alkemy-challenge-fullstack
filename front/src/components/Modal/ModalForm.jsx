import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactionsRegister } from "../../reducer";

export default function ModalForm() {
  const [input, setInput] = useState({
    concept: "",
    amount: "",
    type: "",
    date: "",
  });
  const dispatch = useDispatch();

  const handlerChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setInput({ ...input, type: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransactionsRegister(input));
    setInput({
      concept: "",
      amount: "",
      type: "",
      date: "",
    });
  };
  
  return (
    <div>
      <div>
        <button>X</button>
        <form>
          <label>Concept</label>
          <input
            name="concept"
            type="text"
            onChange={handlerChange}
            value={input.concept}
          />
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            step="any"
            onChange={handlerChange}
            value={input.amount}
          />
          <label>Type</label>
          <select name="" id="" onChange={handleSelect}>
            <option name='select' value="select">
                select
            </option>
            <option name="type" value="costs">
              costs
            </option>
            <option name="type" value="income">
              income
            </option>
          </select>
          <label>Date</label>
          <input
            name="date"
            type="Date"
            onChange={handlerChange}
            value={input.date}
          />
          <div>
            <button type="submit" onClick={handlerSubmit}>
              Agregar
            </button>
            <button>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
