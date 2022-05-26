import React from "react";
import { useDispatch } from "react-redux";
import { filteredTransactionByState, filteredTransactionsByType } from "../../reducer";

export default function Filter () {

    const dispatch = useDispatch()

    const handlerButton = (e) =>{
        e.preventDefault()
        if(e.target.name === 'costs'){
            dispatch(filteredTransactionsByType(e.target.value))
        }
        if(e.target.name === 'income'){
            dispatch(filteredTransactionsByType(e.target.value))
        }
        if(e.target.name === 'charged'){
            dispatch(filteredTransactionByState(e.target.value))
        }
        if(e.target.name === 'registered'){
            dispatch(filteredTransactionByState(e.target.value))
        }
    }

    return (
        <div className="border-2 border-zinc-800 sm:flex sm:w-full sm:h-[30px] sm:justify-evenly">
            <div>
                <button name='costs' value='costs' onClick={handlerButton}>COSTS</button>
            </div>
            <div>
                <button name="income" value='income' onClick={handlerButton}>INCOME</button>
            </div>
            <div>
                <button name='charged' value='charged' onClick={handlerButton}>CHARGED</button>
            </div>
            <div>
                <button name='registered' value='registered' onClick={handlerButton}>REGISTERED</button>
            </div>
        </div>
    )
}