import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

export const useForumAPI = () => {
  const [departmentClassesMap, setDepartmentClassesMap] = useState([]);
  //  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forum/departments/listing`,
        );
        setDepartmentClassesMap(response.data);
      } catch (error) {
        console.error("Error geting departments and classes:", error);
      }
    };

    getDepartments();
  }, []);

  const postQuestion = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/forum/question`,
        {
          threadTitle: formData.threadTitle,
          questionText: formData.questionText,
          classId: formData.selectedClassId,
        },
        { withCredentials: true },
      );
      return response.data;

    } catch (error) {
      console.error("Error creating post:");
    }
  };

  return { departmentClassesMap, postQuestion };
};

export default useForumAPI;
