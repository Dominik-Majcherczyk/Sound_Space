import Song from "./../models/songSchema.js";
import Songs from "./../models/songSchema.js";

export const getSongs = async (req, res) => {
   try {
      const songs = await Song.find();

      console.log;
      res.status(200).json(songs);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};

export const addSong = async (req, res) => {
   const song = req.body;

   const newSong = new Song(song);

   try {
      await newSong.save();
      res.status(201).json(newSong);
   } catch (error) {
      res.status(409).json({ message: error.message });
   }
};
