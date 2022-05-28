import React, { useState } from "react";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setErrors([]);

        const response = await fetch("/api/login", {
          method: "PUT",
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
      <button>Login</button>
    </form>
  );
};

export default Login;
