import React from "react";
import { useSelector } from "react-redux";
export default function Songs() {
   const songs = useSelector((state) => state.songs);
   console.log(songs);
   return <div>songs</div>;
}
