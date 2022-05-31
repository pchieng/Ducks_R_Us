import React, { useState } from "react";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setErrors([]);

        if (password !== passwordRepeat) {
          setErrors([new Error("Passwords must match.")]);
          return;
        }

        const response = await fetch("/api/signup", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ email: email, password: password }),
        });

        if (!response.ok) {
          const data = await response.json();
          setErrors([new Error(data.error)]);
          return;
        }

        window.location.href = "/";
      }}
    >
      <div>
        {errors.map((error) => (
          <div>{error.message}</div>
        ))}
      </div>
      <label>
        Email
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <label>
        Password (repeat)
        <input
          type="password"
          name="password-repeat"
          value={passwordRepeat}
          onChange={(e) => {
            setPasswordRepeat(e.target.value);
          }}
        />
      </label>
      {/* <button>Signup</button> */}
    </form>
  );
};

export default Signup;
