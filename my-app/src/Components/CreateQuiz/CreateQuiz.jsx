import React, { useState } from 'react';
import './CreateQuiz.css';

function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswers, setCurrentAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleSaveQuestion = () => {
    if (!currentQuestion || currentAnswers.some(a => !a) || !quizTitle) {
      alert('Question could not be saved. Make sure you have a quiz title and four answer choices.');
      return;
    }

    const newQuestion = {
      id: questions.length,
      question: currentQuestion,
      options: currentAnswers,
      answerindex: correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion('');
    setCurrentAnswers(['', '', '', '']);
    setCorrectAnswer(0);
  };

  const handleSaveQuiz = () => {
    if (questions.length === 0) {
      alert('Quiz could not be saved. Make sure you have at least one question.');
      return;
    }
    //SAVE QUIZ TO BACKEND HERE
    alert(`Quiz "${quizTitle}" created with ${questions.length} questions!`);
  };

  return (
    <div className="Create-Quiz-Page">
      <div className="create-quiz-container">
        <h1>Create Quiz</h1>

        {/* User is NOT currently adding a question */}
        {!isAddingQuestion ? (
          <div className="quiz-setup">
            <div className="quiz-title-section">
              <input
                id="title"
                type="text"
                placeholder="Enter Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="title-input"
              />
            </div>

            <div className="questions-display">
              <h2>Questions Added: {questions.length}</h2>
              {questions.length > 0 && (
                <div className="questions-list">
                  {questions.map((q, idx) => (
                    <div key={idx} className="question-item">
                      <p>{idx + 1}. {q.question}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="quiz-actions">
              <button onClick={() => setIsAddingQuestion(true)} className="add-question-btn">
                Add Question
              </button>
              {questions.length > 0 && (
                <button onClick={handleSaveQuiz} className="finish-quiz-btn">
                  Finish Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
            /* User is currently adding a question */
          <div className="question-section">
            <div className="question-input-group">
              <input
                id="question"
                type="text"
                placeholder="Enter New Question"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                className="question-input"
              />
            </div>

            <div className="answers-section">
              <p className="answers-label">Answer Options:</p>
              <div className="answer-options-create">
                {currentAnswers.map((answer, idx) => (
                  <div key={idx} className="answer-input-wrapper">
                    <input
                      type="text"
                      placeholder={`Option ${idx + 1}`}
                      value={answer}
                      onChange={(e) => {
                        const newAnswers = [...currentAnswers];
                        newAnswers[idx] = e.target.value;
                        setCurrentAnswers(newAnswers);
                      }}
                      className="answer-input"
                    />
                    <div className="correct-group">
                      <input
                        type="radio"
                        name="correct"
                        checked={correctAnswer === idx}
                        onChange={() => setCorrectAnswer(idx)}
                        className="correct-answer-radio"
                        aria-label={`Mark option ${idx + 1} correct`}
                      />
                      <label>Correct</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="question-actions">
              <button onClick={handleSaveQuestion} className="save-question-btn">
                Save Question
              </button>
              <button onClick={() => setIsAddingQuestion(false)} className="back-btn">
                Back
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="Game-footer"></div>
    </div>
  );
}

export default CreateQuiz;
