import React, { useState } from "react";
import PropTypes from "prop-types";

const Stars = ({ rating, setRating = null }) => {
  // component for displaying stars
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (index) => {
    if (setRating) {
      setHover(index);
    }
  };

  const handleMouseLeave = () => {
    if (setRating) {
      setHover(0);
    }
  };

  const handleClick = (index) => {
    if (setRating) {
      setRating(index);
    }
  };

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => {
        const starIndex = index + 1;
        const filled =
          starIndex <= (setRating ? Math.max(hover, rating) : rating);
        return (
          <button
            key={starIndex}
            className={`w-8 h-8 ${filled ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: setRating ? "pointer" : "default" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 .587l3.668 7.425 8.332 1.209-6.041 5.884 1.427 8.319L12 18.897l-7.386 3.887 1.427-8.319L.001 9.221l8.331-1.209L12 .587z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func, // opt set rating for when the user can set a rating
};

export default Stars;
