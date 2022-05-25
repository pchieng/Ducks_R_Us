import React, { useEffect, useState } from "react";
import { register } from '../axios-services/user'

const Register = () => {
    // used reg as a prefix for these in case we need to differentiate them from login stuff
    const [regEmail, setRegEmail] = useState("")
    const [regUsername, setRegUsername] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regDelAddress, setDelAddress] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const userToRegister = {
        email: regEmail,
        username: regUsername,
        password: regPassword,
        deliveryAddress: regDelAddress,
        isAdmin: isAdmin
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const waitRegister = await register(
            regEmail, 
            regUsername, 
            regPassword,
            regDelAddress,
            isAdmin
            );
        // console.log(waitRegister, "user registered")
    }
/* not sure when/where to include stuff for isAdmin since regular users 
should not see that as an option when registering */
return (
    <form className="loginButtons"onSubmit={handleRegister}>
        
        <label>Email:</label>
        <input type={"text"} 
            value={email} 
            onChange={(event) => {
            setRegEmail(event.target.value)
                }} 
            placeholder={"Enter email"}/>

        <label>Username:</label>
        <input type={"text"} 
            value={username} 
            onChange={(event) => {
            setRegUsername(event.target.value)
                }} 
            placeholder={"Enter username"}/>
        
        <label>Password:</label>          
        <input type={"text"} 
            min={8} 
            value={password} 
            onChange={(event) => {
            setRegPassword(event.target.value)
                }}
        placeholder={"Enter password"}/>

        <label>Delivery Address:</label>          
        <input type={"text"}  
            value={deliveryAddress} 
            onChange={(event) => {
            setDelAddress(event.target.value)
                }}
        placeholder={"Enter delivery address"}/>

        <button>Register</button>
    </form>
    )
}

export default Register