
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { logo } from '../assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Navbar = () => {
  const navigate=useNavigate();
  const {isAuthenticated,logoutUser}=useAppContext();
  
  return (
    <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to={"/"}>
          <img src={logo} alt="logo" className='w-28 object-contain'/>
        </Link>
        <div>
        {isAuthenticated?(<>
          <Link to={"/create-post"} className=" inline-block font-inter mx-4 font-medium bg-[#6469ff] text-white px-3 py-[8px] rounded-md">
          Create
        </Link>
          <button onClick={logoutUser} className="border-[#020205] border-2 font-inter font-medium bg-gray text-black px-3 py-[6.5px] rounded-md  hover:bg-black hover:text-white">
          Logout
        </button></>
        ):(<>
          <button onClick={()=>{
            alert("please login");
            navigate('/auth');
          }} className="font-inter font-medium bg-[#6469ff] text-white px-3 py-[8px] rounded-md">
          Create
        </button>
          <Link to={"/auth"} className="inline-block border-[#020205] border-2 py-[6.5px] font-inter ml-4 font-medium bg-gray text-black px-3  rounded-md  hover:bg-black hover:text-white">
          Login
        </Link>
        </>
        )}
        
        
        </div>
    </header>
  )
}

export default Navbar
