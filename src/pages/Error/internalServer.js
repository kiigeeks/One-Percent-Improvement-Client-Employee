import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => {
    return (
        <>
            <div className="flex flex-col lg:justify-center lg:items-center gap-3 p-5 min-h-screen w-full bg-grayPrimary">
                <div className="flex justify-center items-center lg:w-1/4 ">
                    <img src={process.env.REACT_APP_PUBLIC_FOLDER_LOCALE+"/images/web-maintenance.svg"} alt="Error Server" className='md:w-1/2 lg:w-full' />
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                    <span className='font-roboto font-bold text-2xl tracking-widest'>Internal Server Error</span>
                    <span className='font-roboto font-light text-xl tracking-widest'>Try Again Later</span>
                </div>
                <div className="flex items-center justify-center mt-10">
                    <Link to={"/"}>
                        <span className="flex text-white text-base tracking-wide font-roboto bg-blue-500 px-4 py-3 rounded-xl shadow-lg shadow-blue-500/50 cursor-pointer">Home</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ServerError