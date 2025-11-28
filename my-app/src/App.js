import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import CreatorHomePage from './Components/HomePage/CreatorHP';
import UserHomePage from './Components/HomePage/UserHP';
import Navbar from './Components/HomePage/Navbar';
import BrowseQuizzes from './Components/HomePage/BrowseQuizzes/Quizzes';
import GamePlay from './Components/GamePlay/GamePlay';
import CreateQuiz from './Components/CreateQuiz/CreateQuiz';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<LoginPage />} /> */}
      <Route index element={<LoginPage />} />
      
      <Route element={<WithNavbar />}>
        <Route path="/creator" element={<CreatorHomePage />} />
        <Route path="/user" element={<UserHomePage />} />
        <Route path="/browse-quizzes" element={<BrowseQuizzes />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        </Route>
        <Route path="/gameplay/:quizId" element={<GamePlay />} />
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