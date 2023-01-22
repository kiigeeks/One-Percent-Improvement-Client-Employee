
import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../../features/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [typePassword, setTypePassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false) 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //get value from redux
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        //check user or state is success true
        if(user || isSuccess) navigate("/")

        dispatch(reset())
    }, [user, isSuccess, dispatch, navigate])

    useEffect(() => {
        if(isError) {
            toast.error(message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        }
    }, [isError, message])

    const handlePassword = () => {
        setShowPassword(!showPassword)
        setTypePassword(!typePassword)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(loginUser({username, password}))
    }
    
    return (
        <div className='h-screen flex flex-col'>
            <div className="mt-5 p-3">
                <h1 className="text-4xl font-poppins text-center font-extrabold tracking-wider">One Percent Improvement</h1>
            </div>
            <div className="mt-10 flex justify-center">
                <span className="font-semibold font-poppins text-2xl tracking-widest">
                    Welcome
                </span>
            </div>
            <form onSubmit={handleLogin} className="flex items-center flex-col">
                <div className="mt-10 flex flex-col justify-between w-full lg:w-4/12 lg:max-xl:w-1/2">
                    <div className="flex flex-col px-10 py-2 gap-1">
                        <span className="font-robot">Username</span>
                        <input type="text" required minLength="3" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-lg p-2 border-2 border-blue-400 font-roboto" />
                    </div>
                    <div className="flex flex-col mt-3 px-10 py-2 gap-1">
                        <span className="font-robot">Password</span>
                        <div className="relative">
                            <input type={typePassword ? 'text' : 'password'} required minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className="w-full rounded-lg p-2 border-2 border-blue-400 font-roboto" />
                            <div onClick={handlePassword} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                                {showPassword 
                                    ? <FaRegEye />
                                    : <FaRegEyeSlash />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 mb-3 gap-2">
                    <div className="flex">
                        <button type='submit' className="shadow-lg cursor-pointer bg-blue-500 text-white tracking-widest font-poppins font-semibold text-lg px-4 py-2 rounded-lg">
                            {isLoading 
                                ? 
                                    <svg className="inline w-6 h-6 text-gray-300 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                : 'Log In'
                            }
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login