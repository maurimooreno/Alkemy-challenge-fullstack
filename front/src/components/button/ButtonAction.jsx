import React from "react";

export default function ButtonAction({ setStateModal, setTransactionsModal }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === "all") {
      setTransactionsModal((state) => !state);
    }
    if (e.target.name === "new") {
      setStateModal((state) => !state);
    }
  };

  return (
    <div className="flex flex-col sm:mt-[50px] mt-[20px]">
      <button
        className="bg-zinc-100 sm:h-[50px] rounded-md transition hover:scale-110 duration-500"
        onClick={handleClick}
        name="all"
      >
        All Transactions
      </button>
      <button
        className="bg-zinc-100 sm:h-[50px] sm:mt-[25px] mt-[10px] rounded-md transition hover:scale-110 duration-500"
        onClick={handleClick}
        name="new"
      >
        New Transaction
      </button>
    </div>
  );
}
