import React from "react";
import './CreatorHP.css';
import { Link } from "react-router-dom";


const CreatorHomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome Creator to</p>
          <p className="shadow-main">SHADOW TRIVIA </p>
        
      </header>

      <div className="App-main">
        <ul className ="creator-options">
          {/* ADD LINKS TO OPTIONS */}
           <li className="create-quiz-button"> <Link to="/create-quiz" >Create Quiz </Link> </li>
          <li className ="create-classroom-button"> <a href="/" >Create Classroom</a></li>
        </ul>
      </div>

      <div className="App-footer">
        {/* FOOTER OR MORE INFORMATION PLACEHOLDER */}
      </div>
    </div>
  );
}

export default CreatorHomePage;
