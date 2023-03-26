import React,{useEffect} from 'react'
import {BrowserRouter as Router,Link,Route,Routes} from 'react-router-dom'
import {Home, Register, CreatePost} from './pages'


const App = () => {
 

  return (
  <Router>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/auth" element={<Register/>}/>
    </Routes>

  </Router>
  )
}

export default App
