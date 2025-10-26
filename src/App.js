import { Routes, Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import CreatorHomePage from './Components/HomePage/CreatorHP';
import UserHomePage from './Components/HomePage/UserHP';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/creator" element={<CreatorHomePage />} />
      <Route path="/user" element={<UserHomePage />} />
    </Routes>
  );
}

export default App;