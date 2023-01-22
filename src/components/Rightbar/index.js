import React, { useEffect, useState } from 'react';
import { FetchData } from '../../utilities/customAxios';
import { toast } from 'react-toastify';

const Rightbar = () => {
    const [data, setData] = useState()

    useEffect(() => {
        fetchQuote()
    }, [])

    const fetchQuote = async () => {
        FetchData("POST", `/motivation/qod`).then((res) => {
            setData(res.payload[0])
        }).catch((error) => {
            toast.error("Something Wrong "+error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }
    
    return (
        <div className="hidden lg:flex flex-col w-1/2 z-40 right-0 items-end mr-5">
            <div className="fixed mt-5 bg-white shadow-lg shadow-gray-400/50 p-5 rounded-lg flex flex-col gap-3 w-1/4">
                <span className='font-roboto text-xl font-bold tracking-widest'>Quotes</span>
                <hr />
                {data && (
                    <div className="flex flex-col mt-3">
                        <div className='font-roboto italic text-base font-light tracking-wider'>
                            <span className='font-bold'>“ </span> 
                            {data?.message}
                            <span className='font-bold'> ”</span>
                        </div>
                        <span className=' font-bold mt-2'> - { data?.author } - </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Rightbar