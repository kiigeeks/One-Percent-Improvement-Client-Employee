import React, { useEffect, useState } from 'react';
import PopupEvent from '../PopupEvent';
import { FetchData } from '../../utilities/customAxios';
import { toast } from 'react-toastify';

const LeftBar = () => {
    const [modalView, setModalView] = useState(false)
    const [datas, setDatas] = useState({})

    useEffect(() => {
        fetchBroadcast()
    }, [])

    const fetchBroadcast = async () => {
        FetchData("GET", `/broadcast`).then((res) => {
            setDatas(res.payload.filter((bc) => bc.status === "active"))
        }).catch((error) => {
            toast.error("Something Wrong "+error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleView = () => {
        setModalView(current => !current)
    }

    return (
        <>
            {modalView ? <PopupEvent pathImg={process.env.REACT_APP_PUBLIC_FOLDER+"/"+datas[0]?.flyer} setModalView={setModalView}  /> : null}
            <div className="hidden lg:flex flex-col w-1/2 left-0 z-40 ml-5">
                <div className="fixed mt-5 bg-white shadow-lg shadow-gray-400/50 p-5 rounded-lg flex flex-col gap-3 w-1/4">
                    <span className='font-roboto text-xl font-bold tracking-widest'>Informations </span>
                    <hr />
                    {datas[0]?.flyer &&
                        <div className="flex mt-3 justify-center">
                            <img className='cursor-pointer w-1/2 h-1/2' onClick={handleView} src={process.env.REACT_APP_PUBLIC_FOLDER+"/"+datas[0]?.flyer} alt={datas[0]?.title} />
                        </div>
                    }
                    <div className="flex mt-4 font-roboto font-normal text-justify">
                        {datas[0]?.desc}
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftBar