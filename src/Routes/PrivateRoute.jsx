import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const PrivateRoute = ({ element, ...rest }) => {
  const token = Cookies.get('token');
  return (
    token?<Outlet/>:<Navigate to='/'/>
  )


};

export default PrivateRoute;
