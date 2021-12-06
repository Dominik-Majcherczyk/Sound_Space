import React from "react";
import { useSelector } from "react-redux";
import Song from "./Song";
export default function Songs({setCurrentId}) {
  const songs = useSelector((state) => state.songs);
  return !songs.length ? (
    <div>loading</div>
  ) : (
    <div className="grid grid-cols-12 gap-8 mt-16">
      {songs.map((song) => (
        <div className="col-span-4" key={song._id}>
          <Song uniqueKey={song._id} song={song} setCurrentId={setCurrentId}/>
        </div>
      ))}
    </div>
  );
}
