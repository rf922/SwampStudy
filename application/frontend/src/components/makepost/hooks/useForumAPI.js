import React, { useState, useEffect } from "react";
import axios from "axios";

export const useForumAPI = () => {
  const [departmentClassesMap, setDepartmentClassesMap] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/forum/departments/listing`,
        );
        setDepartmentClassesMap(response.data);
      } catch (error) {
        console.error("Error fetching departments and classes:", error);
      }
    };

    fetchDepartments();
  }, []);

  const postQuestion = async (formData) => {
    try {
      await axios.post(
        "http://localhost:8080/api/forum/question",
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
