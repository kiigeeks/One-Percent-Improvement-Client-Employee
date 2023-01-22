import React from 'react';
import { RiCloseFill } from "react-icons/ri";

const PopupEvent = ({ pathImg, setModalView}) => {

    const handleModal = () => {
        setModalView(current => !current)
    }

    return (
        <>
            <div className='fixed top-0 left-0 z-50 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-80 p-3 flex items-center justify-center'>
                <div className="flex flex-col gap-3 w-full lg:w-1/3 md:w-1/2 bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <h3 className='text-center font-roboto font-bold text-xl tracking-widest'>Detail Flyer</h3>
                        <RiCloseFill onClick={handleModal} className='w-6 h-6 cursor-pointer'/>
                    </div>
                    <hr />
                    <div className='flex flex-col gap-3 w-full'>
                        <img src={pathImg} alt="Modal Event" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupEvent