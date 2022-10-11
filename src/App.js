import './App.css';
import { Firstpage, Login, MoviePage, Planes, Register } from './pages';
import { Routes, Route } from "react-router-dom";
import { Navbar } from './components/components';

function App() {
  if(localStorage.getItem('token')) return <MoviePage />


  return (
    <div>
    <Navbar>
    <a href="/">ABOUT</a>
    <a href="#">UADEFLIX ORIGIN</a>
    <a href="/register">REGISTER</a>
    <a href="/login" className="login">
      LOG IN
    </a>
  </Navbar>
    <Routes>
    <Route path="/" element={<Firstpage />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="/moviePage" element={<Firstpage />} />
    <Route path="planes" element={<Planes />} />
  </Routes>

    </div>
  );
}

export default App;
