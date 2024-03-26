import { useState, useEffect } from "react";
import axios from "axios";

// gets and managing forum data
export const useForumAPI = () => {
  const [threadsMap, setThreadsMap] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredThreads, setFilteredThreads] = useState([]);

  useEffect(() => {
    // get threads/questions by class then by department
    axios
      .get("http://localhost:8080/api/forum/departments/threads")
      .then((response) => {
        setThreadsMap(response.data);
        const departments = Object.keys(response.data);
        if (departments.length > 0) {
          setSelectedDepartment(departments[0]);
        }
      })
      .catch((error) => console.error("Error fetching threads:", error));
  }, []);

  useEffect(() => {
    // update the selected department
    if (selectedDepartment) {
      const classes = Object.keys(threadsMap[selectedDepartment] || {});
      if (classes.length > 0) {
        // default to first entry
        setSelectedClass(classes[0]);
      } else {
        setSelectedClass("");
        setFilteredThreads([]);
      }
    }
  }, [selectedDepartment, threadsMap]);

  useEffect(() => {
    // update the selected class
    if (selectedDepartment && selectedClass) {
      const threads = threadsMap[selectedDepartment]?.[selectedClass] || [];
      setFilteredThreads(threads);
    }
  }, [selectedDepartment, selectedClass, threadsMap]);

  return {
    threadsMap,
    selectedDepartment,
    setSelectedDepartment,
    selectedClass,
    setSelectedClass,
    filteredThreads,
  };
};

export default useForumAPI;
