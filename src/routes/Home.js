import { collection, onSnapshot } from "@firebase/firestore";
import { NomalBannerAtHome } from "components/Banner";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // loda nweets from db
  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div className="w-2/3 h-full">
      {/* form to make new nweet */}
      <NweetFactory userObj={userObj} />

      {/* show nweets from db */}
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
