import React, { useEffect, useState } from "react";
import { getSongs } from "../../actions/songs";
import { useDispatch } from "react-redux";

import Songs from "../Songs/Songs";
import AddSongForm from "../Form/AddSongForm";
export default function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
  }, [currentId, dispatch]);
  return (
    <>
      <Songs setCurrentId={setCurrentId} />
      <AddSongForm currentId={currentId} setCurrentId={setCurrentId} />
    </>
  );
}
