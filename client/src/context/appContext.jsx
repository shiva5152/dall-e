import reducer from "./reducer";
import axios from "axios";

import {
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCESS,
    LOGIN_USER_FAIL,
    SIGNIN_USER_BEGIN,
    SIGNIN_USER_SUCESS,
    SIGNIN_USER_FAIL,
    GET_ALL_POST_BEGIN,
    GET_ALL_POST_SUCESS,
    GET_ALL_POST_FAIL,
    GET_USER_POST_BEGIN,
    GET_USER_POST_SUCESS,
    GET_USER_POST_FAIL,
    DELETE_USER_POST
    
} from './action'
import React, { useReducer, useContext,useEffect } from 'react';


export const initialState  ={
    isLoading:false,
    isAuthenticated:false,
    user:null,
    showAlert:false,
    alertText: "",
    allPosts:[],
    userPosts:[]
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initialState);
  // axiso --base url
  const instance = axios.create({
    // development-> baseURL: 'abc/api/v1' or actul url of backend eg->https//backend.com,
    // production
    baseURL: '/api/v1',
    
  });
    const getAllPost=async()=>{
      dispatch({type:GET_ALL_POST_BEGIN});
      try {
        const {data}= await instance.get('/post')
        dispatch({type:GET_ALL_POST_SUCESS,
          payload:data.data
        })
      } catch (error) {
        dispatch({type:GET_ALL_POST_FAIL});
      }
    }
    const getUserPost=async()=>{
      dispatch({type:GET_USER_POST_BEGIN});
      try {
        const {data}= await instance.get('/post/myPost')
        dispatch({type:GET_USER_POST_SUCESS,
          payload:data.data
        })
      } catch (error) {
        dispatch({type:GET_USER_POST_FAIL});
      }
    }
    const deleteUserPost=()=>{
      dispatch({type:DELETE_USER_POST});
    }
    
    const logoutUser =async()=>{
      await instance.get('/auth/logout');
      dispatch({type:LOGOUT_USER});
      
      
    }
    
    const signInUser=async (currUser)=>{
      dispatch({type:SIGNIN_USER_BEGIN});
      try {
        const {data}= await instance.post('/auth/signin',currUser);
          dispatch({
            type:SIGNIN_USER_SUCESS,
            payload:data.user
          })
      } catch (error) {
        dispatch({type:SIGNIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }
    }
    const loginUser=async(currUser)=>{
      dispatch({type:LOGIN_USER_BEGIN});
      
      try{
        const {data} =await instance.post('/auth/login',currUser);
        
        dispatch({ 
          type:LOGIN_USER_SUCESS,
          payload:data.user
        })
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }

    }
    const getCurrUser=async()=>{
        dispatch({type:GET_USER_BEGIN});
        try{
          const {data}= await instance.get('/auth/getCurrUser');
          dispatch({
            type:GET_USER_SUCCESS,
            payload:data.user
          })
        }catch(err){
          
          if (err.response.status === 401) {
           
            return;
          };
          dispatch({type:GET_USER_FAIL})
          logoutUser();
          console.log(err.responce.data.msg);
        }
    }
    useEffect(() => {
      getCurrUser();
    }, []);
   
    return (
        <AppContext.Provider
          value={{...state,getCurrUser,logoutUser,signInUser,loginUser,getAllPost,getUserPost,deleteUserPost}}
        >
          {/*child componect which needs to be contexed eg App.js  */}
          {children}
        </AppContext.Provider>
      );
}
export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider };