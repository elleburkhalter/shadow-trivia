import './GamePlay.css';
import QuizQuestions from './quiz-data.json';
import React, {useState, useEffect, use} from 'react';
import { Link, useParams } from 'react-router-dom';

function GamePlay() {
    //QUIZ GAMEPLAY COMPONENT
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const foundQuiz = QuizQuestions.quizzes.find(q => q.id === Number(quizId));
        setQuiz(foundQuiz || null);
    }, [quizId]); 

    if (!quiz) {
        return <div>Quiz not found.</div>;
    }

    const questions = quiz.questions;

    const handleAnswerOptionClick = (selectedIndex) => {
        const correctAnswerIndex = questions[currentQuestion].answerindex;
        if(selectedIndex === correctAnswerIndex){
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if(nextQuestion < quiz.questions.length){
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResults(true);
        }
    };




  return (
    <div className="Game-App">
    <div className="gameplay-container">
      <h1>{quiz.title}</h1>
        {showResults ? (
            <div className="results-section">
                <h2>Your Score: {score} / {quiz.questions.length}</h2>
                <Link to="/browse-quizzes">Back to Quizzes</Link>
            </div>
        ) : (
            <div className="quiz-section">
                <p>{quiz.questions[currentQuestion].question}</p>
                <ul>
                    <div className="answer-options">
                    {quiz.questions[currentQuestion].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswerOptionClick(index)}>
                            {option}
                        </button>
                    ))}
                    </div>
                </ul>
                <h2>{currentQuestion + 1} / {quiz.questions.length}</h2>
            </div>
        )}
        </div>
        <div className="Game-footer">
        {/* FOOTER OR MORE INFORMATION PLACEHOLDER */}
      </div>
    </div>
  );
}

export default GamePlay;