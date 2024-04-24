import React, { useState } from "react";
import PropTypes from "prop-types";

const DisplayRating = ({ user, close }) => {
  const [hover, setHover] = useState(0); // curr hover position
  const [rating, setRating] = useState(0); // curr rating set by click

  return (
    <div className="flex flex-col h-auto max-w-full min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white border border-purple-200 items-center py-6">
      <button
        onClick={close}
        className="absolute top-0 right-0 p-2 text-xl text-white hover:text-red-500"
      >
        ✖
      </button>
      <h1 className="text-2xl font-bold mb-4 px-6 py-4 bg-violet-200 text-gray-800">
        Rate your study partner
      </h1>
      {/* usr inf */}
      <img
        src={user.profile_picture}
        alt={`${user.first_name}'s profile`}
        className=" w-36 h-36 rounded-full"
      />
      <div className="flex flex-col items-center text-center space-y-2 mt-4">
        <h2 className="font-semibold text-purple-800">
          {user.first_name} {user.last_name}
        </h2>
        <p>
          Biography: <span className="text-gray-800">{user.biography}</span>
        </p>
      </div>
      {/**stars */}
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={`w-8 h-8 ${index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .587l3.668 7.425 8.332 1.209-6.041 5.884 1.427 8.319L12 18.897l-7.386 3.887 1.427-8.319L.001 9.221l8.331-1.209L12 .587z" />
              </svg>
            </button>
          );
        })}
      </div>
      {/* rate buttn  */}
      <div className="w-full mt-4">
        <button
          type="button"
          onClick={close}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out w-full"
        >
          Rate
        </button>
      </div>
    </div>
  );
};

DisplayRating.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    weekavailability: PropTypes.number.isRequired,
    educator: PropTypes.bool,
    introvert: PropTypes.bool,
    isHidden: PropTypes.bool,
    biography: PropTypes.string,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        department: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
};

export default DisplayRating;
