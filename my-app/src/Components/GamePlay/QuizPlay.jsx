import React, { useEffect, useState } from "react";
import "./GamePlay.css";
import { useParams, Link } from "react-router-dom";

function QuizPlay() {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Store randomized answers for each question
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    // Fetch quiz from DB
    useEffect(() => {
        const fetchQuiz = async () => {
            const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}`);
            const data = await response.json();
            setQuiz(data);
        };

        fetchQuiz();
    }, [quizId]);

    // Shuffle answers whenever quiz or currentQuestion changes
    useEffect(() => {
        if (!quiz) return;

        const qObj = quiz.data.quizid;
        const keys = Object.keys(qObj);
        const current = qObj[keys[currentQuestion]];

        const answers = [
            { text: current.ans1, correct: true },
            { text: current.ans2, correct: false },
            { text: current.ans3, correct: false },
            { text: current.ans4, correct: false }
        ];

        // Shuffle answers
        const shuffled = [...answers].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
    }, [quiz, currentQuestion]);

    if (!quiz) return <div className="gameplay-container">Loading quiz...</div>;

    const questionObj = quiz.data.quizid;
    const questionKeys = Object.keys(questionObj);
    const totalQuestions = questionKeys.length;
    const current = questionObj[questionKeys[currentQuestion]];

    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const next = currentQuestion + 1;

        if (next < totalQuestions) {
            setCurrentQuestion(next);
        } else {
            setShowResults(true);
        }
    };

    return (
        <div className="Game-App">
            <div className="gameplay-container">
                <h1>{quiz.data.name}</h1>

                {showResults ? (
                    <div className="results-section">
                        <h2>Your Score: {score} / {totalQuestions}</h2>
                        <Link to="/browse-quizzes">Back to Quizzes</Link>
                    </div>
                ) : (
                    <div className="quiz-section">
                        <p className="quiz-question">{current.question}</p>

                        <div className="answer-options">
                            {shuffledAnswers.map((ans, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerClick(ans.correct)}
                                >
                                    {ans.text}
                                </button>
                            ))}
                        </div>

                        <h2>{currentQuestion + 1} / {totalQuestions}</h2>
                    </div>
                )}
            </div>

            <div className="Game-footer"></div>
        </div>
    );
}

export default QuizPlay;
