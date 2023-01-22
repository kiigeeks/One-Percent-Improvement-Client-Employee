import React, { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutUser, reset } from '../../features/authSlice';
import { SendData } from '../../utilities/customAxios';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Percentage from '../../components/Percentage';
import SpinnerLoading from '../../components/Loading/spinner';
import LeftBar from '../../components/Leftbar';
import Rightbar from '../../components/Rightbar';

const Profil = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [typePassword, setTypePassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const [typeNewPassword, setTypeNewPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false) 
    const [typeConfirmPassword, setTypeConfirmPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {return}
        setFullname(user.fullname)
        setUsername(user.username)
    }, [user])
    
    function handleLogOut() {
        dispatch(logoutUser());
        dispatch(reset());
        navigate("/login");
    }

    const handlePassword = () => {
        setShowPassword(!showPassword)
        setTypePassword(!typePassword)
    }

    const handleNewPassword = () => {
        setShowNewPassword(!showNewPassword)
        setTypeNewPassword(!typeNewPassword)
    }

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
        setTypeConfirmPassword(!typeConfirmPassword)
    }
    
    const handleUpdate = async (e) => {
        e.preventDefault()
        if(confirmPassword !== newPassword) {
            return toast.error("Password not match!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }

        if(username === user.username && fullname === user.fullname && password && !newPassword) {
            return toast.info("No data changes", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
        
        const reqData = {
            username,
            fullname,
            password,
            newPassword
        }

        SendData("PUT", `/user/profile/${user.uuid}`, reqData).then((res) => {
            toast.success(res.message+", You will be logout", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
            setTimeout(() => {
                handleLogOut()
            }, 3000)
        }).catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <>
            <Topbar />
            <div className="flex flex-col min-h-[calc(100vh-2.75rem)] lg:w-full bg-grayPrimary">
                {isLoading 
                    ?  
                        <div className="flex w-full justify-center items-center mt-5">
                            <SpinnerLoading />
                        </div>
                    :
                    <div className='flex flex-row'>
                        <LeftBar />
                        <div className="flex flex-col w-full lg:w-1/2 lg:max-xl:w-full gap-5 p-1">
                            <div className='flex flex-col gap-12 p-5'>
                                {/* header cover */}
                                <div className="felx flex-col justify-center">
                                    <div className="relative">
                                        <img src={process.env.REACT_APP_PUBLIC_FOLDER+"/cover/noCover.jpeg"} alt="Profile Pictures"
                                            className='w-full h-28 rounded-xl object-cover' />
                                    </div>
                                    <div className="flex w-full justify-center items-center flex-col gap-2">
                                        <div className="absolute bg-white rounded-full w-20 -mt-3 z-10 border border-gray-200">
                                            <img src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/* precentage */}
                                <Percentage />
                                {/* content  */}
                                <div className='-mt-2 mb-3 bg-white shadow-lg shadow-gray-300/50 p-3 rounded-lg h-fit w-full flex flex-col gap-5'>
                                    <span className='font-bold font-roboto text-xl tracking-wider text-center'>User Information</span>
                                    <hr />
                                    <form onSubmit={handleUpdate} className="flex flex-col gap-5">
                                        <div className="flex flex-col gap-5">
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Fullname</span>
                                                <input type="text" required minLength="3" placeholder='Fullname' value={fullname} onChange={(e) => setFullname(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                            </div>
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Username</span>
                                                <input type="text" required minLength="3" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                            </div>
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Old Password</span>
                                                <div className="relative">
                                                    <input type={typePassword ? 'text' : 'password'} required minLength="6" placeholder='Old Password' onChange={(e) => setPassword(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                                    <div onClick={handlePassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                                        {showPassword 
                                                            ? <FaRegEye />
                                                            : <FaRegEyeSlash />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>New Password</span>
                                                <div className="relative">
                                                    <input type={typeNewPassword ? 'text' : 'password'} minLength="6" placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                                    <div onClick={handleNewPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                                        {showNewPassword 
                                                            ? <FaRegEye />
                                                            : <FaRegEyeSlash />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Confirm New Password</span>
                                                <div className="relative">
                                                    <input type={typeConfirmPassword ? 'text' : 'password'} minLength="6" placeholder='Confirm New Password' onChange={(e) => setConfirmPassword(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                                    <div onClick={handleConfirmPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                                        {showConfirmPassword 
                                                            ? <FaRegEye />
                                                            : <FaRegEyeSlash />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Photo Profile</span>
                                                <input type="file" required minLength="3" placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                            </div>
                                            <div className="flex flex-col flex-1 w-full gap-1">
                                                <span className='ml-1 font-roboto text-base font-medium'>Cover</span>
                                                <input type="text" required minLength="3" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='text-sm rounded-lg w-full bg-grayPrimary border border-gray-300 p-2' />
                                            </div> */}
                                        </div>
                                        <hr />
                                        <div className="flex justify-center gap-3 mb-3">
                                            <button type='submit' className='self-end bg-blue-500 text-white font-roboto text-base px-3 py-1 rounded-md cursor-pointer'>
                                                Update
                                            </button>
                                            <span onClick={handleLogOut} className='self-end bg-red-700 text-white font-roboto text-base px-3 py-1 rounded-md cursor-pointer'>Log Out</span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Rightbar />
                    </div>
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Profil