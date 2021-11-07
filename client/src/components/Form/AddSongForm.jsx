import React, { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { addSong } from "../../actions/songs";
export default function AddSongForm() {
   const [songData, setSongData] = useState({
      author: "",
      title: "",
      tags: "",
      selectedImage: "",
   });

   const dispatch = useDispatch();

   const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(addSong(songData));
   };

   const clear = () => {};

   return (
      <div>
         <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <h2>add song</h2>
            <input type="text" label="author" name="author" placeholder="author" value={songData.author} onChange={(e) => setSongData({ ...songData, author: e.target.value })} />
            <input type="text" label="title" name="title" placeholder="title" value={songData.title} onChange={(e) => setSongData({ ...songData, title: e.target.value })} />
            <input type="text" label="tags" name="tags" placeholder="tags" value={songData.tags} onChange={(e) => setSongData({ ...songData, tags: e.target.value })} />
            <div>
               <FileBase type="file" multiple="false" onDone={({ base64 }) => setSongData({ ...songData, selectedImage: base64 })} />
            </div>
            <button type="submit">submit</button>
            <button type="submit" onClick={clear}>
               clear
            </button>
         </form>
      </div>
   );
}
