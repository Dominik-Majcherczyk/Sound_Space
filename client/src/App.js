import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
function App() {
  return (
    <BrowserRouter>
      <div  className="container mx-auto">
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/auth" element={<Auth/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
