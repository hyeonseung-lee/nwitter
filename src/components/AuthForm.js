import React, { useState } from "react";
import { authService, firebaseAuth } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { BigBannerAtLogIn } from "./Banner";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  // get user data
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // sign in
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await firebaseAuth.createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // sign in (=== log in. same mean. don't be confused.)
        data = await firebaseAuth.signInWithEmailAndPassword(
          authService,
          email,
          password
        );
      }
    } catch (error) {
      console.log(error.message.slice(22, -2));
      setError(error.message.slice(22, -2));
    }
  };

  // change state of form. to log in or create account.
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <div className="mt-40">
        <form
          onSubmit={onSubmit}
          className="flex mb-3 rounded-lg border-2 border-gray-200"
        >
          <div className="w-4/5">
            <input
              name="email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
              className="block w-full h-10 text-center"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
              className="block w-full h-10 text-center"
            />
          </div>
          <input
            type="submit"
            value={newAccount ? "Create" : "Log In"}
            className="block w-1/5"
          />
          {error}
        </form>

        <div className="mx-1">
          <span>
            {newAccount
              ? "Do you already have an account? "
              : "Is this your first time?"}
          </span>
          <input
            type="submit"
            className="ml-3 underline text-indigo-500 bg-transparent"
            onClick={toggleAccount}
            value={newAccount ? "Sign in" : "Create Account"}
          />
        </div>
      </div>
    </>
  );
};

export default AuthForm;
