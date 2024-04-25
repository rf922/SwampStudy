import React from "react";
import PropTypes from "prop-types";

/*
display user card shows user profile / inf for a quick summary 
of user
 */
const DisplayUser = ({ user }) => {
  return (
    <div className="flex flex-col max-w-full min-w-[220px] mx-4 rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="flex justify-between px-6 py-4 bg-violet-200">
        <div className="text-lg font-bold text-purple-800">
          {user.first_name} {user.last_name}
        </div>{" "}
        <div className="flex items-center">
          {/* stars */}
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.425 8.332 1.209-6.041 5.884 1.427 8.319L12 18.897l-7.386 3.887 1.427-8.319L.001 9.221l8.331-1.209L12 .587z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center px-6 py-4 bg-purple-100">
        <img
          src={user.profile_picture}
          alt={`${user.first_name} ${user.last_name}`}
          className=" w-40 h-40 rounded-full border-4 border-purple-300"
        />
      </div>
    </div>
  );
};

DisplayUser.propTypes = {
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
};

export default DisplayUser;
