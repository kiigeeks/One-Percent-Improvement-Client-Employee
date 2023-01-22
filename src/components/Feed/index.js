import React, { useEffect, useState } from 'react';
import Improvement from '../Improvement';
import ToTop from '../ToTop';
import { FetchData } from '../../utilities/customAxios';
import { useDispatch, useSelector } from "react-redux";
import { notifUpdated } from '../../features/authSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import SpinnerLoading from '../Loading/spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Feed = () => {
    const [myImprovements, setMyImprovements] = useState([])
    const { isUpdated } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [effectBox, setEffectBox] = useState("")
    const [hasMore, setHasMore] = useState(true)
    const [lastID, setLastID] = useState(0)
    const [tempID, setTempID] = useState(0)
    const limit = 5

    useEffect(() => {
        fetchImprovements()
        setEffectBox("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastID])

    useEffect(() => {
        if(isUpdated){
            //reset
            setMyImprovements(myImprovements.length = [])
            setLastID(0)
            setTempID(0)
            //fetch again
            fetchImprovements()
            setEffectBox("animate__animated animate__fadeIn")
            dispatch(notifUpdated())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdated, dispatch])

    const fetchImprovements = async () => {
        FetchData("GET", `/improvement/feed?lastID=${lastID}&limit=${limit}`).then((res) => {
            const lastImprovements = res.payload
            //add new data to array
            setMyImprovements([...myImprovements, ...lastImprovements])
            setTempID(res.lastData)
            setHasMore(res.next)
        }).catch((error) => {
            if(!error.response){
                navigate("/500")
            }else {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
            }
        })
    }

    const fetchMore = async () => {
        setLastID(tempID)
    }

    return (
        <React.Fragment> 
            <div className="flex flex-col w-full relative">
                <ToTop />
                <div className='flex flex-col'>
                    <InfiniteScroll
                        dataLength={myImprovements.length}
                        next={fetchMore}
                        hasMore={hasMore}
                        loader={<SpinnerLoading />}
                        className='flex flex-col gap-7 py-5 px-3 h-fit'
                    >
                        {myImprovements.map((myImprovement, i) => (
                            <Improvement key={i} myImprovement={myImprovement} effectBox={effectBox} />
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Feed