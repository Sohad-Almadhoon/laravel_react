import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from '../contexts/ContextProvider';

const GuestLayout = () => {
  const { token } = useStateContext();
  
  if (token) {
    return <Navigate to="/users" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  )
}

export default GuestLayout