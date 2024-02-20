import React from "react";
import { Link } from "react-router-dom";
import lennartpic from '../lennart.jpg'

function Profile({ image, name }) {
    const link = `/${name}`
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

export default function About() {
    return (
        <section id="about">
            <div className="">
                <p className="text-3xl text-center">About Seal Team One</p>
            </div>
            <div className="grid grid-cols-5 gap-4 p-4">
                <div>
                    <Profile
                        image={lennartpic}
                        name="lennart"
                    />
                </div>
                <div>
                    <Profile
                        image={lennartpic}
                        name="lennart"
                    />
                </div>
                <div>
                    <Profile
                        image={lennartpic}
                        name="lennart"
                    />
                </div>
                <div>
                    <Profile
                        image={lennartpic}
                        name="lennart"
                    />
                </div>
                <div>
                    <Profile
                        image={lennartpic}
                        name="lennart"
                    />
                </div>

            </div>

        </section>
    );
}