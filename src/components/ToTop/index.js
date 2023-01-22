import React, { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

const ToTop = () => {
    const [showTop, setShowTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTop(true)
            }else {
                setShowTop(false)
            }
        }, true)
    }, [])

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior:'smooth'
        })
    }

    return (
        <React.Fragment>
            {showTop 
                ? <div onClick={goTop} className="fixed bottom-3 mr-1 flex z-40 mb-2 self-end justify-center items-center rounded-full drop-shadow-lg cursor-pointer bg-blue-500 w-10 h-10 lg:w-9 lg:h-9 p-3">
                        <FaArrowUp className='w-5 h-7 text-white' />
                    </div>
                : ""
            }
        </React.Fragment>
    )
}

export default ToTop