import React, { useEffect, useState } from "react";
import { login } from '../axios-services/user'

const Login = (props) => {
    const { isLoggedIn, setIsLoggedIn } = props
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const handleLogin = async (event) => {
        event.preventDefault()
        const waitLogin = await login(loginUsername, loginPassword);
    }

    useEffect(() => {
        const getToken = localStorage.getItem("token" ) ? true : false
        // console.log("is user logged in:", getToken)
      setIsLoggedIn(getToken)
    }, []);

    return (
    <form className="loginButtons"onSubmit={handleLogin}>

        <label>Username:</label>
        <input type={"text"} 
            value={loginUsername} 
            onChange={(event) => {
            setLoginUsername(event.target.value)
            }} 
            placeholder={"Enter username"}/>

        <label>Password:</label>          
        <input 
            type={"text"} 
            value={loginPassword} 
            onChange={(event) => {
            setLoginPassword(event.target.value)
                }}
            placeholder={"Enter password"}/>

        <button>Login</button>
    </form>
    )
    
}

export default Login