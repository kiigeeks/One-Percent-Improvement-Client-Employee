import React, { useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { SendData } from '../../utilities/customAxios';
import { setNotif } from '../../features/authSlice';
import { useDispatch } from 'react-redux';

const ReviewPost = ({ myImprovement, setModalReview }) => {
    const [note, setNote] = useState("")
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()

    const handleModal = () => {
        setModalReview(current => !current)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const reqData = {
            note,
            status
        }

        SendData("PUT", `/improvement/review/${myImprovement.uuid}`, reqData).then((res) => {
            if(res) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
                
                dispatch(setNotif())
                setModalReview(current => !current)
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
                        <h3 className='text-center font-roboto font-bold text-lg tracking-wide'>Review Improvement</h3>
                        <RiCloseFill onClick={handleModal} className='w-6 h-6 cursor-pointer'/>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                        <div className="flex flex-col">
                            <select required value={status} onChange={(e) => setStatus(e.target.value)} className="bg-grayPrimary border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="">Status</option>
                                <option value="done">done</option>
                                <option value="pending">pending</option>
                            </select>
                            <input type="text" required minLength="3" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Your review' className='mt-2 h-10 placeholder:text-gray-400 placeholder:italic rounded-lg w-full text-sm bg-grayPrimary focus:ring-blue-500 focus:border-blue-500 border border-gray-300 px-2.5' />
                        </div>
                        <button type='submit' className='bg-blue-500 w-fit mt-3 self-end text-white font-roboto px-3.5 py-1.5 rounded-xl cursor-pointer'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ReviewPost