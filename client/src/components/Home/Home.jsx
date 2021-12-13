import React, { useEffect, useState } from "react";
import { getSongs, getSongsBySearch } from "../../actions/songs";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import Songs from "../Songs/Songs";
import AddSongForm from "../Form/AddSongForm";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page");

  const searchSong = () => {
    if (search.trim() || tags) {
      dispatch(getSongsBySearch({ search, tags: tags.join(",") }));
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getSongs());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchSong();
    }
  };
  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <>
      <Songs className="col-span-2" setCurrentId={setCurrentId} />

      <div className="grid grid-cols-2">
        <AddSongForm
          className="flex-col"
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        <div className="flex flex-col gap-8 mt-8 bg-white rounded-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
            onKeyDown={handleKeyPress}
          />
          <ChipInput
            value={tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
            label="Search Tags"
            variant="outlined"
          />
          <button onClick={searchSong}>Search</button>
        </div>
      </div>
    </>
  );
}
