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
    } else {
      // no image
      // create nweet object
      nweetObject = {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      };
    }

    // upload nweet
    try {
      if (nweet.length > 0) {
        const docRef = await addDoc(
          collection(dbService, "nweets"),
          nweetObject
        );
        console.log("Document written with ID: ", docRef.id);
        alert("Thank you for uploading");
      } else {
        // there is not any text
        console.log("please type!");
        alert("please type!");
      }
    } catch (e) {
      // catch error (no case yet.)
      console.log("Error adding document: ", e);
      alert("Error adding document: ", e);
    }
    setNweet("");
    setAttachment("");
    clearFileInput();
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={nweet}
        onChange={onChange}
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInput}
      />
      <input type="submit" value="nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="80px" height="80px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;