import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const StrictRoute = ({ element, ...rest }) => {
    const strictRoute = useSelector(({ strictRoute }) => strictRoute)
    console.log('strinctRoute', strictRoute?.isRoute)
    return (strictRoute?.isRoute ? <Outlet /> : <Navigate to='/unautherror' />

    )

}

export default StrictRoute