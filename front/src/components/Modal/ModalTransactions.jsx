import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDeleteTransactions } from "../../reducer";
import deleteBotton from "../../asstets/deleteButton.png";
import editBotton from "../../asstets/editButton.png";
import backButton from "../../asstets/backButton.svg"

export default function ModalTransactions({
  setTransactionsModal,
  allTransactions,
  setDataModal,
  setEditModal,
  setDisableType,
}) {
  const dispatch = useDispatch();
  const [filterState, setFilterState] = useState("off");

  const transactionsFiltered = allTransactions?.filter((t) =>
    filterState === "costs" ? t.type === "costs" : t.type === "income"
  );

  const handleCloseModal = (e) => {
    e.preventDefault();
    setTransactionsModal((state) => !state);
  };

  const handleModalEdit = (e) => {
    e.preventDefault();
    const obj = e.target.value;
    const arrObj = obj.split(",");
    const data = {
      id: arrObj[0],
      amount: arrObj[1],
      concept: arrObj[2],
      date: arrObj[3],
      type: arrObj[4],
    };
    setDataModal(data);
    setDisableType((state) => !state);
    setEditModal((state) => !state);
  };

  const handleAction = (e) => {
    e.preventDefault();
    const id = e.target.value;
    dispatch(fetchDeleteTransactions(id));
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (e.target.name === "costs") {
      setFilterState("costs");
    }
    if (e.target.name === "income") {
      setFilterState("income");
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-zinc-800 opacity-95 flex justify-center items-center">
      <div className="sm:w-[600px] sm:h-[500px] w-[500px] h-[500px] bg-gradient-to-r from-pink-500 to-violet-500 rounded-md flex flex-col items-center justify-center">
        <input type="image" src={backButton} alt="backButton" onClick={handleCloseModal} className="self-start mx-[30px] w-[30px] h-[30px]"/>
        <div className="sm:w-[500px] sm:h-[400px] w-[450px] h-[400px] bg-zinc-100 flex flex-col rounded-md overflow-scroll mt-[20px]">
          <div className="flex justify-center space-x-28">
            <button name="costs" onClick={handleFilter} className="text-md underline decoration-pink-500 decoration-4 hover:decoration-pink-800 ">
              COSTS
            </button>
            <button name="income" onClick={handleFilter} className="text-md underline decoration-violet-500 decoration-4 hover:decoration-violet-800">
              INCOME
            </button>
          </div>
          <table className="text-center border border-collapse">
            <thead className="border">
              <tr>
                <th className="p-[10px]">Concept</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {filterState === "off"
              ? allTransactions?.map((t) => (
                  <tbody key={t.id} className="border">
                    <tr>
                      <td>{t.concept}</td>
                      <td>{t.amount}</td>
                      <td>{t.date}</td>
                      <td>
                        <div className="flex justify-center items-center space-x-2">
                          <input
                            value={[t.id, t.amount, t.concept, t.date, t.type]}
                            onClick={handleModalEdit}
                            type="image"
                            src={editBotton}
                            alt="editButton"
                            className="w-[20px] h-[20px]"
                          />
                          <input
                            onClick={handleAction}
                            value={t.id}
                            type="image"
                            src={deleteBotton}
                            alt="deleteButton"
                            className="w-[27px] h-[27px]"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))
              : transactionsFiltered?.map((t) => (
                  <tbody key={t.id} className="border">
                    <tr>
                      <td>{t.concept}</td>
                      <td>{t.amount}</td>
                      <td>{t.date}</td>
                      <td>
                        <div className="flex justify-center items-center space-x-2">
                          <input
                            value={[t.id, t.amount, t.concept, t.date, t.type]}
                            onClick={handleModalEdit}
                            type="image"
                            src={editBotton}
                            alt="editButton"
                            className="w-[20px] h-[20px]"
                          />
                          <input
                            onClick={handleAction}
                            value={t.id}
                            type="image"
                            src={deleteBotton}
                            alt="deleteButton"
                            className="w-[27px] h-[27px]"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
          </table>
        </div>
      </div>
    </div>
  );
}
