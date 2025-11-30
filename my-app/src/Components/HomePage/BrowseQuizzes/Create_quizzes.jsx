import React from "react";
import "./Quizzes.css";
import { Link } from "react-router-dom";
import quizData from "../../GamePlay/quiz.json";

// QUIZZES PAGE – LETS THE USER CHOOSE A QUIZ CATEGORY BASED ON quiz.json
const Quizzes = () => {
    // LOAD QUIZ CATEGORY DATA FROM quiz.json
    const quizzes = quizData.quizzes;

    return (
        <div className="Browse-App">
            <div className="Browse-main">

                {/* PAGE HEADER */}
                <h1 className="Browse-header">Choose a Quiz Type to Create</h1>

                <ul className="quiz-options">
                    {quizzes.map((quiz) => (
                        <li key={quiz.id}>
                            {/* EACH CATEGORY LINKS TO THE CREATE QUIZ PAGE */}
                            <Link to={`/create-quiz/${quiz.id}`}>
                                <h2>{quiz.title}</h2>
                                {/* TYPE FIELD HIDDEN FOR NOW */}
                                {/* <p>Type: {quiz.type}</p> */}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FOOTER SECTION WITH GRADIENT BACKGROUND */}
            <div className="Browse-footer"></div>
        </div>
    );
};

export default Quizzes;
