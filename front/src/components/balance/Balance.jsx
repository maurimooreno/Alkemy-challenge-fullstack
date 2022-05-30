import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Balance() {
  const transactions = useSelector(
    (state) => state.rootReducer.allTransactions
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function calculateTotal() {
      let ingress = transactions
        ?.filter((t) => t.type === "income")
        ?.map((t) => parseFloat(t.amount));
      let egress = transactions
        ?.filter((t) => t.type === "costs")
        ?.map((t) => parseFloat(t.amount));

      let ingressTotal = 0;
      let egressTotal = 0;

      if (ingress) {
        for (let i = 0; i < ingress.length; i++) {
          ingressTotal += ingress[i];
        }
      }
      if (egress) {
        for (let j = 0; j < egress.length; j++) {
          egressTotal += egress[j];
        }
      }

      setTotal(ingressTotal - egressTotal);
    }

    calculateTotal();
  }, [transactions]);
  return (
    <div className="flex justify-center">
      <div
        name="containerBalance"
        className="w-[300px] sm:h-[200px] flex flex-col items-center sm:pt-[50px] bg-zinc-100 rounded-md"
      >
        <h1 className="pb-[20px] sm:text-3xl text-[24px] underline decoration-pink-500 decoration-8 font-bold">
          BALANCE TOTAL
        </h1>
        <div className="flex flex-wrap justify-center sm:space-x-2 items-center">
          <span className="text-4x1">Your balance is</span>
          <p className="text-[30px] ">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
