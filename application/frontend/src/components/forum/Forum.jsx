import React from "react";
import Postcard from "./../postcard/Postcard";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForumAPI } from "./hooks/useForumAPI";
const Forum = () => {
  //forum component displays a collection of postcards/summaries of posts
  const {
    threadsMap,
    selectedDepartment,
    setSelectedDepartment,
    selectedClass,
    setSelectedClass,
    filteredThreads,
  } = useForumAPI();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedClass("");
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Forum Questions</h2>
      <div>
        <label htmlFor="departmentSelect">Department:</label>
        <select
          id="departmentSelect"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          {Object.keys(threadsMap).map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="classSelect">Class:</label>
        <select
          id="classSelect"
          value={selectedClass}
          onChange={handleClassChange}
          disabled={
            !selectedDepartment ||
            !Object.keys(threadsMap[selectedDepartment] || {}).length
          }
        >
          {selectedDepartment &&
            Object.entries(threadsMap[selectedDepartment] || {}).map(
              // eslint-disable-next-line no-unused-vars
              ([className, _]) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ),
            )}
        </select>
      </div>
      {isLoggedIn && (
        <button
          onClick={() => navigate("/makepost")}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Make a Post
        </button>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThreads.map((thread) => (
          <Postcard key={thread.id} question={thread.question} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
