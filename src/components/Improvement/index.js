import React, { useEffect, useState } from 'react';
import { RiMore2Fill } from "react-icons/ri";
import Review from '../Review';
import ReviewPost from './review';
import EditPost from './edit';
import { useSelector } from "react-redux";
import ReactTimeAgo from 'react-time-ago';
import { toast } from 'react-toastify';

const Improvement = ({ myImprovement, effectBox }) => {
    const { user } = useSelector((state) => state.auth);
    const [countReview, setCountReview] = useState(0)
    const [showReview, setShowReview] = useState(false)
    const [showActionPost, setShowActionPost] = useState(false)
    const [bgBadge, setBgBadge] = useState("")
    const [modalEdit, setModalEdit] = useState(false)
    const [modalReview, setModalReview] = useState(false)

    useEffect(() => {
        if(myImprovement.status === "done"){
            setBgBadge("bg-green-500")
        } else if(myImprovement.status === "pending") {
            setBgBadge("bg-red-500")
        } else{
            setBgBadge("bg-yellow-500")
        }
        if(myImprovement.note !== null) {
            setCountReview(1)
        }
    }, [myImprovement.note, myImprovement.status])

    const handleReview = () => {
        setShowActionPost(!showActionPost)
        if(myImprovement.note !== null){
            return toast.error("Improvement already reviewed", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            })}
        setModalReview(current => !current)
    }

    const handleShowReview = () => {
        if(countReview !== 0) {
            setShowReview(!showReview);
        }
    }

    const handleEdit = () => {
        setShowActionPost(!showActionPost)
        if(myImprovement.updatedAt !== myImprovement.createdAt){
            return toast.error("Improvement already updated today", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            })
        } 
        setModalEdit(current => !current)
    }

    return (
        <>
            {modalEdit ? <EditPost myImprovement={myImprovement} setModalEdit={setModalEdit}  /> : null}
            {modalReview ? <ReviewPost myImprovement={myImprovement} setModalReview={setModalReview}  /> : null}
            <div className={`bg-white drop-shadow-lg  shadow-gray-400/50 p-3 rounded-lg h-fit w-full flex flex-col gap-3 ${effectBox}`}>
                {/* top  */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-grayPrimary border border-gray-400 object-cover w-9 h-9 flex justify-center items-center">
                            <img src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="profilePicture" />
                        </div>
                        <span className=' font-medium text-base'>
                            {user?.fullname}
                        </span>
                        <span className='italic font-light text-xs'>
                            <ReactTimeAgo date={Date.parse(myImprovement.createdAt)} locale="en-US"/>
                        </span>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <RiMore2Fill onClick={() => setShowActionPost(!showActionPost)} />
                        {showActionPost && 
                            <div className="absolute mt-28 right-5 w-fit rounded-md bg-grayPrimary shadow-lg shadow-gray-300 py-3 px-7 flex flex-col gap-2">
                                <span onClick={handleEdit} className='font-roboto text-base font-medium'>Edit</span>
                                <span onClick={handleReview} className='font-roboto text-base font-medium'>Review</span>
                            </div>
                        }
                    </div>
                </div>
                {/* message  */}
                <div className="flex font-roboto font-normal py-1 px-2">
                    {myImprovement.message}
                </div>
                {/* botttom  */}
                <div className="flex justify-between items-center">
                    <span className={`${bgBadge} rounded-xl px-2 py-1 text-white text-xs ml-2>`}>{myImprovement.status}</span>
                    <span onClick={handleShowReview} className="leading-3 p-1 self-end flex border-b-2 border-dotted border-gray-500 cursor-pointer text-gray-500 text-sm font-roboto">
                        {countReview} review
                    </span>
                </div>
                {/* review */}
                {showReview && <Review note={myImprovement.note}/>}
            </div>
        </>
    )
}

export default Improvement