import React, { useEffect, useState } from 'react'
import { FormField } from '../components'
import { logo } from '../assets'
import {Loader} from '../components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useAppContext } from '../context/appContext'

const Register = () => {
  const navigate =useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    haveAccount:true
  })
  const {signInUser,loginUser,isAuthenticated,isLoading}=useAppContext()
  
  
  const toggleMember=()=>{
    setUser({...user,haveAccount:!user.haveAccount});
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    const { name, email, password, haveAccount } = user;
    if (!email || !password || (!haveAccount && !name)) {
      alert("provoide all values")
      return;
    }
    if(haveAccount){
      loginUser({
        email:user.email,
        password:user.password
      });
    }else{
      signInUser({
        name:user.name,
        email:user.email,
        password:user.password
      });
    }
  }
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
  },[isAuthenticated]);
  const handleChange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})

  }
  // if(isLoading){
  //   return (
  //     <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg">
  //       <Loader />
  //     </div>
  //   )
  // }
  return (
    <div className='h-screen w-full'>
     <form onSubmit={onSubmit} className='flex items-center justify-center flex-col h-full '>
      <div >
      <img src={logo} alt="logo" className='w-28 object-contain'/>
      </div>
      {/* name feild */}
      {!user.haveAccount && (
        <div className='sm:w-80 xs:w-9/12 mt-5'>
        <FormField
                labelName="Name"
                type="text"
                name="name"
                placeholder="user name"
                value={user.name}
                handleChange={handleChange}
        />
        </div>
      )}
      {/* email feild */}
      <div className="sm:w-80 xs:w-9/12 mt-6">
      <FormField
              labelName="Email"
              type="text"
              name="email"
              placeholder="user email"
              value={user.email}
              handleChange={handleChange}
      />
      </div>
      <div className="sm:w-80 xs:w-9/12 mt-6">
      <FormField
              labelName="Password"
              type="text"
              name="password"
              placeholder="user password"
              value={user.password}
              handleChange={handleChange}
      />
      </div>
      <div>
        <button 
         type='submit'
         className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        > {user.haveAccount?"Login":"SignIn"}</button>
      </div>
      <div>
      <p className='text-sm'>
          {user.haveAccount? 'Do not have account? ' : 'Already have an account? '}

          <button type='button' onClick={toggleMember} className='text-[#6469ff]'>
            {user.haveAccount ? 'SignIn' : 'Login'}
          </button>
      </p>
      </div>
      </form>
    </div>
  )
}

export default Register
