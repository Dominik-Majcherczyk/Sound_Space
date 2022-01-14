import React, { useState, useEffect } from "react";
import { fetchUser } from "../../actions/auth";
import { getSongs } from "../../actions/songs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Song from "../Songs/Song";

export default function UserProfile() {
  const { userData } = useSelector((state) => state.auth);
  const { songs } = useSelector((state) => state.songs);
  console.log(userData);
  const navigate = useNavigate();
  const openSong = (_id) => {
    navigate(`/songs/${_id}`);
  };
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    dispatch(fetchUser(user.result._id));
    dispatch(getSongs());
  }, []);

  return (
    <>
      <div className=" rounded-lg bg-white py-8 mt-4 shadow-lg px-12 md:px-36 flex flex-col">
        <p>{userData?.name}</p>
        <p> {userData?.email}</p>
      </div>
      <div>
        {songs.map((song) =>
          song.author === userData.name ? (
            <div className="" key={song._id}>
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openSong(song._id)}
                key={song._id}
              >
                <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                  <div class="w-1/3 bg-cover bg-landscape">
                    <img
                      className="object-cover w-full h-full"
                      src={song.selectedFile}
                      alt=""
                    />
                  </div>
                  <div class="w-2/3 p-4">
                    <h1 class="text-gray-900 font-bold text-2xl">{song.title}</h1>
                    <p class="mt-2 text-gray-600 text-sm">
                      {song.description ? song.description : "no description"}
                    </p>
                    <div class="flex item-center mt-2">
                      <svg
                        class="w-5 h-5 fill-current text-gray-700"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                      </svg>
                      <p>{song.likes.length}</p>
                    </div>
                    <div class="flex item-center justify-between mt-3">
                      <h1 class="text-gray-700 font-bold text-xl">{song.name}</h1>
                      <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                        check
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </>
  );
}
