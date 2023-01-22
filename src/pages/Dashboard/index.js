import React from 'react'
import Topbar from '../../components/Topbar'
import Share from '../../components/Share'
import Feed from '../../components/Feed'
import LeftBar from '../../components/Leftbar'
import Rightbar from '../../components/Rightbar'

const Dashboard = () => {
    return (
        <>
            <Topbar />
            <div className="flex flex-row gap-7 min-h-[calc(100vh-2.75rem)] lg:w-full bg-grayPrimary">
                <LeftBar />
                <div className="flex flex-col w-full lg:w-1/2 lg:max-xl:w-full p-5 gap-5">
                    <Share />
                    <div className="flex justify-between items-center w-full gap-5 my-3">
                        <hr className="my-8 w-full h-px bg-gray-400 border-0" />
                        <span className="flex-1 text-base text-center w-full font-roboto font-semibold text-gray-900 bg-grayPrimary">
                            My Improvement
                        </span>
                        <hr className="my-8 w-full h-px bg-gray-400 border-0" />
                    </div>
                    <Feed />
                </div>
                <Rightbar />
            </div>
        </>
    )
}

export default Dashboard