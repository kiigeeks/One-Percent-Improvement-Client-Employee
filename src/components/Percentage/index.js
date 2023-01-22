import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { FetchData } from '../../utilities/customAxios';
import { toast } from 'react-toastify';

const Percentage = () => {
    const { user } = useSelector((state) => state.auth);
    const [donePercent, setDonePercent] = useState("");
    const [lengthImprove, setLengthImprove] = useState("");
    const optionDurations = [
        {
            label: "All of Time",
            value: 0,
        },
        {
            label: "in Last Month",
            value: 1,
        },
        {
            label: "in 3 Month",
            value: 3,
        },
    ]
    const [duration, setDuration] = useState(optionDurations[0])

    useEffect(() => {
        if(user === undefined || user === null) { return }
        fetchPercentage(duration.value, user && user.uuid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration])

    const fetchPercentage = async (timeline, userUUID) => {
        FetchData("GET", `/improvement/percentage/${timeline}/${userUUID}`).then((res) => {
            const improvements = res.payload
            const lengthData = res.payload.length
            setLengthImprove(lengthData)
            setDonePercent(
                Math.floor((filterStatus(improvements, "done").length/lengthData)*100)
            )
        }).catch((error) => {
            toast.error("Something Wrong "+error.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleDuration = (e) => {
        const filterLabel = optionDurations.filter((data) => (data.value).toString() === e.target.value)
        setDuration(filterLabel[0])
    }

    const filterStatus = (datas, type) => {
        return datas.filter((data) => data.status === type)
    }

    return (
        <div className=' bg-white shadow-lg shadow-gray-300/50 p-5 rounded-lg h-fit w-full flex flex-col gap-5'>
            {/* name & Division  */}
            <div className="flex flex-col items-center">
                <span className='font-roboto text-xl font-semibold'>{user?.fullname}</span>
                <span className='font-roboto text-lg font-semibold tracking-wide'>{user?.Division.name}</span>
            </div>
            <hr /> 
            {/* percentage */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="flex">You have improved</div>
                        <div className="flex flex-row gap-2">
                            <span className=" text-5xl">
                                {lengthImprove}
                            </span>
                            <span>Times</span>
                        </div>
                    </div>
                    <div className="flex flex-col px-3">
                        <span>Period :</span>
                        <select 
                            onChange={handleDuration} 
                            className="block w-fit text-base text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        >
                            {optionDurations.map((option, i) => (
                                <option key={i} value={option.value}>{option.label} </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full p-1 rounded-xl">
                    <div className="w-full bg-gray-200 rounded-full">
                        <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-2 leading-none rounded-full" style={{width: donePercent+"%"}}> </div>
                    </div>
                    <div className="flex items-center justify-center italic text-xs font-light">success percentage {donePercent}%</div>
                </div>
            </div>
        </div>
    )
}

export default Percentage