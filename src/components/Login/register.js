import React, { useState } from "react";
import { register } from '../../axios-services/user'
import "./loginStyle.css"

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
        if (regUsername === '' || regPassword === '' || regEmail === '') {
            alert('Please complete all fields')
            return;
        }
        const waitRegister = await register(userToRegister)
        if (waitRegister) alert(`Welcome, ${waitRegister.user.username}. ${waitRegister.message}`)
        setRegEmail('');
        setRegUsername('');
        setRegPassword('');
    }

    return (
        <form className="registerPage" onSubmit={handleRegister}>
            <h2>Create New Account</h2>
            <label>Email</label>
            <br />
            <input type={"text"}
                id='regEmailInput'
                value={regEmail}
                onChange={(event) => {
                    setRegEmail(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Username</label>
            <br />
            <input type="text"
                id='regUsernameInput'
                value={regUsername}
                onChange={(event) => {
                    setRegUsername(event.target.value)
                }}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input type="text"
                id='regPasswordInput'
                min="8"
                value={regPassword}
                onChange={(event) => {
                    setRegPassword(event.target.value)
                }}
            />

            <button>Register</button>
        </form>
    )
}

// Info from previous sign up page that we may add to existing register File. 

// import React, { useState } from "react";

// const Signup = () => {
//     const [errors, setErrors] = useState([]);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordRepeat, setPasswordRepeat] = useState("");

//     return (
//         <form
//             onSubmit={async (e) => {
//                 e.preventDefault();
//                 setErrors([]);

//                 if (password !== passwordRepeat) {
//                     setErrors([new Error("Passwords must match.")]);
//                     return;
//                 }

//                 const response = await fetch("/api/signup", {
//                     method: "POST",
//                     credentials: "include",
//                     body: JSON.stringify({ email: email, password: password }),
//                 });

//                 if (!response.ok) {
//                     const data = await response.json();
//                     setErrors([new Error(data.error)]);
//                     return;
//                 }

//                 window.location.href = "/";
//             }}
//         >
//             <div>
//                 {errors.map((error) => (
//                     <div>{error.message}</div>
//                 ))}
//             </div>
//             <label>
//                 Email
//                 <input
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={(e) => {
//                         setEmail(e.target.value);
//                     }}
//                 />
//             </label>
//             <label>
//                 Password
//                 <input
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                     }}
//                 />
//             </label>
//             <label>
//                 Password (repeat)
//                 <input
//                     type="password"
//                     name="password-repeat"
//                     value={passwordRepeat}
//                     onChange={(e) => {
//                         setPasswordRepeat(e.target.value);
//                     }}
//                 />
//             </label>
//             <button>Signup</button>
//         </form>
//     );
// };

// export default Signup;

export default Register