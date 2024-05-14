import React, { useState } from "react";
import PropTypes from "prop-types";
import Stars from "./../stars/Stars";
import useRatingAPI from "./hooks/useRatingAPI";

const RateUser = ({ user, close, setRatingSubmitted }) => {
  const [rating, setRating] = useState(0); // curr rating set by click
  const { submitRating } = useRatingAPI();

  const handleSubmit = () => {
    try {
      submitRating(rating, user.userId);
      setRatingSubmitted(true);
      close();
    } catch (error) {
      console.log("Something went wrong submitting a rating");
    }
  };

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
      <Stars rating={rating} setRating={setRating} />
      {/* rate buttn  */}
      <div className="w-full mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out w-full"
        >
          Rate
        </button>
      </div>
    </div>
  );
};

RateUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
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
  ratingSubmitted: PropTypes.func,
};

export default RateUser;
