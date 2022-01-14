import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import { useParams, useNavigate } from "react-router-dom";
import { getSong, getSongsBySearch } from "../../actions/songs";
import Player from "./Player";
import CommentSection from "./CommentSection";

export default function SongDetails() {
  const { song, songs, isLoading } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const openSong = (_id) => {
    navigate(`/songs/${_id}`);
  };

  useEffect(() => {
    dispatch(getSong(id));
  }, [id]);

  useEffect(() => {
    if (song) {
      dispatch(
        getSongsBySearch({ search: "none", tags: song?.tags.join(",") })
      );
    }
  }, [song]);
  if (!song) return null;
  const recommendedSongs = songs.filter(({ _id }) => _id !== song._id);

  console.log(song);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Player thisSong={song} />

      <div className=" rounded-lg bg-white py-8 mt-4 shadow-lg px-12 md:px-36">
        <div className="mb-2 font-bold">Description:</div>
        <div>{song.description}</div>
      </div>
      <div className=" rounded-lg bg-white py-8 mt-4 shadow-lg px-12 md:px-36">
        <CommentSection thisSong={song} />
      </div>

      {recommendedSongs.length ? (
        <div className="bg-slate-100">
          <div className="flex items-center justify-center font-bold mt-36">
            Other Songs:
          </div>
          <div className="flex flex-wrap gap-4">
            {recommendedSongs.map(
              ({ title, name, description, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openSong(_id)}
                  key={_id}
                >
                  <div class="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                    <div class="w-1/3 bg-cover bg-landscape">
                      <img
                        className="object-cover w-full h-full"
                        src={selectedFile}
                        alt=""
                      />
                    </div>
                    <div class="w-2/3 p-4">
                      <h1 class="text-gray-900 font-bold text-2xl">{title}</h1>
                      <p class="mt-2 text-gray-600 text-sm">
                        {description ? description : "no description"}
                      </p>
                      <div class="flex item-center mt-2">
                        <svg
                          class="w-5 h-5 fill-current text-gray-700"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"></path>
                        </svg>
                        <p>{likes.length}</p>
                      </div>
                      <div class="flex item-center justify-between mt-3">
                        <h1 class="text-gray-700 font-bold text-xl">{name}</h1>
                        <button class="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                          check
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className=" rounded-lg bg-white py-8 mt-4 shadow-lg px-12 md:px-36">
          There is no similar songs
        </div>
      )}
    </>
  );
}
