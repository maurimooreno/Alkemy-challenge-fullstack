import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../reducer";

import List from "../list/List";
import Balance from "../balance/Balance";
import Filter from "../filter/Filter";
import ModalForm from "../Modal/ModalForm";
import ModalEdit from "../Modal/ModalEdit";
import ButtonAction from "../button/ButtonAction";
import ModalTransactions from "../Modal/ModalTransactions";

export default function Home() {
  const [stateModal, setStateModal] = useState(false)
  const [transactionsModal, setTransactionsModal] = useState(false)
  const [disableType, setDisableType] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [dataModal, setDataModal] = useState({
    id: '',
    concept: '',
    amount: '',
    type: '',
    data: ''
  })
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.rootReducer.transactionsFiltered
  );
  const allTransactions = useSelector(
    (state) => state.rootReducer.allTransactions
  )

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="bg-zinc-800 sm:w-full sm:h-screen sm:flex flex-col sm:justify-center sm:items-center">
      <div className="sm:w-[800px] sm:h-[500px] bg-gradient-to-r from-pink-500 to-violet-500 sm:flex sm:justify-evenly rounded-md">
        <div className="pt-[50px]">
          <Balance />
          <ButtonAction setStateModal={setStateModal} setTransactionsModal={setTransactionsModal}/>
        </div>
        <div className="flex flex-col sm:pt-[50px] pt-[20px]">
          <Filter/>
          {transactions.length ? (
            <List transactions={transactions} setEditModal={setEditModal} setDataModal={setDataModal}/>
          ) : (
            <div className="sm:w-[400px] w-full h-[360px] sm:h-[370px] flex justify-center py-[20px] bg-zinc-100 rounded-md sm:mt-[10px]">
              <span>Last 10 transactions added!</span>
            </div>
          )}
        </div>
      </div>
      {!!stateModal && <ModalForm setStateModal={setStateModal}/>}
      {!!editModal && <ModalEdit setEditModal={setEditModal} dataModal={dataModal} disableType={disableType} setDisableType={setDisableType}/>}
      {!!transactionsModal && <ModalTransactions setTransactionsModal={setTransactionsModal} allTransactions={allTransactions} setEditModal={setEditModal} setDataModal={setDataModal} setDisableType={setDisableType}/>}
    </div>
  );
}
