import mongoose from "mongoose";
import Song from "./../models/songSchema.js";

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

export const updateSong = async (req, res) => {
  const { id: _id } = req.params;
  const song = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No song with that id');
  
  const updatedSong = await Song.findByIdAndUpdate(_id, {...song, _id}, {new: true});

 res.json(updatedSong)
};


export const deleteSong = async (req, res) => {
  const { id} = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id');
  
  await Song.findByIdAndRemove(id);

 res.json({message: 'Song deleted successfully'})
};