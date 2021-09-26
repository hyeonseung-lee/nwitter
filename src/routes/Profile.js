import { updateProfile } from "@firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "@firebase/firestore";
import { authService, dbService, firebaseAuth } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { GetNweetsOnProfile } from "./Home";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  // Logout function
  const onLogOutClick = () => {
    firebaseAuth.signOut(authService);
    history.push("/");
  };

  // get my nweets from database
  const getMyNweets = async () => {
    const nweetsRef = await collection(dbService, "nweets");
    const myNweets = query(
      nweetsRef,
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
    const nweetsSnapshot = await getDocs(myNweets);
    nweetsSnapshot.forEach((doc) => {
      console.log(doc);
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  // onChange function on newName Input
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  // onSubmit fucntion on edit profile
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // update
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          refreshUser();
          alert("Profile Updated!");
        })
        .catch((error) => {
          alert(`error! ${error}`);
        });
    } else {
      alert("Please type diffrent name!");
    }
    // if there are same name in input, doesn't update.
  };

  return (
    <>
      <div className="basicBox flex-col">
        <a className="text-3xl mb-6 mx-2">Edit profile</a>
        <div className="flex justify-between mx-3">
          <form
            onSubmit={onSubmit}
            className="w-3/5 h-10 border-2 border-gray-200"
          >
            <input
              onChange={onChange}
              type="text"
              placeholder="Display name"
              value={newDisplayName}
              className="w-2/3 h-9 text-center"
            />
            <input type="submit" value="Update Profile" className="w-1/3 h-9" />
          </form>
        </div>
        <div className="w-full flex justify-end mt-10">
          <button onClick={onLogOutClick} className="w-1/5 h-8">
            Log Out
          </button>
        </div>
      </div>
      <GetNweetsOnProfile userObj={userObj} />
    </>
  );
};

export default Profile;
