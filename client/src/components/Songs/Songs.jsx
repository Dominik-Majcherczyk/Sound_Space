import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song";
import Loading from "../Loading";

export default function Songs({setCurrentId}) {
  const {songs, isLoading} = useSelector((state) => state.songs);

  if (!songs.length && !isLoading) return "no songs"

  return isLoading ? (
    <Loading/>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
      {console.log(songs)}
      {songs.map((song) => (
        <div className="" key={song._id}>
          <Song uniqueKey={song._id} song={song} setCurrentId={setCurrentId}/>
        </div>
      ))}
    </div>
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
  //   {songs.map((song) => (
  //     song.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
  //       <div className="" key={song._id}>
  //       <Song uniqueKey={song._id} song={song} setCurrentId={setCurrentId}/>
  //     </div>
  //     ) : null
     
  //   ))}
  // </div>
  );
}
