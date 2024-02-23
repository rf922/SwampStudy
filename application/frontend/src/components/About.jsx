import React from "react";
import { Link } from "react-router-dom";
import lennartpic from '../assets/images/lennart.jpg';
import rafaelpic from '../assets/images/rafael.JPG';
import conradpic from '../assets/images/Conrad.jpg'
import juliopic from '../assets/images/julio.png'
import edmundpic from '../assets/images/edmund.jpg'

function Profile({ image, name }) {
    const link = `/about/${name}`
    return (
        <>
            <div className="flex flex-col items-center">
                <img src={image} alt={name} className="rounded"></img>
                <div className="p-4">
                    <Link to={link}>
                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-2 rounded">
                            {name}
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

const About = () => {
    const team = [
        { image: lennartpic, name: 'lennart' },
        { image: rafaelpic, name: 'rafael' },
        { image: conradpic, name: 'conrad' },
        { image: juliopic, name: 'julio' },
        { image: edmundpic, name: 'edmund' }
    ];
    return (
    <section id="about">
        <div>
            <p className="text-3xl text-center">About Seal Team One</p>
        </div>
        <div className="grid grid-cols-5 gap-4 p-4">
            {team.map((profile, index) => (
                <div key={index}>
                    <Profile
                        image={profile.image}
                        name={profile.name}
                    />
                </div>
            ))}
        </div>
    </section>);
}

export default About;