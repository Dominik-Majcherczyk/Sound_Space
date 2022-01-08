import express from "express";
import { getSongs, getSongsBySearch,getSong, addSong, updateSong,commentSong, deleteSong, likeSong } from "./../controllers/songs.js";

import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/search", getSongsBySearch);
router.get("/", getSongs);
router.get("/:id", getSong);
router.post("/", auth, addSong);
router.patch("/:id", auth, updateSong);
router.patch("/:id/likeSong",auth, likeSong);
router.post("/:id/commentSong",auth, commentSong);
router.delete("/:id",auth, deleteSong);


export default router;
