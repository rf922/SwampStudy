import React from "react";
import PropTypes from "prop-types";
/**
 * card for sowing the users classes
 */
const DisplayClasses = ({ selectedClasses }) => {
  const getBadgeStyle = (index) => {
    switch (index % 3) {
      case 0:
        return "bg-purple-400 text-white";
      case 1:
        return "bg-yellow-300 text-purple-600";
      case 2:
        return "bg-gray-200 text-purple-800";
      default:
        return "bg-purple-400 text-white";
    }
  };

  return (
    <div className="flex flex-col max-w-full min-h-96 min-w-[220px] rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="flex flex-col justify-between px-6 py-4 bg-violet-200 text-gray-800">
        <h1 className="font-bold text-lg text-purple-800">Courses</h1>
      </div>
      <div className="flex-grow px-6 py-4 bg-purple-100 border-t border-b border-indigo-200 text-gray-800">
        <div className="text-base overflow-auto mb-2 my-2 text-purple-600">
          {selectedClasses.map((cls, index) => (
            <span
              key={cls.id}
              className={`px-2 py-1 m-1 inline-flex items-center font-medium rounded-full ${getBadgeStyle(index)}`}
            >
              {cls.department} ({cls.number}) - {cls.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

DisplayClasses.propTypes = {
  selectedClasses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default DisplayClasses;
