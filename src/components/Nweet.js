import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  console.log(nweetObj);
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
      if (nweetObj.attachmentUrl) {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div key={nweetObj.id} className="basicBox">
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your nweet"
                  value={newNweet}
                  onChange={onChange}
                  required
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <div className="flex">
          <div className="w-1/2">
            {nweetObj.attachmentUrl && (
              <img
                src={nweetObj.attachmentUrl}
                className="rounded-3xl object-cover"
              />
            )}
          </div>
          <div className="mx-5 w-1/2 flex-col justify-center">
            <div className="h-5/6 text-2xl text-center align-middle">
              {nweetObj.text}
            </div>
            {isOwner ? (
              <div className="w-full h-1/6 flex justify-between">
                <button className="w-full mx-1 text-xl" onClick={onDeleteClick}>
                  Delete
                </button>
                <button className="w-full mx-1 text-xl" onClick={toggleEditing}>
                  Edit
                </button>
              </div>
            ) : (
              <div>{nweetObj.createdId}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nweet;
