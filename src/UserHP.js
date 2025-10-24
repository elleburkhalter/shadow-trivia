import './UserHP.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome User to 
          <p className="shadow-main">SHADOW TRIVIA </p>
        </p>
      </header>

      <div className="App-main">
        <ul className ="creator-options">
          {/* ADD LINKS TO OPTIONS */}
          <li className ="create-quiz-button"> <a href="/" >Browse Quizzes </a> </li>
          <li className ="create-classroom-button"> <a href="/" >Join Classroom</a></li>
        </ul>
      </div>

      <div className="App-footer">
        {/* FOOTER OR MORE INFORMATION PLACEHOLDER */}
      </div>
    </div>
  );
}

export default App;
