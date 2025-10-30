import React, { useState } from 'react';
import './LoginPage.css';
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { login } from "../../api"; // ✅ import the backend connection function
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("creator"); // "creator" | "player"
    const [username, setUsername] = useState(""); // ✅ added
    const [password, setPassword] = useState(""); // ✅ added
    const [message, setMessage] = useState("");   // ✅ feedback message
    const navigate = useNavigate();

    // ✅ handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password);

            if (data.token) {
                // Successful login
                setMessage(`Welcome, ${data.user.username} (${data.user.role})`);
                localStorage.setItem("token", data.token);

                // Navigate based on role
                if (data.user.role === "creator") {
                    navigate("/creator");
                } else if (data.user.role === "player") {
                    navigate("/user");
                }
            } else {
                // Backend returned an error (e.g., invalid credentials)
                setMessage(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Server error. Please try again later.");
        }
    };

    return (
        <div className='login-container'>
        <div className='border'>
            {/* ✅ added onSubmit handler */}
            <form onSubmit={handleSubmit}>
                <h1>SHADOW TRIVIA</h1>

                {/* Role Selection Buttons */}
                <div className="role-select">
                    <button
                        type="button"
                        className={role === "creator" ? "selected" : ""}
                        onClick={() => setRole("creator")}
                    >
                        Creator
                    </button>
                    <button
                        type="button"
                        className={role === "player" ? "selected" : ""}
                        onClick={() => setRole("player")}
                    >
                        Player
                    </button>
                </div>

                <div className="input-box">
                    {/* ✅ track username */}
                    <input
                        type="text"
                        placeholder='Username'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUserCircle className='icon' />
                </div>

                <div className="input-box">
                    {/* ✅ track password */}
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <IoIosLock className='icon' />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot password</a>
                </div>

                <button type="submit">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>

                {/* ✅ show backend response message */}
                {message && <p style={{ marginTop: "10px" }}>{message}</p>}
            </form>
        </div>
        </div>
    );
};

export default LoginPage;