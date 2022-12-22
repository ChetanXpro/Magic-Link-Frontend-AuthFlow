import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import jwtDecode from "jwt-decode";

const RequireRole = () => {
  const {auth} = useAuth();
  const navigate = useNavigate()
  const token = auth?.accessToken
  const decode =  token ? jwtDecode(token) : null
  return !decode ? <Outlet/> : navigate('/login')
}

export default RequireRole