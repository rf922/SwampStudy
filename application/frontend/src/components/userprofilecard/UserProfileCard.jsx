import React from "react";
import PropTypes from "prop-types";
import "react-datepicker/dist/react-datepicker.css";
import WeekAvailabilityCard from "../weekavailabilitycard/WeekAvailabilityCard";
import Stars from "../stars/Stars";

const UserProfileCard = ({ user }) => {
  return (
    <div className="flex flex-col min-h-[400px] overflow-auto scrollbar-hide px-6 py-4 items-start">
      <div className="flex flex-row mb-4  w-full items-center">
        <div className="flex flex-col flex-grow">
          <h1 className="font-semibold text-purple-800 text-lg">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-800 mt-2 mb-1">
            <strong>Bio:</strong> {user.biography}
          </p>
          <p className="text-gray-800">
            <strong>Email:</strong> {user.email}
          </p>
        </div>
        <div className="flex-col my-2">
          <img
            src={user.profile_picture}
            alt={`${user.first_name}'s profile`}
            className="w-40 h-40 mb-4 rounded-full"
          />
          <Stars rating={user.rating} />
        </div>
      </div>
      <div className="w-full">      <WeekAvailabilityCard availability={user.weekavailability} /></div>
    </div>
  );
};

UserProfileCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    profile_picture: PropTypes.string.isRequired,
    weekavailability: PropTypes.number.isRequired,
    educator: PropTypes.bool,
    meetingLink: PropTypes.string,
    biography: PropTypes.string,
    recent: PropTypes.bool,
    time: PropTypes.string,
    date: PropTypes.string,
    rating: PropTypes.number,
    location: PropTypes.string,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        department: PropTypes.string.isRequired,
      }),
    ).isRequired,
    email: PropTypes.string,
  }).isRequired,
};

export default UserProfileCard;
