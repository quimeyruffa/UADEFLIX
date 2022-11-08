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

  // const refresh = () => {
  //   let t = localStorage.getItem("token");
  //   setTimeout(function () {
  //     const res = fetch("https://ssog2.herokuapp.com/auth/refresh", {
  //       method: "GET",
  //       headers: {
  //         Authorization: "Bearer " + t,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = res.json();
  //     requireToken(data.token)
  //   }, 1000 * 60 * 60);
  // };

  // const requireToken = async (t) => {
  //   const res = await fetch("https://ssog2.herokuapp.com/auth/protected", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + t,
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = await res.json();
  //   localStorage.setItem("token", t);
  //   localStorage.setItem("user", JSON.stringify(data));
  //   window.location.href = "/moviePage";
  // };

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
