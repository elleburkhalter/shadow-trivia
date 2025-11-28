import React from "react";
import './Quizzes.css';
import { Link } from "react-router-dom";
import quizData from '../../GamePlay/quiz-data.json';


const Quizzes = () => {
  const quizzes = quizData.quizzes;
  return (
    <div className="Browse-App">

      <div className="Browse-main">
        <ul className ="quiz-options">
          {/* ADD LINKS TO OPTIONS */}
          {quizzes.map((quiz, index) => (
            <li key={quiz.id} className ="quiz-button">
              <Link to={`/gameplay/${quiz.id}`} >{quiz.title}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="Browse-footer">
        {/* FOOTER OR MORE INFORMATION PLACEHOLDER */}
      </div>
    </div>
  );
}

export default Quizzes;