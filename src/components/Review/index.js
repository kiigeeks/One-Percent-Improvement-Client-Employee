import React from 'react'

const Review = ({ note }) => {
    return (
        <div className="mt-3 w-full font-roboto font-normal py-1.5 px-2.5 text-sm rounded-xl bg-grayPrimary">
            {note}
        </div>
    )
}

export default Review