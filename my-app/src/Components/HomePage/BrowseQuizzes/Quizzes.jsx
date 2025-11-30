import React from "react";
import "./Quizzes.css";
import { Link } from "react-router-dom";
import quizData from "../../GamePlay/quiz.json";

const Quizzes = () => {
    const quizzes = quizData.quizzes;

    return (
        <div className="Browse-App">

            <div className="Browse-main">
                <h1 className="Browse-header">Choose a Quiz Category</h1>

                <ul className="quiz-options">
                    {quizzes.map((quiz) => (
                        <li key={quiz.id} className="quiz-button">
                            {/* Route to QuizTypeList */}
                            <Link to={`/quiz-type/${quiz.id}`}>
                                {quiz.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="Browse-footer"></div>
        </div>
    );
};

export default Quizzes;
