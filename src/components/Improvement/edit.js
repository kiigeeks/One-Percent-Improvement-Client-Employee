import React, { useState } from 'react'
import { RiCloseFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { SendData } from '../../utilities/customAxios';
import { setNotif } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

const EditPost = ({ myImprovement, setModalEdit }) => {
    const [message, setMessage] = useState(myImprovement.message)
    const dispatch = useDispatch()
    
    const handleModal = () => {
        setModalEdit(current => !current)
    }

    const handleSave = async (e) => {
        e.preventDefault()

        const reqData = {
            message
        }

        SendData("PUT", `/improvement/${myImprovement.uuid}`, reqData).then((res) => {
            if(res) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
                
                dispatch(setNotif())
                setModalEdit(current => !current)
            }
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <>
            <div className='fixed top-0 left-0 z-50 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-70 p-3 flex items-center justify-center'>
                <div className="flex flex-col gap-3 w-full lg:w-1/3 md:w-1/2 bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <h3 className='text-center font-roboto font-bold text-lg tracking-wide'>Edit Improvement</h3>
                        <RiCloseFill onClick={handleModal} className='w-6 h-6 cursor-pointer'/>
                    </div>
                    <span className="flex text-xs italic text-gray-500">
                        Improvements changes only one times
                    </span>
                    <hr />
                    <form onSubmit={handleSave} className='flex flex-col gap-3 w-full'>
                        <div className="flex flex-col">
                            <input type="text" placeholder='your improvement' 
                                value={message} 
                                required minLength="5" 
                                onChange={(e) => setMessage(e.target.value)}
                                className='mt-2 h-10 placeholder:text-gray-400 placeholder:italic rounded-lg w-full text-sm bg-grayPrimary focus:ring-blue-500 focus:border-blue-500 border border-gray-300 px-3' />
                        </div>
                        <button type='submit' className='bg-green-500 w-fit mt-3 self-end text-white font-roboto px-5 py-2 rounded-xl cursor-pointer'>Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditPost