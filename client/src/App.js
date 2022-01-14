import React, {useState} from "react";
import { BrowserRouter, Routes , Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import AddSong from "./components/AddSong/AddSong";
import SongDetails from "./components/SongDetails/SongDetails";
import UserProfile from "./components/Profile/UserProfile";
function App() {
  const [favFilter, setFavFilter] = useState(false)
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <div  className="container mx-auto">
        <Navbar setFavFilter={setFavFilter} favFilter={favFilter} />
        <Routes>
            <Route exact path="/" element={ <Navigate to="/songs" /> } />
            <Route exact path="/songs"  element={<Home favFilter={favFilter}/>} />
            <Route exact path="/add"  element={<AddSong/>} />
            <Route exact path="/profile/:id"  element={<UserProfile/>} />
            <Route exact path="/songs/search"  element={<Home/>} />
            <Route exact path="/songs/:id"  element={<SongDetails/>} />
            <Route exact path="/auth" element={ !user ? <Auth/> : <Navigate to="/songs" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
