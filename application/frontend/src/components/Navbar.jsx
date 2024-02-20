import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div class="flex flex-row px-4">
                <div class="basis-1/6">

                    <Link to="/">Home</Link>

                </div>
                <div class="basis-1/6">

                    <Link to="/about">About</Link>

                </div>
            </div>
        </>
    );
}