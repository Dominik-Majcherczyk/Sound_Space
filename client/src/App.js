import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography } from "@material-ui/core";
import Songs from "./components/Songs/Songs";
import AddSongForm from "./components/Form/AddSongForm";
import { getSongs } from "./actions/songs";
import { useDispatch } from "react-redux";
function App() {
   const [currentId, setCurrentId] = useState(null)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSongs());
   }, [currentId, dispatch]);
   return (
      <Container maxwidth="lg">
         <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center">
               Songs
            </Typography>
         </AppBar>
         <Songs setCurrentId={setCurrentId}/>
         <AddSongForm currentId={currentId} setCurrentId={setCurrentId}/>
      </Container>
   );
}

export default App;
