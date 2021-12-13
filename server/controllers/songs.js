import mongoose from "mongoose";
import Song from "./../models/songSchema.js";
import { S3Client } from "@aws-sdk/client-s3";



export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find()
    res.status(200).json(songs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSongsBySearch = async (req, res) => {
  const {searchQuery, tags} = req.query
  try {
    const title = new RegExp(searchQuery, 'i');

    const songs = await Song.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

    res.json({ data: songs });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addSong = async (req, res) => {
  const song = req.body;
  const newSong = new Song({...song, creator: req.userId, createdAt: new Date().toISOString()});

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


export const likeSong = async (req, res) => {
  const { id} = req.params;

 if(!req.userId) return res.json({message: "Unauthenticated"})
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id');
  
 const song = await Song.findById(id)

  const index = song.likes.findIndex((id) => id === String(req.userId))

  if(index === -1) {
    song.likes.push(req.userId)
  } else {
    song.likes = song.likes.filter((id)=> id !== String(req.userId))
  }

 const updatedSong = await Song.findByIdAndUpdate(id, song, {new: true})

 res.status(200).json(updatedSong)
};