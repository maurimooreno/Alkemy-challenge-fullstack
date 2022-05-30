import React from "react";
import { useDispatch } from "react-redux";
import { filteredTransactionsRegistered } from "../../reducer";
import {GiReceiveMoney, GiPayMoney} from 'react-icons/gi'

export default function Filter() {
  const dispatch = useDispatch();

  const handlerButton = (e) => {
    e.preventDefault();
    if (e.target.name === "costs") {
      dispatch(filteredTransactionsRegistered(e.target.value));
    }
    if (e.target.name === "income") {
      dispatch(filteredTransactionsRegistered(e.target.value));
    }
  };

  return (
    <div className="bg-zinc-100 flex sm:w-[400px] sm:h-[30px] justify-evenly rounded-md">
      <div className="flex items-center space-x-1 transition-all hover:scale-110 duration-500">
        <GiPayMoney/>
        <button
          name="costs"
          value="costs"
          onClick={handlerButton}
          className="text-md underline decoration-pink-500 decoration-4 hover:decoration-pink-800 "
        >
          COSTS
        </button>
      </div>
      <div className="flex items-center space-x-1 transition-all hover:scale-110 duration-500">
        <GiReceiveMoney/>
        <button
          name="income"
          value="income"
          onClick={handlerButton}
          className="text-md underline decoration-violet-500 decoration-4 hover:decoration-violet-800"
        >
          INCOME
        </button>
      </div>
    </div>
  );
}
