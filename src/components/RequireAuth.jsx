import React from "react";
import {
  Navigate,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwtDecode from "jwt-decode";

const RequireAuth = () => {
  const { auth, setUser } = useAuth();
  const navigate = useNavigate();

  const token = auth?.accessToken;

  const decodeJwt = async (token) => {
    try {
      return await jwtDecode(token);
    } catch (error) {
      console.log(error);
      navigate("/sign_in");
    }
  };

  const decode = token ? decodeJwt(token) : null 

  console.log(decode);

  return decode ? <Outlet /> : <Navigate to={"/sign_in"} />;
};

export default RequireAuth;
