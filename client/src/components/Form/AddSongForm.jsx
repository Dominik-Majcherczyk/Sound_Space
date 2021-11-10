import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { addSong, updateSong } from "../../actions/songs";
export default function AddSongForm({ currentId, setCurrentId }) {
  const [songData, setSongData] = useState({
    author: "",
    title: "",
    tags: "",
    selectedImage: "",
  });
  const song = useSelector((state) =>
    currentId ? state.songs.find((song) => song._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (song) setSongData(song);
  }, [song]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateSong(currentId, songData));
    } else {
      dispatch(addSong(songData));
    }
    clear();
  };

  const clear = (e) => {
    
    setCurrentId(null);
    setSongData({
      author: "",
      title: "",
      tags: "",
      selectedImage: "",
    });
  };

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h2>{currentId ? "Editing" : "add song"}</h2>
        <input
          type="text"
          label="author"
          name="author"
          placeholder="author"
          value={songData.author}
          onChange={(e) => setSongData({ ...songData, author: e.target.value })}
        />
        <input
          type="text"
          label="title"
          name="title"
          placeholder="title"
          value={songData.title}
          onChange={(e) => setSongData({ ...songData, title: e.target.value })}
        />
        <input
          type="text"
          label="tags"
          name="tags"
          placeholder="tags"
          value={songData.tags}
          onChange={(e) => setSongData({ ...songData, tags: e.target.value.split(", ") })}
        />
        <div>
          <FileBase
            type="file"
            multiple="false"
            s
            onDone={({ base64 }) =>
              setSongData({ ...songData, selectedImage: base64 })
            }
          />
        </div>
        <button type="submit">submit</button>
        <button type="reset" onClick={(e) => clear(e)}>clear</button>
      </form>
    </div>
  );
}
