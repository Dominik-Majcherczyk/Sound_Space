import express from "express";
import { getSongs, getSongsBySearch, addSong, updateSong, deleteSong, likeSong } from "./../controllers/songs.js";

import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/search", getSongsBySearch);
router.get("/", getSongs);
router.post("/", auth, addSong);
router.patch("/:id", auth, updateSong);
router.patch("/:id/likeSong",auth, likeSong);
router.delete("/:id",auth, deleteSong);


export default router;
