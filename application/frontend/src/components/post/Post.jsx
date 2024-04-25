import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useForumAPI from "./hooks/useForumAPI";
import { useAuth } from "./../../context/AuthContext";
import { useFormValidation } from "./hooks/useFormValidation";
import Loading from "./../loading/Loading";
const Post = () => {
  let { questionId } = useParams();
  const { question, answers, setAnswers } = useForumAPI(questionId);
  const { isLoggedIn } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { validate, errors, handleChange, formData } = useFormValidation({
    answer: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLoginPrompt(false); // reset login prompt on each submit attempt

    // check if the user is logged in before attempting to post a answer
    if (!isLoggedIn) {
      setShowLoginPrompt(true); // show login prompt if the user is not logged in
      return;
    }
    if (validate()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/forum/questions/${questionId}/answers`,
          formData,
          { withCredentials: true },
        );
        // append answers to list of existing answers && clear text field
        setAnswers((prevAnswers) => [...prevAnswers, response.data]);
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  const adjustTextAreaHeight = (e) => {
    //scroll box for messages
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (!question) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto  rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200">
      <Link
        to="/"
        className="absolute top-35 left-4 z-40 bg-yellow-300 hover:bg-yellow-400 text-purple-600 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out text-xs sm:text-sm shadow hover:shadow-lg transform hover:-translate-y-1"
      >
        Return to Forum
      </Link>
      <div className="w-full bg-purple-100 text-gray-800">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-purple-600 text-center ">
            {question.thread.title}
          </div>
        </div>
      </div>
      <div className="w-full bg-purple-50 rounded-b-lg p-4 mb-4">
        <p className="text-gray-700">{question.question}</p>
        <p className="text-base mb-2 text-right">
          Asked by:{" "}
          <span className="font-semibold">{question.account.first_name}</span>
        </p>
      </div>
      <div className="overflow-auto h-48 border border-gray-300 rounded-lg p-4 mb-4">
        {answers.map((answer, index) => (
          <div key={index} className="mb-2 p-3 bg-gray-100 rounded">
            <strong>{answer.account.first_name}:</strong> {answer.answer}
          </div>
        ))}
      </div>
      {showLoginPrompt && (
        <div className="text-red-500 mb-2 px-6">
          Please log in to submit an answer.
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-6 pb-6">
        {errors.answer && (
          <p className="text-red-500 text-md italic">{errors.answer}</p>
        )}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-2"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          onInput={adjustTextAreaHeight}
          placeholder="Add your answer"
          style={{ overflow: "hidden" }}
        ></textarea>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Post;
