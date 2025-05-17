import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { handleError, handleSuccess } from '../utils'
const Signup = () => {
    const[signupInfo,setSignupInfo]=useState({
        name:"",
        email:"",
        password:""
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
      const{name,value}=e.target;
        console.log(name,value);
        const copySignUpInfo={...signupInfo};
        copySignUpInfo[name]=value;
        setSignupInfo(copySignUpInfo  );
    }
    const handleSignup=async(e)=>{
       e.preventDefault();
       const{name,email,password}=signupInfo;
       if(!name|| !email|| !password){
         return handleError("All fields are required ")
       }
       try {
         const url="http://localhost:8080/auth/signup";
         const response=await fetch(url,{method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify(signupInfo)
        });
        const result =await response.json();
        const{success,message,error,jwtToken,name}=result;
        if(success){
            localStorage.setItem("token",jwtToken);
            localStorage.setItem("loggedInUser",name);
            handleSuccess(message);
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
       Signup
     </h1>
    <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='name'>
                Name
            </label>
            <input type="text" 
            onChange={handleChange}
            name='name'autoFocus placeholder='Let’s get to know you' value={signupInfo.name} />
        </div>
        <div>
            <label htmlFor='email'>
                Email
            </label>
            <input type="email"
             onChange={handleChange}
            name='email' placeholder='Let’s stay in touch' value={signupInfo.email} />
        </div>
        <div>
            <label htmlFor='password'>
                Password
            </label>
            <input type="password"
             onChange={handleChange}
             name='password'placeholder='Shhh... it’s a secret' value={signupInfo.password}/>
        </div>
        <button type='submit'>Signup</button>
        <span>
            Already have an account?
            <Link to="/login">Login</Link>
        </span>
    </form>
    <ToastContainer/>
     </div>
     </>
  )
}

export default Signup