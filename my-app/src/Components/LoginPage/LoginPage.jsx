import React, { useState } from 'react';
import './LoginPage.css';
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { login } from "../../api"; // Import the backend connection function
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("creator");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password);

            if (data.token) {
                // Successful login
                setMessage(`Welcome, ${data.user.username} (${data.user.role})`);
                localStorage.setItem("token", data.token);

                // Navigate based on user role
                if (data.user.role === "creator") {
                    navigate("/creator");
                } else if (data.user.role === "player") {
                    navigate("/user");
                }
            } else {
                // Backend returned an error (e.g. invalid credentials)
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
            {/* onSubmit handler */}
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
                    {/* Track username */}
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
                    {/* Track password */}
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

                {/* Show backend response message */}
                {message && <p style={{ marginTop: "10px" }}>{message}</p>}
            </form>
        </div>
        </div>
    );
};

export default LoginPage;