import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { addSong, updateSong } from "../../actions/songs";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { useNavigate} from "react-router-dom";
export default function AddSongForm({ currentId, setCurrentId }) {
  const navigate = useNavigate();
  const [songData, setSongData] = useState({
    title: "",
    tags: "",
    selectedFile: "",
    songURL: "",
    description: "",
  });
  const bucketUrl =
    "https://sound-space10122021.s3.eu-central-1.amazonaws.com/";

  const [soundFile, setSoundFile] = useState();

  const song = useSelector((state) =>
    currentId ? state.songs.songs.find((song) => song._id === currentId) : null
  );
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (song) setSongData(song);
  }, [song]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(songData);
    if (currentId) {
      dispatch(
        updateSong(currentId, { ...songData, author: user?.result?.name })
      );
    } else {
      const target = {
        Bucket: "sound-space10122021",
        Key: soundFile.name,
        Body: soundFile,
      };

      const creds = {
        accessKeyId: "AKIAYMK6CF6HX2QEOUBY",
        secretAccessKey: "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",
      };
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({ region: "eu-central-1", credentials: creds }),
          leavePartsOnError: false,
          params: target,
        });

        parallelUploads3.on("httpUploadProgress", (progress) => {
          console.log(progress);
        });

        parallelUploads3.done();
      } catch (error) {
        console.log(error);
      }

      dispatch(
        addSong({
          ...songData,
          author: user?.result?.name,
          songURL: `${bucketUrl}${soundFile.name}`,
        }, navigate)
      );
    }
    clear();
  };

  const handleFile = (e) => {
    setSoundFile(e.target.files[0]);
  };

  const clear = (e) => {
    setCurrentId(null);
    setSongData({
      title: "",
      tags: "",
      selectedImage: "",
      songURL: "",
    });
    setSoundFile(null);
  };

  if (!user?.result?.name) {
    return (
      <div>
        <h1>please Sign in to create songs and like others</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto mt-8 flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          {currentId ? "Edit your song" : "Add new fantastic song!"}
        </div>

        <div className="p-6">
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="title"
                  placeholder="Title"
                  value={songData.title}
                  onChange={(e) =>
                    setSongData({ ...songData, title: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  className=" rounded-lg border-transparent appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="tags"
                  placeholder="Tags (coma separated) - tag1,tag2,tag3..."
                  value={songData.tags}
                  onChange={(e) =>
                    setSongData({
                      ...songData,
                      tags: e.target.value.split(","),
                    })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mb-2">
              <div className=" relative ">
                <label class="text-gray-700" for="name">
                  <textarea
                    class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    
                    placeholder="Description"
                    name="description"
                    rows="5"
                    cols="40"
                    value={songData.description}
                    onChange={(e) =>
                      setSongData({
                        ...songData,
                        description: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col mb-2">
              <div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setSongData({ ...songData, selectedFile: base64 })
                  }
                />
              </div>
            </div>

            {/* upload mp3 */}
            <div className="flex flex-col mb-2">
              <div>
                <input type="file" onChange={handleFile} />
              </div>
            </div>

            {/* <label className="text-gray-700" htmlFor="playlists">
              Choose a existing playlist:
              <select
                id="playlists"
                className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                name="playlists"
              >
                <option value="none">none</option>
                <option value="1">playlist #1</option>
                <option value="2">playlist #2</option>
                <option value="3">playlist #3</option>
              </select>
            </label> */}

            <div className="flex w-full my-4 gap-8">
              <button
                type="submit"
                className="py-2 px-4  bg-green-500 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                {currentId ? "Edit" : "Add!"}
              </button>
              <button
                type="reset"
                onClick={(e) => clear(e)}
                className="py-2 px-4  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg "
              >
                Clear / Cancel
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-6">
            <div>
              {/* <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="premium"
                  className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-yellow-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 dark:text-white font-normal">
                  Only for subscribing members (⚜️)
                </span>
              </label>
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 dark:text-white font-normal">
                  Purple
                </span>
              </label>

              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  name="checked-demo"
                  className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-indigo-500 checked:border-transparent focus:outline-none"
                />
                <span className="text-gray-700 dark:text-white font-normal">
                  Indigo
                </span>
              </label> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
