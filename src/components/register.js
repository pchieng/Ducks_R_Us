import React, { useEffect, useState } from "react";
import { register } from '../axios-services/user'


const Register = () => {
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    
    const handleRegister = async (event) => {
        event.preventDefault()
        const waitRegister = await register(regUsername, regPassword);
        console.log(waitRegister, "user registered")
    }

    return (
        <form className="loginButtons"onSubmit={handleRegister}>
        
        <label>Username:</label>
        <input type={"text"} 
            value={username} 
            onChange={(event) => {
            setRegUsername(event.target.value)
                }} 
            placeholder={"Enter username"}/>
        <label>Password:</label>          
        <input 
        type={"text"} 
        min={8} 
        value={password} 
        onChange={(event) => {
            setRegPassword(event.target.value)
        }}
        placeholder={"Enter password"}/>

        <button>Register</button>
    </form>
    )
}

export default Register