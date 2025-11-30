import React from "react";
import './Navbar.css';
import portrait from './portrait.png';
import { Link } from "react-router-dom";
import CreatorHomePage from './CreatorHP';
import {getCurrentUser} from "../../api";


const token = localStorage.getItem("token");

const user = await getCurrentUser(token);
console.log(user);

const Navbar = () => {
    function getHome() {
        if(user.role === "creator"){
            return (<Link to="/creator">Home</Link>)
        } else if(user.role === "player"){
            return (<Link to="/user">Home</Link>)
        }
    }

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
                        {getHome()}
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
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