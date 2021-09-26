import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { updateProfile } from "@firebase/auth";
import { BigBannerAtLogIn } from "./Banner";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // reflect the change on the display.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(authService.currentUser, args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  // reflect the change of name immmediately on screen.
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, args),
    });
  };
  return (
    <>
      {/* main */}
      <div className={Boolean(userObj) ? "h-screen" : "mx-96"}>
        <div className="h-full">
          {init ? (
            <AppRouter
              refreshUser={refreshUser}
              isLoggedIn={Boolean(userObj)}
              userObj={userObj}
            />
          ) : (
            "Initializing..."
          )}
        </div>
        {/* bottom */}
        <footer className="fixed bottom-2 right-3">
          <a>V.beta 21.09.26</a>
          <a>&copy; {new Date().getFullYear()} Nwitter Clone Competition</a>
          <a>📧 dlgustmd3590@gmail.com</a>
        </footer>
      </div>
    </>
  );
}

export default App;
