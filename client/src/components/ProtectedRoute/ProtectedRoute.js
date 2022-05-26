import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import {retreiveToken} from '../../utils/auth';
export default function ProtectedRoute() {
    const isAuth = retreiveToken();
    return (isAuth ? <Outlet/> : <Navigate to="/login"/>   )

}
