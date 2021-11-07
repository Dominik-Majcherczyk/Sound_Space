import React from 'react'
import moment from "moment"
import { useDispatch } from 'react-redux'
import {deleteSong} from '../../actions/songs'
export default function Song({song, setCurrentId}) {

    const dispatch = useDispatch();
    return (
        <div>
            <h1>{song.title}</h1>
            <h2>{moment(song.createdAt).fromNow()}</h2>
            <p>{song.tags.map((tag)=> `#${tag} `)}</p>
            <div className="flex gap-8">
                <button onClick={()=>{}}>Like</button>
                <button onClick={()=>dispatch(deleteSong(song._id))}>Delete</button>
            </div>
            <div className="flex gap-8">
            <button>DETAILS </button>
            <button onClick={()=>setCurrentId(song._id)}>Edit</button>
            </div>
            
            
        </div>
    )
}
