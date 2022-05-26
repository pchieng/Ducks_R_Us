import React, { useEffect, useState } from "react";
import { register } from '../axios-services/user'

const Register = () => {
    // used reg as a prefix for these in case we need to differentiate them from login stuff
    const [regEmail, setRegEmail] = useState("")
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    

    const userToRegister = {
        email: regEmail,
        username: regUsername,
        password: regPassword
        
        
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const waitRegister = await register(
            regEmail, 
            regUsername, 
            regPassword
            
            
            );
        // console.log(waitRegister, "user registered")
    }

return (
    <form className="loginButtons"onSubmit={handleRegister}>
        
        <label>Email:</label>
        <input type={"text"} 
            value={regEmail} 
            onChange={(event) => {
            setRegEmail(event.target.value)
                }} 
            placeholder={"Enter email"}/>

        <label>Username:</label>
        <input type={"text"} 
            value={regUsername} 
            onChange={(event) => {
            setRegUsername(event.target.value)
                }} 
            placeholder={"Enter username"}/>
        
        <label>Password:</label>          
        <input type={"text"} 
            min={8} 
            value={regPassword} 
            onChange={(event) => {
            setRegPassword(event.target.value)
                }}
        placeholder={"Enter password"}/>

        <button>Register</button>
    </form>
    )
}

export default Register