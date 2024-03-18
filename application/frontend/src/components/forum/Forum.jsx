import React, { useState, useEffect } from "react";
import axios from "axios";
import Postcard from "../postcard/Postcard";

const Forum = () => {
  //forum gets lists of posts/questions and uses Postcard component to display a quick summary/view
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/forum/questions",
          { withCredentials: true },
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    getQuestions();
  }, []);

  return (
    // todo style , eventually add feature that will load / get more questions
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Forum Questions</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <Postcard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
