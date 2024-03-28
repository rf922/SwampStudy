import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useForumAPI from "./hooks/useForumAPI";
import { useAuth } from "./../../context/AuthContext";

const Post = () => {
  let { questionId } = useParams();
  const { question, answers, setAnswers } = useForumAPI(questionId);
  const [answer, setAnswer] = useState("");
  const { isLoggedIn } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoginPrompt(false); // reset login prompt on each submit attempt

    if (!answer.trim()) return;

    // check if the user is logged in before attempting to post a answer
    if (!isLoggedIn) {
      setShowLoginPrompt(true); // show login prompt if the user is not logged in
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/forum/questions/${questionId}/answers`,
        { answer: answer },
        { withCredentials: true },
      );
      // append answers to list of existing answers && clear text field
      setAnswers((prevAnswers) => [...prevAnswers, response.data]);
      setAnswer("");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const adjustTextAreaHeight = (e) => {
    //scroll box for messages
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <div className="px-6 py-4 bg-purple-100 text-gray-800">
        <div className="font-bold text-xl mb-2 text-purple-600">
          {question.question}
        </div>
        <div className="mt-4 mb-4 overflow-auto h-48 border border-gray-300 rounded-lg p-2">
          {answers.map((answer, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              <strong>{answer.account.first_name}:</strong> {answer.answer}
            </div>
          ))}
        </div>
        {/* Display login prompt if the user is not logged in and tries to submit a answer */}
        {showLoginPrompt && (
          <div className="text-red-500 mb-2">
            Please log in to submit a answer.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onInput={adjustTextAreaHeight}
            placeholder="Add your answer "
            style={{ overflow: "hidden" }}
          ></textarea>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
