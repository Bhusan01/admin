import React from 'react';
import './login.css';
import {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/apicalls';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const {isFetching, dispatch} = useContext(AuthContext)
    const handleLogin = (e) =>{
        e.preventDefault()
        login({email,password}, dispatch)
    }
    return (
        <div className="login">
            <form className="loginForm">
                <input type="text" placeholder="email"  className="loginInput" onChange={(e)=>{
                    setEmail(e.target.value)
                }} />
                <input type="password" placeholder="password"  className="loginInput" onChange={(e)=>{
                    setpassword(e.target.value)
                }} />
                <button className="loginButton" onClick={handleLogin} disabled={isFetching} >
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
