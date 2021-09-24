import AuthForm from "components/AuthForm";
import { authService, firebaseAuth } from "fBase";
import React from "react";

const Auth = () => {
  // social sign in or create account.
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseAuth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseAuth.GithubAuthProvider();
    }
    await firebaseAuth.signInWithPopup(authService, provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
