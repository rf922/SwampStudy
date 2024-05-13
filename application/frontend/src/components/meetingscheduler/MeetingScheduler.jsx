import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMatchAPI from "./hooks/useMatchAPI";

const MeetingScheduler = ({ match, onUpdateMatch }) => {
  const getNearestAvailableDate = useCallback(() => {
    const bitmask = [
      0b1000000, 0b0000001, 0b0000010, 0b0000100, 0b0001000, 0b0010000,
      0b0100000,
    ];
    let date = new Date();
    while (!(match.weekavailability & bitmask[date.getDay()])) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }, [match.weekavailability]);

  const [meetingDateTime, setMeetingDateTime] = useState(
    match.date ? new Date(match.date) : getNearestAvailableDate(),
  );
  const [dateSubmitted, setDateSubmitted] = useState(!!match.date);
  const [hasChanged, setHasChanged] = useState(false);
  const { setMatchDetails } = useMatchAPI();

  useEffect(() => {
    setMeetingDateTime(new Date(match.date || getNearestAvailableDate()));
  }, [match, getNearestAvailableDate]);

  const handleSuggestDifferentTime = () => {
    setDateSubmitted(false);
    setMeetingDateTime(getNearestAvailableDate());
    setHasChanged(false); // reset change track wen suggesting a new time
  };

  const handleSubmit = () => {
    const currentTime = new Date();
    if (meetingDateTime > currentTime) {
      alert(`Meeting time set for: ${meetingDateTime}`);
      setDateSubmitted(true);
      setHasChanged(true); // new submit, hasChanged to true
    } else {
      alert("Please choose a future time.");
    }
  };

  const handleAccept = () => {
    alert("Meeting accepted!");
    setMatchDetails(match.id, meetingDateTime.toISOString());
    onUpdateMatch({
      ...match,
      date: meetingDateTime.toISOString(),
    });
    setDateSubmitted(true);
    setHasChanged(false);
  };

  const isDayDisabled = (date) => {
    const bitmask = [
      0b1000000, 0b0000001, 0b0000010, 0b0000100, 0b0001000, 0b0010000,
      0b0100000,
    ];
    return match.weekavailability & bitmask[date.getDay()];
  };

  return (
    <div className="flex flex-col h-screen max-w-full min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white border border-purple-200">
      <div className="flex flex-col max-w-full min-w-[220px] overflow-hidden shadow-lg bg-white my-4 border-purple-200 text-center">
        <h1 className="font-bold text-lg bg-fuchsia-200 text-purple-800 border-b-2 border-purple-300 inline-block pb-2">
          Meeting Details
        </h1>
        <ul className="list-none my-6 p-4">
          <li className="px-6 my-6 py-2 border-b last:border-b-0">
            Link:{" "}
            <a
              href={match.meetingLink}
              className="text-purple-500 hover:text-purple-800 visited:text-fuchsia-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {match.meetingLink}
            </a>
          </li>
          <li className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {!dateSubmitted ? (
                <>
                  <DatePicker
                    selected={meetingDateTime}
                    onChange={(date) => setMeetingDateTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    filterDate={isDayDisabled}
                    className="form-input p-2 border rounded w-full text-gray-800"
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-150 ease-in-out"
                  >
                    Submit Time
                  </button>
                </>
              ) : (
                <>
                  <div className="text-green-600 font-bold">
                    {meetingDateTime.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                  </div>
                  <button
                    onClick={handleSuggestDifferentTime}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none transition duration-150 ease-in-out"
                  >
                    Suggest Different Time
                  </button>
                </>
              )}
            </div>
            <button
              onClick={handleAccept}
              disabled={!dateSubmitted && !hasChanged}
              className={`mt-2 ${
                dateSubmitted && hasChanged
                  ? "bg-green-500 hover:bg-green-700"
                  : "bg-green-200 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              Accept
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

MeetingScheduler.propTypes = {
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
    date: PropTypes.string, // might include created date also in the future
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

export default MeetingScheduler;
