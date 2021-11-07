import React, { useEffect } from "react";
import { Container, AppBar, Typography } from "@material-ui/core";
import Songs from "./components/Songs/Songs";
import AddSongForm from "./components/Form/AddSongForm";
import { getSongs } from "./actions/songs";
import { useDispatch } from "react-redux";
function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getSongs());
   }, [dispatch]);
   return (
      <Container maxwidth="lg">
         <AppBar position="static" color="inherit">
            <Typography variant="h2" align="center">
               Songs
            </Typography>
         </AppBar>
         <Songs />
         <AddSongForm />
      </Container>
   );
}

export default App;
