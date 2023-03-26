import axios from 'axios'
import React, { useState,useEffect } from 'react'
import CreatePost from './CreatePost';
import Register from './Register';

const ProtectedRoute = ({children}) => {
    
   if(!user) {
    return <Register/>
   }
   return <CreatePost/>

}

export default ProtectedRoute
