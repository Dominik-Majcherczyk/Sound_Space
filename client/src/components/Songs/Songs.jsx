import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song";
import Loading from "../Loading";

export default function Songs({ setCurrentId, favFilter }) {
  const { songs, isLoading } = useSelector((state) => state.songs);
  const user = JSON.parse(localStorage.getItem('profile'))
  if (!songs.length && !isLoading) return "no songs";
console.log(favFilter)
  return isLoading ? (
    <Loading />
  ) : (favFilter ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
    {songs.map((song) =>
      song.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <div className="" key={song._id}>
          <Song
            uniqueKey={song._id}
            song={song}
            setCurrentId={setCurrentId}
          />
        </div>
      ) : null
    )}
  </div>
  ) : (

    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-16">
    {console.log(songs)}
    {songs.map((song) => (
      <div className="" key={song._id}>
        <Song uniqueKey={song._id} song={song} setCurrentId={setCurrentId} />
      </div>
    ))}
  </div>

   
  ));
}
