import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransactionRegister } from "../../reducer";

export default function List({transactions}){

    const dispatch = useDispatch()

    const handleAction = (e) => {
        e.preventDefault()
        dispatch(deleteTransactionRegister(e.target.value))
    }

    const ingress = transactions.filter( t => t.type === 'income')
    const egress = transactions.filter( t => t.type === 'costs')

    return (
        <div name='containerList' className="sm:flex sm:flex-col sm:w-[900px] sm:h-[500px] border-2 border-zinc-900">
            <div className="sm:flex sm:justify-evenly sm:mb-[20px]">
                <span>Concept</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Actions</span>
            </div>
            {
                ingress?.map( (t) => (
                    <div className="sm:flex sm:justify-evenly" key={t.id}>
                        <p>{t.concept}</p>
                        <p>{t.amount}</p>
                        <p>{t.date}</p>
                        <div>
                            <button>edit</button>
                            <button name='delete' value={t.id} onClick={handleAction}>delete</button>
                        </div>
                    </div>
                ))
            }
            {
                egress?.map( (t) => (
                    <div className="sm:flex sm:justify-evenly "key={t.id}>
                        <p>{t.concept}</p>
                        <p>{t.amount}</p>
                        <p>{t.date}</p>
                        <div>
                            <button>edit</button>
                            <button name='delete' value={t.id} onClick={handleAction}>delete</button>
                        </div>
                    </div>
                ))
            }
            <button>Create all</button>
        </div>
    )
}