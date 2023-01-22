import React, { useState } from 'react';
import { SendData } from '../../utilities/customAxios';
import { ToastContainer, toast } from 'react-toastify';
import { setNotif } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

const Share = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const handleForm = async (e) => {
        e.preventDefault()

        const reqData = {
            message
        }

        SendData("POST", "/improvement", reqData).then((res) => {
            setMessage("")
            dispatch(setNotif())
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <div className='bg-white shadow-lg shadow-gray-300/50 rounded-lg h-fit w-full flex flex-col md:flex-none md:self-center'>
            <form onSubmit={handleForm} className='flex flex-col gap-4 p-3'>
                <div className="flex gap-2">
                    <div className="rounded-full bg-grayPrimary border border-gray-400 object-cover w-10 h-10 flex justify-center items-center">
                        <img src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="profilePicture" />
                    </div>
                    <div className="flex flex-1 w-fit">
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required minLength="5" placeholder='your improvement' className='text-sm placeholder:italic rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                    </div>
                </div>
                <hr />
                <button type='submit' className='self-end bg-blue-500 text-white font-roboto text-sm px-2 py-1 rounded-md'>Submit</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Share