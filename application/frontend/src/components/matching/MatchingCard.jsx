import React from "react";
import PropTypes from "prop-types";
import DisplayUser from "./DisplayUser";
import DisplayAvailability from "./DisplayAvailability";
import DisplayClasses from "./DisplayClasses";

/**
 * matching card for showing a summary of a potential match !
 */
export const MatchingCard = ({ user }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-col max-w-4xl rounded-lg overflow-hidden shadow-lg bg-gray-100 border border-purple-200">
        <DisplayUser user={user} />
        <div className="flex flex-1">
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 flex flex-col bg-gray-100 p-4">
              <DisplayAvailability availability={user.weekavailability} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 flex flex-col bg-gray-100 p-4">
              <DisplayClasses selectedClasses={user.courses} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MatchingCard.propTypes = {
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

export default MatchingCard;