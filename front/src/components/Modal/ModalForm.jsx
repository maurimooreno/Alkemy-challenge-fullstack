import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPostTransactions } from "../../reducer";
import backButton from "../../asstets/backButton.svg"

const validate = (transaction) => {
  let error = false
  if (!transaction.concept.length) {
    error = true
  }
  if (!transaction.type.length || transaction.type === "select") {
    error = true
  }
  if (!transaction.date.length) {
    error = true
  }
  if (!transaction.amount.length) {
    error = true
  }
  return error;
}

export default function ModalForm({ setStateModal}) {
  const [input, setInput] = useState({
    concept: "",
    amount: "",
    type: "",
    date: "",
  });
  const dispatch = useDispatch();

  const handleModal = (e) => {
    e.preventDefault();
    setStateModal((state) => !state);
  };

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
    if(!validate(input)){
      dispatch(fetchPostTransactions(input));
      setInput({
        concept: "",
        amount: "",
        type: "",
        date: "",
      });
      setStateModal((state) => !state);
    }else{
      alert("Please complete the fields")
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-zinc-800 opacity-95 flex justify-center items-center">
      <div className="w-[400px] h-[300px] bg-gradient-to-r from-pink-500 to-violet-500 flex flex-col rounded-md">
      <input type="image" src={backButton} alt="backButton" onClick={handleModal} className="self-start mx-[10px] mt-[10px] w-[30px] h-[30px]"/>
        <form className="flex flex-col px-[20px] pt-[10px]">
          <label>Concept</label>
          <input
            name="concept"
            type="text"
            onChange={handlerChange}
            value={input.concept}
            className="rounded-md"
            required
          />
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            step="any"
            onChange={handlerChange}
            value={input.amount}
            className="rounded-md"
            required
          />
          <label>Type</label>
          <select name="" id="" onChange={handleSelect} className="rounded-md">
            <option name="select" required>
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
            className="rounded-md"
            required
          />
          <div className="space-x-4 pt-[10px]">
            <button
              onClick={handlerSubmit}
              className="bg-blue-500 p-[5px] hover:bg-blue-300 rounded-md"
            >
              Add
            </button>
            <button
              onClick={handleModal}
              className="bg-zinc-100 p-[5px] rounded-md hover:bg-zinc-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
