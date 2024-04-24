import React from "react";
import PropTypes from "prop-types";

/**
 * displays weekavailability in a card like container
 * uses bit mask to set when available / nt avail
 */
const DisplayAvailability = ({ availability }) => {
  const days = [
    { name: "Monday", bitmask: 0b0000001 },
    { name: "Tuesday", bitmask: 0b0000010 },
    { name: "Wednesday", bitmask: 0b0000100 },
    { name: "Thursday", bitmask: 0b0001000 },
    { name: "Friday", bitmask: 0b0010000 },
    { name: "Saturday", bitmask: 0b0100000 },
    { name: "Sunday", bitmask: 0b1000000 },
  ];

  const isDaySet = (bitmask) => (availability & bitmask) !== 0;

  return (
    <div className="flex flex-col max-w-full min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white my-4  border-purple-200 ">
      <div className="flex flex-col justify-between px-6 py-4 bg-violet-200 text-gray-800">
        <h1 className="font-bold text-lg text-purple-800">
          Weekday Availability
        </h1>
      </div>
      <ul className="list-none p-4">
        {days.map((day, index) => (
          <li key={index} className="px-6 py-2 border-b last:border-b-0">
            {day.name}:{" "}
            <span
              className={
                isDaySet(day.bitmask) ? "text-green-600" : "text-red-600"
              }
            >
              {isDaySet(day.bitmask) ? "Available" : "Not Available"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

DisplayAvailability.propTypes = {
  availability: PropTypes.number.isRequired,
};

export default DisplayAvailability;
