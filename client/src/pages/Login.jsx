import React, { useState } from "react";
import { loginUser } from "../services/authService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await loginUser(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            alert("Login Successful");
            window.location.href = "/dashboard";
        } catch (error) {
            console.log(error.response?.data);
            alert("Invalid Email or Password");
        }
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px"
            }}
        >
            <h2>CampusCoin Login</h2>

            <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>Login</button>

            <p style={{ marginTop: "15px" }}>
                New User? <a href="/register">Register Here</a>
            </p>
        </div>
    );
}

export default Login;