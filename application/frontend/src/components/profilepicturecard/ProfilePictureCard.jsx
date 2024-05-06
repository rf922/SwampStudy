import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Stars from "./../stars/Stars";

const ProfilePictureCard = ({ user }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false); // reset the loaded state when user changes
  }, [user]);

  return (
    <div className="flex flex-col max-w-full min-w-[220px] mx-4 rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="flex justify-between px-6 py-4 bg-violet-200">
        <div className="text-lg font-bold text-purple-800">
          {user.first_name} {user.last_name}
        </div>
        <Stars rating={user.rating ? user.rating : 0} />
      </div>
      <div className="flex justify-center items-center px-6 py-4 bg-purple-100">
        {!imageLoaded && (
          <div className="w-40 h-40 rounded-full bg-gray-300 animate-pulse"></div>
        )}{" "}
        <img
          src={user.profile_picture}
          alt={`${user.first_name} ${user.last_name}`}
          className={`w-40 h-40 rounded-full border-4 border-purple-300 ${imageLoaded ? "block" : "hidden"}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </div>
  );
};

ProfilePictureCard.propTypes = {
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
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfilePictureCard;
