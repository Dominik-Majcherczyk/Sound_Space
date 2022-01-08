import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteSong, likeSong } from "../../actions/songs";
import { useNavigate} from "react-router-dom";
export default function Song({ song, setCurrentId, uniqueKey }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const navigate = useNavigate();

  const openSong = () =>{
    navigate(`/songs/${song._id}`)
  }
  return (
    <div key={uniqueKey}>


      <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
        <a href="#" className="w-full block h-full">
          <img
            alt="blog photo"
            src={song.selectedFile}
            className="max-h-40 w-full object-cover"
          />
          <div className="bg-white dark:bg-gray-800 w-full p-4">
            <p className="text-indigo-500 text-md font-medium">
              {moment(song.createdAt).fromNow()}
            </p>
            <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
              {song.title}
              
            </p>
            
            <p className="text-gray-400 dark:text-gray-300 font-light text-md">
              The fantastic song description or short story...
            </p>
            <div className="flex flex-wrap justify-starts items-center mt-4">
              {song.tags.map((tag) => (
                <div key={tag} className="text-xs mr-2 py-1.5 px-4 text-gray-600 bg-blue-100 rounded-2xl">
                  {`#${tag} `}
                </div>
              ))}
            </div>

            <div className="flex gap-8 justify-starts items-center mt-4">
              <div className="flex items-center">
                <button
                  type="button"
                  disabled={!user?.result}
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(likeSong(song._id))}}
                  className="w-full flex items-center border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2"
                >
                  {song.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? 
                (    <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="w-4 h-4 mr-2"
                  fill="gold"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
                </svg> )  : (<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
                </svg>)
                }
             
                  Star
                </button>
                <button
                  type="button"
                  className="w-full border text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
                >
                  {song.likes.length}
                </button>
              </div>
                {(user?.result?.googleId === song?.author || user?.result?.name=== song?.author) && (
                      <button
                      type="button"
                      onClick={() => dispatch(deleteSong(song._id))}
                      className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg "
                    >
                      Delete
                    </button>
                )}
      
            </div>

            <div className="flex gap-8 justify-starts items-center mt-4">

            {(user?.result?.googleId === song?.author || user?.result?.name=== song?.author) && (
              <button
              type="button"
              onClick={ (e) =>{
                e.stopPropagation();
                setCurrentId(song._id);
              }
                
              }
              className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Edit
            </button>
                )}
              

              <button
                type="button"
                className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={openSong}
              >
                details
              </button>
              
            </div>
            <p className="text-sm ">Created by: <span className="font-bold">{song.author}</span></p>
          </div>
        </a>
      </div>
    </div>
  );
}
