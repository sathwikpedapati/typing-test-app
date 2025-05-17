import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'
const Login = () => {
    const[LoginInfo,setLoginInfo]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
      const{name,value}=e.target;
        console.log(name,value);
        const copyLoginInfo={...LoginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo  );
    }
    const handleLogin=async(e)=>{
       e.preventDefault();
       const{email,password}=LoginInfo;
       if(!email|| !password){
         return handleError("All fields are required ")
       }
       try {
         const url="https://typing-test-app-backend.vercel.app/auth/login";
         const response=await fetch(url,{method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(LoginInfo)
        });
        const result =await response.json();
        const{success,message,error,jwtToken,name}=result;
        if(success){
            handleSuccess(message);
            localStorage.setItem("token",jwtToken);
            localStorage.setItem("loggedInUser",name);
            setTimeout(()=>{
                navigate("/home");
            },1000);
        }else if(error){
            const details=error.details[0].message;
            handleError(details);
        }
        else if(!success){
            handleError(message);
        }

       } catch (error) {
           handleError(error);
       }

    }
  return (
     <>
     <div className='container'>
     <h1>
       Login
     </h1>
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor='email'>
                Email
            </label>
            <input type="email"
             onChange={handleChange}
            name='email' placeholder='Let’s stay in touch' value={LoginInfo.email} />
        </div>
        <div>
            <label htmlFor='password'>
                Password
            </label>
            <input type="password"
             onChange={handleChange}
             name='password'placeholder='Make it hard to guess' value={LoginInfo.password}/>
        </div>
        <button type='submit'>Login</button>
        <span>
            Create an Account?
            <Link to="/signup">SignUp</Link>
        </span>
    </form>
    <ToastContainer/>
     </div>
     </>
  )
}

export default Login;
