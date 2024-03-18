import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Postcard = ({ question }) => {
  // small container for quick summary of a post/ question
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="px-6 py-4 bg-purple-100 text-gray-800">
        <div className="font-bold text-xl mb-2 text-purple-600">
          {question.question}
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-700 text-base">
          Created by Account ID:{" "}
          <span className="text-purple-500">{question.account.id}</span> -
          {` ${question.account.first_name} ${question.account.last_name}`}
        </p>
      </div>
      <div className="px-6 py-4 bg-purple-50">
        <Link
          to={`/post/${question.id}`}
          className="inline-block bg-purple-200 hover:bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2 mb-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

Postcard.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    account: PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Postcard;
