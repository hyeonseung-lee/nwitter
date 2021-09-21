import { authService, firebaseAuth } from "fBase";
import React from "react";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    firebaseAuth.signOut(authService);
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
