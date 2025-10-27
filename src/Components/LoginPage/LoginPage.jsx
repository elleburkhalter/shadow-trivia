import React, { useState } from 'react';
import './LoginPage.css';
import { FaUserCircle } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("creator");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Placeholder authentication
        if (username && password) {
            if (role === "creator") {
                navigate("/creator");
            } else {
                navigate("/user");
            }
        } else {
            alert("Please enter username and password");
        }
    };

    return (
        <div className="login-container">
        <div className='border'>
            <form onSubmit={handleLogin}>
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
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <FaUserCircle className='icon' />
                </div>

                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
            </form>
        </div>
        </div>
    );
};

export default LoginPage;
