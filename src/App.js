import "./App.css";
import { Firstpage, Login, MoviePage, Planes, Register, Screen } from "./pages";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/components";
import React from "react";
function App() {
  // React.useEffect(() => {
  //   if (localStorage.getItem("token")){
  //     refresh();
  //   }
  // }, []);

  if (localStorage.getItem("token")) {
    return (
      <Routes>
        <Route path="/" element={<MoviePage />} />
        <Route path="/screen" element={<Screen />} />
        <Route path="/moviePage" element={<MoviePage />} />
      </Routes>
    );
  }

  

  return (
    <div>
      <Navbar>
        <a href="/">ABOUT</a>
        <a href="#">UADEFLIX ORIGIN</a>
        <a href="/register">REGISTER</a>
        <a href="/login/false" className="login">
          LOG IN
        </a>
      </Navbar>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="login/:token" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/moviePage" element={<Firstpage />} />
        <Route path="planes" element={<Planes />} />
      </Routes>
    </div>
  );
}

export default App;
