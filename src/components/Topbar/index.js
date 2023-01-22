import React from 'react'
import { Link } from'react-router-dom';

const Topbar = () => {
    return (
        <div className='bg-white h-11 shadow-xl shadow-gray-400/10 sticky top-0 z-50 flex justify-between items-center px-5 py-3'>
            <Link to={"/"}>
                <div className="flex font-poppins font-bold text-lg tracking-wide cursor-pointer lg:ml-5">
                    1% Improvement
                </div>
            </Link>
            <Link to={"/profile"}>
                <div className="flex rounded-full bg-white w-8 h-8 justify-center items-center border border-gray-400 object-cover lg:mr-5">
                    <img src={process.env.REACT_APP_PUBLIC_FOLDER+"/employee/noAvatar.png"} alt="ProfilePicture" />
                </div>
            </Link>
        </div>
    )
}

export default Topbar