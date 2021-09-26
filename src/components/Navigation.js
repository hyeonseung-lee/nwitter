import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav className="fixed top-0 w-full flex justify-between border-b-2 border-gray-200 px-80 pt-3 bg-white">
    <div className="flex pb-2">
      <FontAwesomeIcon icon={faCat} size="3x" color="orange" />
      <Link to="/">
        <div className="font-medium text-center text-4xl ml-4">집사With</div>
      </Link>
    </div>
    <div className="flex content-center align-middle">
      <Link to="/profile">{userObj.displayName}'s Profile</Link>
    </div>
  </nav>
);
export default Navigation;
