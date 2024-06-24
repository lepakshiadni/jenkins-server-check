import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';


const EmployerRoute = ({ element, ...rest }) => {
    const role = localStorage.getItem('role')
    console.log('role', role)
    return (role === 'trainer' ? <Outlet /> : <Navigate to='/unautherror' />
    )

}

export default EmployerRoute