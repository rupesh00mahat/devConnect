import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import PrimarySearchAppBar from '../../layouts/Navbar/Navbar';

function ProtectedRoutes() {

    const uid = useSelector((state)=> state.uid);

  return (
    <>
    <PrimarySearchAppBar/>
   { uid ? <Outlet/> : <Navigate to={'/login'}/>}
    </>
  )
}

export default ProtectedRoutes