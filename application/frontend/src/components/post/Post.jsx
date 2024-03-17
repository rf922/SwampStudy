import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  // component for viewing a single question, uses ID to grab teh question
  let { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  useEffect(() => {
    const getQuestion = async () => {
      try {
        console.log(questionId);
        const response = await axios.get(
          `http://localhost:8080/api/forum/questions/${questionId}`,
          { withCredentials: true },
        );
        console.log(response.data);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    getQuestion();
  }, [questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="px-6 py-4 bg-purple-100 text-gray-800">
        <div className="font-bold text-xl mb-2 text-purple-600">
          {question.question}
        </div>
      </div>
    </div>
  );
};

export default Post;
