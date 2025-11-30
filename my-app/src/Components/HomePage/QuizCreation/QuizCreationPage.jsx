import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import quizData from "../../GamePlay/quiz.json";
import "./QuizCreationPage.css";

const CreateQuiz = () => {
    const { id } = useParams();
    const quiz = quizData.quizzes.find((q) => q.id === Number(id));

    const [quizName, setQuizName] = useState("");
    const [selectedSize, setSelectedSize] = useState(null);
    const [questions, setQuestions] = useState([]);

    const handleSizeSelect = (e) => {
        const size = Number(e.target.value);
        setSelectedSize(size);

        // Create empty question template
        const empty = Array.from({ length: size }, () => ({
            question: "",
            ans1: "",
            ans2: "",
            ans3: "",
            ans4: "",
        }));

        setQuestions(empty);
    };

    const updateQuestion = (index, field, value) => {
        const copy = [...questions];
        copy[index][field] = value;
        setQuestions(copy);
    };

    const handleSubmit = async () => {
        const formattedData = {
            name: quizName,
            quizid: {}
        };

        questions.forEach((q, i) => {
            formattedData.quizid[i + 1] = q;
        });

        const payload = {
            classroomid: 1,
            type: quiz.type,
            data: formattedData
        };

        const response = await fetch("http://localhost:5000/api/quizzes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const resData = await response.json();
        console.log("Quiz created:", resData);

        if (!resData.error) {
            alert("Quiz Saved Successfully!");
        } else {
            alert("Error saving quiz.");
        }

    };

    return (
        <div className="create-quiz-container">
            <h1>Create: {quiz.title}</h1>

            <label>Quiz Name</label>
            <input
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
            />

            <label>Choose Quiz Size</label>
            <select onChange={handleSizeSelect}>
                <option>-- Select Size --</option>
                {quiz.sizeTypes.map((size) => (
                    <option key={size} value={size}>
                        {size} Questions
                    </option>
                ))}
            </select>

            {selectedSize && (
                <div className="questions-section">
                    <h2>Questions ({selectedSize})</h2>
                    <p>Answer 1 is where you will set the correct answer.</p>

                    {questions.map((q, index) => (
                        <div key={index} className="question-block">
                            <input
                                type="text"
                                placeholder={`Question ${index + 1}`}
                                value={q.question}
                                onChange={(e) => updateQuestion(index, "question", e.target.value)}
                            />

                            {["ans1", "ans2", "ans3", "ans4"].map((field, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    placeholder={`Answer ${i + 1}`}
                                    value={q[field]}
                                    onChange={(e) => updateQuestion(index, field, e.target.value)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button className="save-btn" onClick={handleSubmit}>
                    Save Quiz
                </button>
                <div>
                    <br/>
                    <br/>
                    <Link to="/create-quiz" className="save-btn">
                        Continue
                    </Link>
                </div>
            </div>
            <div className="page-footer"></div>

        </div>
    );
};

export default CreateQuiz;
