import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";

export const BigBannerAtLogIn = () => {
  return (
    <div className="">
      <FontAwesomeIcon icon={faCat} size="4x" color="beige" />
      <div className="font-medium text-center text-7xl mb-5">집사 With</div>
      <div className="font-light text-2xl mt-10">Share your lovely pet.</div>
    </div>
  );
};
