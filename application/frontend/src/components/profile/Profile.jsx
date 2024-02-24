import React, {useState} from 'react';
import './Profile.css'
import team from "./team"
import {useParams} from "react-router-dom";

function Profile() {
    const { name } = useParams();
    const [teamMate, setTeamMate] = useState(name||'');
    return (
            <div className="flex flex-col items-center profile">
                <h1>{team[teamMate].name}</h1>
                <img src={team[teamMate].imgUrl} alt={name} className="rounded"/>
                <p className="about-paragraph">{team[teamMate].paragraph}</p>
            </div>
    )
}


export default Profile;