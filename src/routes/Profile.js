import { authService, firebaseAuth } from "fBase";
import React from "react";
import { useHistory } from "react-router";

export default () => {
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
