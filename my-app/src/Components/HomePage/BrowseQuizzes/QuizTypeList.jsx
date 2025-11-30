import React, { useEffect, useState } from "react";
import "./Quizzes.css";
import { Link, useParams } from "react-router-dom";
import quizData from "../../GamePlay/quiz.json";

const QuizTypeList = () => {
    const { id } = useParams();

    const [dbQuizzes, setDbQuizzes] = useState([]);

    // READ CATEGORY FROM quiz.json
    const quizCategory = quizData.quizzes.find(q => q.id === Number(id));
    const quizType = quizCategory?.type;  // "science", "history", etc.

    // FILTER DB QUIZZES BY CAT
    useEffect(() => {
        async function loadQuizzes() {
            if (!quizType) return;

            const res = await fetch("http://localhost:5000/api/quizzes");
            const allQuizzes = await res.json();

            console.log(allQuizzes);

            const filtered = allQuizzes.filter(q => q.type === quizType);

            setDbQuizzes(filtered);
        }

        loadQuizzes();
    }, [quizType]);

    // CHECK FOR CATEGORY
    if (!quizCategory) {
        return (
            <div className="Browse-App">
                <div className="Browse-main">
                    <h1 className="Browse-header">Quiz Category Not Found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="Browse-App">
            <div className="Browse-main">
                <h1 className="Browse-header">{quizCategory.title}</h1>

                <ul className="quiz-options">
                    {dbQuizzes.length === 0 ? (
                        <h2>No {quizCategory.type} quizzes created yet.</h2>
                    ) : (
                        dbQuizzes.map((quiz) => (
                            <li key={quiz.id} className="quiz-button">
                                <Link to={`/quiz/${quiz.id}`}>
                                    {quiz.data.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="Browse-footer"></div>
        </div>
    );
};

export default QuizTypeList;
