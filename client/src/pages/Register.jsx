import React, { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        studentId: "",
        department: "",
        walletAddress: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {
        try {
            await registerUser(formData);
            alert("Registration Successful");
            window.location.href = "/";
        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        }
    };

    return (
        <div>
            <h2>Register</h2>

            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="text" name="studentId" placeholder="Student ID" onChange={handleChange} />
            <input type="text" name="department" placeholder="Department" onChange={handleChange} />
            <input type="text" name="walletAddress" placeholder="Wallet Address" onChange={handleChange} />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;