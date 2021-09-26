import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// form to make new nweet
const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState(""); // just text
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();
  const clearFileInput = () => {
    // for clear file input
    fileInput.current.value = "";
  };

  // onclick submit
  const onSubmit = async (event) => {
    event.preventDefault();

    // def nweet object to upload
    let nweetObject;

    if (attachment) {
      // with image
      // create a child reference
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);

      // upload image to firebase storage
      await uploadString(attachmentRef, attachment, "data_url");
      const attachmentUrl = await getDownloadURL(attachmentRef);
      // create nweet object
      nweetObject = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      };
    }

    // upload nweet
    try {
      if (nweet.length > 0 && attachment) {
        const docRef = await addDoc(
          collection(dbService, "nweets"),
          nweetObject
        );
        console.log("Document written with ID: ", docRef.id);
        alert("Thank you for uploading");
        setNweet("");
        setAttachment("");
        clearFileInput();
      } else if (nweet.length === 0) {
        // there is not any text
        console.log("please type!");
        alert("please type!");
      } else {
        // no image
        console.log("please choose image!");
        alert("please choose image!");
      }
    } catch (e) {
      // catch error (no case yet.)
      console.log("Error adding document: ", e);
      alert("Error adding document: ", e);
    }
  };

  // set nweet text by listening event
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // set attachment by uploading image
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // cleaning attachment
  const onClearAttachment = () => {
    setAttachment(null);
    clearFileInput();
  };
  return (
    <div className="basicBox h-1/4">
      <form onSubmit={onSubmit} className="flex h-full">
        <div className="flex-col w-full">
          <input
            type="text"
            value={nweet}
            onChange={onChange}
            placeholder="Why are they lovely?"
            maxLength={500}
            className="w-full h-2/4 mb-4 rounded-t-3xl rounded-l-3xl text-center bg-gray-100"
          />
          <div className="w-full h-1/6 flex justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={fileInput}
              className=""
            />
            {attachment && (
              <button onClick={onClearAttachment} className="w-1/6">
                Clear
              </button>
            )}
          </div>
          <input
            className="text-xl w-full h-1/6 mt-3 "
            type="submit"
            value="🐱 Meow 🐱"
          />
        </div>
        <img
          src={attachment}
          className="flex w-2/6  ml-5 rounded-3xl object-cover"
        />
      </form>
    </div>
  );
};
export default NweetFactory;
