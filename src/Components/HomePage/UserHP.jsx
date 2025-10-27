import './CreatorHP.css';

const PlayerHomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome User to </p>
          <p className="shadow-main">SHADOW TRIVIA </p>
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

export default PlayerHomePage;
