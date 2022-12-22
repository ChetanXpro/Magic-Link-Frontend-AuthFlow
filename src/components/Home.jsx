import { Spinner } from "@chakra-ui/react";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
// import { getUser } from "../Api/api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Home = () => {
 
  const apiPrivateInstance = useAxiosPrivate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const request = await apiPrivateInstance.get("/user");
        setData(request?.data);
      } catch (err) {
        console.log(err);
      }
      finally{
        setIsLoading(false);

      }
    };
    getUser();
  }, []);



  return (
    <div className="flex flex-col items-center gap-3 mt-20">
      <h2>Login successfuly </h2>
      <h2>API call with auth header to count all users </h2>
      {!isLoading ? <h1>Total users tested this project: {JSON.stringify(data?.userCount)}</h1> : <Spinner />}
    </div>
  );
};

export default Home;
