import React, { useState } from 'react';
import './LoginPage.css';
import { FaUserCircle} from "react-icons/fa";
import { IoIosLock } from "react-icons/io";

const LoginPage = () => {
    const [role, setRole] = useState("creator"); // "creator" | "player"
    return (
        <div className='border'>
            <form action="">
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
                    <input type="text" placeholder='Username' required />
                    <FaUserCircle className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <IoIosLock className='icon'/>
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
    );
};

export default LoginPage;