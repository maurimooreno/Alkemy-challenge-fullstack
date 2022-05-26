import {React, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../reducer';

import List from '../list/List';
import Balance from '../balance/Balance';
import Filter from '../filter/Filter';
import ModalForm from '../Modal/ModalForm';

export default function Home() {

    const dispatch = useDispatch()
    const transactions = useSelector(state => state.rootReducer.transactionsFiltered)

    useEffect(() => {
        dispatch(fetchTransactions())
    },[dispatch])

    return(
        <div className='bg-pink-100 sm:w-full sm:h-screen sm:flex flex-col sm:justify-center sm:items-center'>
            <Balance/>
            <Filter/>
            {
                transactions.length?
                <List transactions={transactions}/>
                :
                <span> No existen registros! </span>
            }
            <ModalForm/>
        </div>
    )
}