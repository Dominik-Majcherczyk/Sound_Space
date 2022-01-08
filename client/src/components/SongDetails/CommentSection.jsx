import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { commentSong } from "../../actions/songs";

export default function CommentSection({ thisSong }) {
  const [comments, setComments] = useState(thisSong?.comments);
  const [comment, setComment] = useState("");
 const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch();
  const handleClick = async () => {
    console.log('clicked')
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentSong(finalComment, thisSong._id));
    setComments(newComments)
    setComment('')
  };
  return (
    <div>
      <h1>comments</h1>
      <div>{thisSong?.comments && comments.map((comment, i) => (<div key={i}>{comment}</div>))}</div>
     {user?.result?.name && (
      <div>
        <h1>write a comment</h1>
        <textarea
          class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          id="comment"
          placeholder="Enter your comment"
          name="comment"
          rows="5"
          cols="40"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          
        ></textarea>

        <button
          class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
     
          onClick={handleClick}
        >
          Send
        </button>
      </div>
     )}
        
  
      
    </div>
  );
}
