import { useState, useEffect } from "react";
import axios from "axios";

const useForumAPI = (questionId) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // get the question to display
    const getQuestion = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forum/questions/${questionId}`,
          { withCredentials: true },
        );
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    const getAnswers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forum/questions/${questionId}/answers`,
          { withCredentials: true },
        );
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    const fetchData = async () => {
      await getQuestion();
      await getAnswers();
    };
    fetchData();
  }, [questionId]);

  return { question, answers, setAnswers };
};

export default useForumAPI;
