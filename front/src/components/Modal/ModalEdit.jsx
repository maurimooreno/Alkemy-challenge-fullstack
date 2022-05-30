import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUpdateTransactions } from "../../reducer";
import backButton from "../../asstets/backButton.svg";

const validate = (transaction) => {
  let error = {};
  if (!transaction.concept) {
    error.concept = "Please complete the fields"
  }
  if (!transaction.type || transaction.type === "select") {
    error.type = "Please complete the fields"
  }
  if (!transaction.date) {
    error.date = "Please complete the fields"
  }
  if (!transaction.amount) {
    error.amount = "Please complete the fields"
  }

  return error;
};

export default function ModalEdit({
  setEditModal,
  dataModal,
  disableType,
  setDisableType,
}) {
  const [input, setInput] = useState({
    id: "",
    concept: "",
    amount: "",
    type: "",
    date: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    setInput(dataModal);
  }, [dataModal]);

  const dispatch = useDispatch();

  const handleModal = (e) => {
    e.preventDefault();
    if (disableType) {
      setDisableType((state) => !state);
    }
    setEditModal((state) => !state);
  };

  const handlerChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({...input, [e.target.name]: e.target.value}))
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setInput({ ...input, type: e.target.value });
    setError(validate({...input, type: e.target.value}))
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if(!Object.keys(error).length){
      dispatch(fetchUpdateTransactions(input));
      setInput({
        concept: "",
        amount: "",
        type: "",
        date: "",
      });
      if (disableType) {
        setDisableType((state) => !state);
      }
      setEditModal((state) => !state);
    }else{
      alert("Please complete the fields")
    }
  };

  return (
    <div className="absolute inset-0 z-50 w-full h-screen bg-zinc-800 opacity-95 flex justify-center items-center">
      <div className="w-[400px] h-[300px] bg-gradient-to-r from-pink-500 to-violet-500 flex flex-col rounded-md">
        <input
          type="image"
          src={backButton}
          alt="backButton"
          onClick={handleModal}
          className="self-start mx-[10px] mt-[10px] w-[30px] h-[30px]"
        />
        <form className="flex flex-col px-[20px] pt-[10px]">
          <input
            type="text"
            hidden
            name="id"
            onChange={handlerChange}
            value={input.id}
          />
          <label>Concept</label>
          <input
            name="concept"
            type="text"
            onChange={handlerChange}
            value={input.concept}
            className="rounded-md"
          />
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            step="any"
            onChange={handlerChange}
            value={input.amount}
            className="rounded-md"
          />
          <label>Type</label>
          {disableType ? (
            <input value={input.type} disabled className="rounded-md"></input>
          ) : (
            <select
              value={input.type}
              onChange={handleSelect}
              className="rounded-md"
            >
              <option name="select">
                select
              </option>
              <option name="type" value="costs">
                costs
              </option>
              <option name="type" value="income">
                income
              </option>
            </select>
          )}

          <label>Date</label>
          <input
            name="date"
            type="Date"
            onChange={handlerChange}
            value={input.date}
            className="rounded-md"
          />
          <div className="space-x-4 pt-[10px]">
            <button
              type="submit"
              onClick={handlerSubmit}
              className="bg-blue-500 p-[5px] hover:bg-blue-300 rounded-md"
            >
              Edit
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
