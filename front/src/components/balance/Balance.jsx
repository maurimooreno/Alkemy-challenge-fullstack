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
    <div
      name="containerBalance"
      className="border-2 border-emerald-700 sm:w-[200px] sm:h-[100px] sm:flex sm:flex-col sm:justify-around sm:items-center bg-pink-200"
    >
      <h1>TOTAL</h1>
      <span>{total.toFixed(2)}</span>
    </div>
  );
}
