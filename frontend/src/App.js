import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { useState } from 'react';
import RefreshHandler from './Pages/RefreshHandler';
function App() {
  const[isAuthenticated,setIsAuthenticated]=useState("");
  const PrivateRoute=({element})=>{
    return isAuthenticated ? element:<Navigate to="/login"/>
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
  <Route path="/" element={<Navigate to="/login"/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
    </Routes>
    </div>
  );
}

export default App;
