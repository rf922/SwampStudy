import React from "react";
//import React, { useState, useEffect } from "react";
//import axios from "axios";
import Postcard from "../postcard/Postcard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForumAPI } from "./hooks/useForumAPI";
const ForumBorder = () => {
  return (
    <div className="absolute bottom-0 right-0 border-8 border-black w-3/4 h-3/4 flex-col justify-center items-center">
      <button className="mx-2 px-4 py-2 bg-green-500 text-white font-semibold round-md">
        Question 1
      </button>

      <button className="my-2 px-4 py-2 bg-green-500 text-white font-semibold round-md">
        Question 2
      </button>
    </div>
  );
};

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
    <div>
      <div>
        <div className="flex justify-between items-center bg-green-600 p-3">
          <Link
            to="/matching"
            className="block text-center font-semibold text-lg bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Go to Matching
          </Link>
          <div className="border-r border-black-300 h-5"></div> {/*border*/}
          <Link
            to="/forum"
            className="block text-center font-semibold text-lg bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Currently in Forums
          </Link>
        </div>
      </div>

      <div>
        <div className="font-semibold text-lg bg-yellow-500 text-white py-2 px-4 rounded hover:bg-blue-700">
          General Chat
        </div>

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

      <ForumBorder />
    </div>
  );
};

export default Forum;
