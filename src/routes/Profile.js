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
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
