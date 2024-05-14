import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import RateUser from "./../rateuser/RateUser";
import useUserAPI from "./hooks/useUserAPI";
import "react-datepicker/dist/react-datepicker.css";
import MeetingScheduler from "../meetingscheduler/MeetingScheduler";
import UserProfileCard from "../userprofilecard/UserProfileCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MeetingDetailsCard = ({ match, onUpdateMatch }) => {
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [isRateVisible, setIsRateVisible] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const { reportUser } = useUserAPI();

  useEffect(()=> {
    if(ratingSubmitted){
      toast.success("Rating submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    setRatingSubmitted(false);
  },[ratingSubmitted, setRatingSubmitted])

  const toggleRateUser = () => {
    setIsRateVisible(!isRateVisible);
  };

  const handleReportClick = () => {
    reportUser(match);
    setIsReported(true);
    toast.info(`You have submitted a report for: ${match.first_name}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-full min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white border border-purple-200">
      {isRateVisible && (
        <div className="absolute z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
          <RateUser close={toggleRateUser} user={match} setRatingSubmitted={setRatingSubmitted} />
        </div>
      )}
      <UserProfileCard user={match} />

      {match.recent ? (
        <MeetingScheduler
          key={match.id}
          match={match}
          onUpdateMatch={onUpdateMatch}
        />
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
              Link: <span className="text-gray-800">{match.meetingLink}</span>
            </li>
            <li className="px-6 py-2 border-b last:border-b-0">
              Courses: <span className="text-gray-800">{match.courses}</span>
            </li>
          </ul>
        </div>
      )}

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

MeetingDetailsCard.propTypes = {
  match: PropTypes.shape({
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
  onUpdateMatch: PropTypes.func.isRequired,
};

export default MeetingDetailsCard;
