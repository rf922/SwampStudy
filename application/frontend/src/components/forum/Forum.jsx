import React from "react";
//import React, { useState, useEffect } from "react";
//import axios from "axios";
import Postcard from "../postcard/Postcard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForumAPI } from "./hooks/useForumAPI";

export const Forum = () => {
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
    <div className="flex flex-col max-w-5xl mx-auto my-4">
      <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-purple-100">
        <div className="px-6 py-4 bg-purple-100 text-gray-800">
          <div className="font-bold text-xl mb-2 text-purple-600">
            Department: {selectedDepartment}
          </div>
          <select
            id="departmentSelect"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
          >
            {Object.keys(threadsMap).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <div className="flex items-center my-4">
            <div className="mr-2 bg-purple-500 text-white font-bold py-2 px-4 rounded-lg">
              Class:
            </div>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={handleClassChange}
              disabled={
                !selectedDepartment ||
                !Object.keys(threadsMap[selectedDepartment] || {}).length
              }
              className="flex-grow mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
            >
              {selectedDepartment &&
                Object.entries(threadsMap[selectedDepartment] || {}).map(
                  ([className]) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ),
                )}
            </select>
          </div>

          {/* make a Post Button */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/makepost")}
              className="bg-gold hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
              style={{ backgroundColor: "#FFD700" }}
            >
              Make a Post
            </button>
          )}
        </div>
      </div>

      {/* threads / quetions Display */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredThreads.map((thread) => (
          
          <Postcard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
};

export default Forum;
