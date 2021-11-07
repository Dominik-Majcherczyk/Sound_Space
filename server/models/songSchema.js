import mongoose from "mongoose";

const songSchema = mongoose.Schema({
   title: String,
   author: String,
   tags: [String],
   selectedImage: String,
   source: String,
   likeCount: {
      type: Number,
      default: 0,
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
