import React from "react";
import './Navbar.css';
import portrait from './portrait.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href = "/" className="shadow">
                    SHADOW </a>
                <a href = "/">
                    TRIVIA
                </a>
            </div>
            <div className ="navbar-center">
                <ul className = "nav-links">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>

            <div className="navbar-right">
                <a href="/Profile">
                <img src={portrait} alt="portrait icon" className="profile-icon" />
                </a>
                {/* <a href="/Profile">Profile</a> */}
            </div>
        </nav>
    );
};

export default Navbar;