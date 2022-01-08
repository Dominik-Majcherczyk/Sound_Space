import React from "react";
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import AddSong from "./components/AddSong/AddSong";
import SongDetails from "./components/SongDetails/SongDetails";
function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <div  className="container mx-auto">
        <Navbar />
        <Routes>
            <Route exact path="/" element={ <Navigate to="/songs" /> } />
            <Route exact path="/songs"  element={<Home/>} />
            <Route exact path="/add"  element={<AddSong/>} />
            <Route exact path="/songs/search"  element={<Home/>} />
            <Route exact path="/songs/:id"  element={<SongDetails/>} />
            <Route exact path="/auth" element={ !user ? <Auth/> : <Navigate to="/songs" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
