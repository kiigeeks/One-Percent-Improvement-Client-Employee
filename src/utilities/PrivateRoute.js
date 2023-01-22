
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { getUser } from '../features/authSlice'

const PrivateRoutes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isError} = useSelector((state => state.auth))

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    useEffect(() => {
        if(isError) navigate("/login")
    }, [isError, navigate])

    return (
        <Outlet />
    )
}

export default PrivateRoutes