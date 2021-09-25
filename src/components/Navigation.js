import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav className="my-5 flex justify-between border-b-2">
    <div className="flex">
      <FontAwesomeIcon icon={faCat} size="3x" color="beige" />
      <Link to="/">
        <div className="font-medium text-center text-4xl ml-2">집사With</div>
      </Link>
    </div>
    <div className="flex content-center align-middle">
      <Link to="/profile">{userObj.displayName}'s Profile</Link>
    </div>
  </nav>
);
export default Navigation;
