import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import { BigBannerAtLogIn } from "components/Banner";
import { authService, firebaseAuth } from "fBase";
import React from "react";

const Auth = ({ isLoggedIn }) => {
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
    <div className="border-2 border-gray-200 bg-white flex justify-between mt-40 h-5/6 ">
      <div className="w-1/2 mx-3 m-10">
        <BigBannerAtLogIn />
      </div>
      <div className="w-1/2 mr-5 flex-col">
        <AuthForm />
        <div className="mt-10">
          <div className="border-b-4 mx-3 text-2xl mb-3 flex justify-center items-center">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            <button onClick={onSocialClick} name="google" className="px-5">
              Continue with Google
            </button>
          </div>

          <div className="border-b-4 mx-3 text-2xl mb-3 flex justify-center items-center">
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            <button onClick={onSocialClick} name="github" className="px-5">
              Continue with Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
