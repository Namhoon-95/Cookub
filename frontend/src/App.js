import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './component/Navigation';
import About from './veiw/About';
import Board from './veiw/Board';
import Login from './veiw/Login';
import Main from './veiw/Main';
import MyPage from './veiw/MyPage';
import SignUp from './veiw/SignUp';



function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" exact={true} element={<Main />} />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/signup" exact={true} element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/board" element={<Board />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
