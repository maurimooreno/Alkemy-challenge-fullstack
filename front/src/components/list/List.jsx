import React from "react";
import { useDispatch } from "react-redux";
import { fetchDeleteTransactions } from "../../reducer";
import deleteBotton from "../../asstets/deleteButton.png";
import editBotton from "../../asstets/editButton.png";

export default function List({ transactions, setEditModal, setDataModal }) {
  const dispatch = useDispatch();

  const handleModal = (e) => {
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
    setEditModal((state) => !state);
  };
  const handleAction = (e) => {
    e.preventDefault();
    const id = e.target.value;
    dispatch(fetchDeleteTransactions(id));
  };

  const ingress = transactions?.filter((t) => t.type === "income");
  const egress = transactions?.filter((t) => t.type === "costs");

  return (
    <div
      name="containerList"
      className="flex flex-col w-full sm:h-[370px] h-[360px] bg-zinc-100 rounded-md sm:mt-[10px] overflow-scroll"
    >
      <table className="text-center border border-collapse">
        <thead className="border">
          <tr>
            <th className="sm:p-[10px]">Concept</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {ingress?.map((t) => (
          <tbody key={t.id} className="border">
            <tr>
              <td>{t.concept}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td>
                <div className="flex justify-center items-center space-x-2">
                  <input
                    value={[t.id, t.amount, t.concept, t.date, t.type]}
                    onClick={handleModal}
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
        {egress?.map((t) => (
          <tbody key={t.id}>
            <tr>
              <td>{t.concept}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td>
                <div className="flex justify-center items-center space-x-2">
                  <input
                    value={[t.id, t.amount, t.concept, t.date, t.type]}
                    onClick={handleModal}
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
  );
}
