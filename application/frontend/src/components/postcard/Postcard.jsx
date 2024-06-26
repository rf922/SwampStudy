import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Postcard = ({ thread }) => {
  // small container for quick summary of a post/ question
  return (
    //  hover:shadow-2xl for a lgr shadw onhover && hover:scale-105 to make it 'pop'
    <div className="flex flex-col max-w-full min-w-[220px] min-h-[220px] rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl hover:ring-4 hover:ring-yellow-300 hover:scale-105 focus:scale-105 focus:outline-none">
      <div className="flex flex-col justify-between px-6 py-4 bg-violet-200 text-gray-800 h-full">
        <p className="font-bold text-lg text-purple-800 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {thread.title}
        </p>
        <div className="flex-grow"></div>

        <div className="text-right mt-4">
          <p className="text-gray-700 text-base">
            Asked By:{" "}
            <span className="text-purple-500">
              {thread.question.account.first_name}
            </span>
          </p>
        </div>
      </div>
      <div className="flex-grow px-6 py-4 bg-purple-100 border-t border-b border-indigo-200 text-gray-800">
        <div className="font-bold text-xl mb-2 text-purple-600 overflow-hidden text-ellipsis line-clamp-3">
          {thread.question.question}
        </div>
      </div>
      <div className="px-6 py-4 bg-purple-50 mt-auto">
        <Link
          to={`/post/${thread.question.id}`}
          className="inline-block bg-purple-200 hover:bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2 mb-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

Postcard.propTypes = {
  // thread obj passed to postcard
  thread: PropTypes.shape({
    // whats in the thread itself
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    class: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      department: PropTypes.string.isRequired,
    }).isRequired,
    question: PropTypes.shape({
      // whats in the question assoc with the thread
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      account: PropTypes.shape({
        // the account
        id: PropTypes.number.isRequired,
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        profile_picture: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
export default Postcard;
