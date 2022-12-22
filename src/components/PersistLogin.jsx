import { Spinner } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [loading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const token = searchParams.get("token");
  // console.log(token);
  // localStorage.setItem("jwt", token);
  const { auth, setUser } = useAuth();

  useEffect(() => {
    const verfyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verfyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{loading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
