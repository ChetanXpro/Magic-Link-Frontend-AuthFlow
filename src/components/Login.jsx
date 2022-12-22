import {
  Button,

  Flex,
  Input,
  
  Text,

} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { login } from "../Api/api";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { Backdrop, Modal } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useToast } from '@chakra-ui/react'
const Login = () => {
  const [email, setEmail] = useState("");
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const { setAuth, setUser } = useAuth();
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const toast = useToast({position:'top'})

  // const navigate = Navigate()

  const queryClient = useQueryClient();

  const { isLoading, isError, error, mutate } = useMutation(login, {
    onSuccess: (data) => {
     
      console.log(data);

      toast({
        title: 'Link send to your mail',
       
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      setAuth(data);
      setSuccess(true);
      
    },
    onError: () => {
      console.log("error" + error);
    },
  });
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email,
    };
    mutate(payload);
  };
  return (
    <Flex h="100vh" bg={"#2b2b2b"} justifyContent="center">
     
      <Flex
        marginX="6"
        marginY={"6"}
        w={[300, 300, 400]}
        flexDirection={"column"}
        mt={"36"}
      >
        <form onSubmit={handleSubmit}>
          <Text
            textAlign={"center"}
            color="white"
            fontFamily={"heading"}
            fontSize="2xl"
            mb={"6"}
          >
            Login to your account
          </Text>
          <p
            style={{
              textAlign: "center",
              marginBottom: "12px",
              marginTop: "4px",
              color: "red",
            }}
          >
            {isError ? `${error?.data?.message}` : ""}
          </p>
          <FormControl mb={"4"} isInvalid={false}>
            <Input
              type={"email"}
              h="12"
              color={"whiteAlpha.900"}
              autoComplete="true"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>

          <Button
            isLoading={isLoading}
            loadingText="Sending mail"
            width={"full"}
            h="12"
            colorScheme={`${success ? "green" : "teal"}`}
            mt={"2"}
            onClick={handleSubmit}
          >
           {success ? 'Please check your email': 'Sign up / Login'} 
          </Button>
          
        </form>
        <div>
        
        </div>
        {/* <Flex mt={'4'} justifyContent='center'>

        <span style={{textAlign:'center',marginRight:'6px',color:'wheat'}}>Don't have an account ? </span>
        <Link className="text-blue-400" to={'/sign_up'}>Sign up / Login</Link>
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default Login;
