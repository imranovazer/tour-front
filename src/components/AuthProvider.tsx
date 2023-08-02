import React, { useState, useEffect, ReactNode } from "react";

import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { setILoading, setIsAuth } from "../redux/reducers/userSlice";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const isAuth = useAppSelector(state => state.user.isAuth); 
  const loading = useAppSelector(state=> state.user.loading)
  const dispatch = useAppDispatch();
  // const navigate = useNavigate(); 
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/users/echo", {}, { withCredentials: true });
        dispatch(setIsAuth(true));
        dispatch(setILoading(false));
        return res.data.data;
      } catch (error:any) {
        if (error.response && error.response.status === 401) {
          try {
            const refreshTokenResponse = await axios.post("http://localhost:3000/api/users/refresh-token", {}, { withCredentials: true });
            // Assuming your refresh-token endpoint returns a new access token in 'refreshTokenResponse.data.accessToken'
            // Set the new access token in the request headers for future requests
            dispatch(setIsAuth(true));
            dispatch(setILoading(false));
          } catch (refreshError) {
            // If token refresh fails or there's another error, logout the user
            dispatch(setIsAuth(false));
            dispatch(setILoading(false));
            // navigate('/login')
          }
        } else {
          // Handle other errors
          dispatch(setIsAuth(false));
          dispatch(setILoading(false));
        }
      }
    };
    verify();
  }, []);
  // return <>{loading ? isAuth ? <div>Loading...</div> : children : children}</>;
  return <>{loading? <h1>Loading...</h1> : children}</>;
}

export default AuthProvider;