import React, { useState } from "react";
import team from "./team";
import { useParams } from "react-router-dom";

function Profile() {
  const { name } = useParams();
  const [teamMate] = useState(name || "");
  return (
    <div className="flex flex-col items-center border border-white p-4">
      <h1 className="text-xl mb-2">{team[teamMate].name}</h1>
      {/* <img src={team[teamMate].imgUrl} alt={name} style={{ height: '300px', width: '300px' }} className="rounded-full mb-4" /> */}
      <img
        src={team[teamMate].imgUrl}
        alt={name}
        className="rounded-full mb-4 object-cover max-w-96"
      />
      <p className="text-base w-4/5">{team[teamMate].paragraph}</p>
    </div>
  );
}

export default Profile;
