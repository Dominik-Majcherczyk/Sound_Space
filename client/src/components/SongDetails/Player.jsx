import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ thisSong }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVolume, setActiveVolume] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0,
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const percentage = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: percentage,
      volume: e.target.volume,
    });
  };

  const playAudio = (isPlaying, audioRef) => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((audio) => {
            audioRef.current.play();
          })
          .catch((error) => console.log(error));
      }
    }
  };

  const songEndHandler = async () => {
    playAudio(isPlaying, audioRef);
    return;
  };
  //UseEffect Update List

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  //Event Handlers
  function getTime(time) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const changeVolume = (e) => {
    let value = e.target.value;
    audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  return (
    <div className=" rounded-lg bg-white py-8 mt-4 shadow-lg">
      <div className="song-container  mt-8   flex justify-center items-center p-4 flex-col">
        <div className="player-img-container mb-4  ">
          <img
            className={
              isPlaying
                ? "rotateSong rounded-full player-img"
                : "rounded-full player-img"
            }
            src={thisSong.selectedFile}
            alt=""
          />
        </div>

        <h2 className="font-bold">{thisSong.title}</h2>
        <h3 className="font-bold">{thisSong.author}</h3>
      </div>
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <div
            style={{
              background: `linear-gradient(to right, {#b308b3}, {#2b8fd1}})`,
            }}
            className="track"
          >
            <input
              value={songInfo.currentTime}
              type="range"
              max={songInfo.duration || 0}
              min={0}
              onChange={dragHandler}
            />
            <div style={trackAnim} className="animate-track"></div>
          </div>
          <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
        </div>
        <div className="play-control flex flex-col items-center justify-between gap-8 px-16">
          <FontAwesomeIcon
            onClick={playSongHandler}
            className="play"
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
          <div className="flex">
            <FontAwesomeIcon
              onClick={() => setActiveVolume(!activeVolume)}
              icon={faVolumeDown}
            />
            {activeVolume && (
              <input
                onChange={changeVolume}
                value={songInfo.volume}
                className="volume-range rounded-full bg-gray-300 ml-4"
                max="1"
                min="0"
                step="0.01"
                type="range"
              />
            )}
          </div>
        </div>
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={thisSong.songURL}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
