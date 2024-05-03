import React, { useState } from "react";
import matches from "./matches";
import PropTypes from "prop-types";
import RateUser from "./RateUser";

/**
 * card shows meeting details for past meetings
 */
const MeetingDetailsCard = ({ match }) => {
  const [isRateVisible, setIsRateVisible] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const toggleRateUser = () => {
    setIsRateVisible(!isRateVisible);
  };

  const handleReportClick = () => {
    setIsReported(true);
    alert(`You have submitted a report for : ${match.user.first_name}`);
  };

  return (
    <div className="flex flex-col h-screen max-w-full min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white border border-purple-200">
      {isRateVisible && (
        <div className="absolute z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
          <RateUser close={toggleRateUser} user={match.user} />
        </div>
      )}
      {/* usr info */}
      <div className="flex flex-col sm:flex-row px-6 py-4 items-center sm:items-start">
        <div className="flex-grow">
          <h2 className="font-semibold text-purple-800">
            {match.user.first_name} {match.user.last_name}
          </h2>
          <p>
            Biography:{" "}
            <span className="text-gray-800">{match.user.biography}</span>
          </p>
          <p>
            Email: <span className="text-gray-800">{match.email}</span>
          </p>
        </div>
        <img
          src={match.user.profile_picture}
          alt={`${match.user.first_name}'s profile`}
          className="w-40 h-40 rounded-full mt-4 sm:mt-0 sm:ml-4"
        />
      </div>

      {/* recent match && meeting details */}
      {match.recent ? (
        <h1 className="font-bold text-lg bg-fuchsia-200 text-purple-800 border-b-2 border-purple-300 inline-block pb-2">
          You recently matched with {match.user.first_name}, reach out and send
          them an email!
        </h1>
      ) : (
        <div className="flex flex-col max-w-full min-w-[220px] overflow-hidden shadow-lg bg-white my-4 border-purple-200 text-center">
          <h1 className="font-bold text-lg bg-fuchsia-200 text-purple-800 border-b-2 border-purple-300 inline-block pb-2">
            Meeting Details
          </h1>
          <ul className="list-none p-4">
            <li className="px-6 py-2 border-b last:border-b-0">
              Date: <span className="text-gray-800">{match.date}</span>
            </li>
            <li className="px-6 py-2 border-b last:border-b-0">
              Time: <span className="text-gray-800">{match.time}</span>
            </li>
            <li className="px-6 py-2 border-b last:border-b-0">
              Location: <span className="text-gray-800">{match.location}</span>
            </li>
            <li className="px-6 py-2 border-b last:border-b-0">
              Course: <span className="text-gray-800">{match.course}</span>
            </li>
          </ul>
        </div>
      )}

      {/* rate / reprt*/}
      {!match.recent && (
        <div className="flex flex-col w-full space-y-4 mb-6 px-6">
          <button
            type="button"
            onClick={toggleRateUser}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
          >
            Rate
          </button>
          <button
            type="button"
            disabled={isReported}
            onClick={handleReportClick}
            className={`bg-transparent text-red-700 font-semibold py-2 px-4 border rounded ${
              isReported
                ? "opacity-50 cursor-not-allowed bg-red-300 border-red-500"
                : "hover:bg-red-500 hover:text-white hover:border-transparent"
            }`}
          >
            Report
          </button>
        </div>
      )}
    </div>
  );
};

MeetingDetailsCard.propTypes = {
  match: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
      weekavailability: PropTypes.number.isRequired,
      educator: PropTypes.bool,
      introvert: PropTypes.bool,
      isHidden: PropTypes.bool,
      biography: PropTypes.string,
    }).isRequired,
    recent: PropTypes.bool,
    date: PropTypes.string,
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

export default MeetingDetailsCard;
