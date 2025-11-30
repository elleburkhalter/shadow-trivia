import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import CreatorHomePage from './Components/HomePage/CreatorHP';
import UserHomePage from './Components/HomePage/UserHP';
import Navbar from './Components/HomePage/Navbar';
import BrowseQuizzes from './Components/HomePage/BrowseQuizzes/Quizzes';
import CreateQuizzes from './Components/HomePage/BrowseQuizzes/Create_quizzes';
import GamePlay from './Components/GamePlay/GamePlay';
import CreateQuiz from "./Components/HomePage/QuizCreation/QuizCreationPage";
import QuizTypeList from "./Components/HomePage/BrowseQuizzes/QuizTypeList";
import QuizPlay from "./Components/GamePlay/QuizPlay";
function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route index element={<LoginPage />} />
      
      <Route element={<WithNavbar />}>
        <Route path="/creator" element={<CreatorHomePage />} />
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/browse-quizzes" element={<BrowseQuizzes />} />
        <Route path="/quiz-type/:id" element={<QuizTypeList />} />
        <Route path="/quiz/:quizId" element={<QuizPlay />} />
        <Route path="/create-quiz" element={<CreateQuizzes />} />
        </Route>
        <Route path="/gameplay/:quizId" element={<GamePlay />} />
        <Route path="/create-quiz/:id" element={<CreateQuiz />} />
    </Routes>
  );
}

function WithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;