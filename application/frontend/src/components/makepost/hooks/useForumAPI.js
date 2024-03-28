import React, { useState, useEffect } from "react";
import axios from "axios";

export const useForumAPI = () => {
  const [departmentClassesMap, setDepartmentClassesMap] = useState({});

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
      await axios.post(
        `${process.env.REACT_APP_API_URL}/forum/question`,
        {
          threadTitle: formData.threadTitle,
          questionText: formData.questionText,
          classId: formData.selectedClassId,
        },
        { withCredentials: true },
      );
      alert("Post Created!");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return { departmentClassesMap, postQuestion };
};

export default useForumAPI;
