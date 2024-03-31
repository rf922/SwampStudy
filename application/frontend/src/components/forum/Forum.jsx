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

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    setSelectedClass("");
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div>
      {" "}
      {/* Outter most div*/}
      <div>{/* top bar div*/}</div>
      <div className="flex">
        {" "}
        {/* bottom box */}
        <div className="w-1/5">
          {" "}
          {/* nested box */}
          <div className="max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 text-center mr-4">
            <div className="px-6 py-4 bg-purple-100 text-gray-800">
              <label
                htmlFor="departmentSelect"
                className="font-bold text-xl mb-2 text-purple-600"
              >
                Department:
              </label>
              <div className="mt-1 mb-4">
                {Object.keys(threadsMap).map((dept) => (
                  <div
                    key={dept}
                    className="cursor-pointer flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100"
                    onClick={() => handleDepartmentChange(dept)}
                  >
                    {dept}
                  </div>
                ))}
              </div>
            </div>

            {isLoggedIn && (
              <div className="px-6 py-4 bg-purple-50">
                <button
                  onClick={() => navigate("/makepost")}
                  className="inline-block bg-purple-200 hover:bg-purple-300 rounded-full px-3 py-1 text-sm font-semibold text-purple-700 mr-2 mb-2"
                >
                  Ask a question
                </button>
              </div>
            )}
          </div>
          {/* dep select box */}
        </div>
        <div className="w-4/5">
          <p>this should be the 4/5 part</p>

          <div>
            {selectedDepartment && (
              <h2 className="text-3x1 mb-4 bg-purple-300 text-white py-2 px-4 rounded">
                {selectedDepartment} Department
              </h2>
            )}
          </div>

          <label
            htmlFor="classSelect"
            className="block text-lg font-medium text-grey-700 mb-2"
          >
            Class Selection:
          </label>
          <select
            id="classSelect"
            value={selectedClass}
            onChange={handleClassChange}
            disabled={
              !selectedDepartment ||
              !Object.keys(threadsMap[selectedDepartment] || {}).length
            }
            className="block w-full px-4 py-2 mt-1 bg-white border border-grey-300 rounded-md shadow-sm focus:ouline-none focus:ring-indigo-500 foucs: border-indigo-500 sm:text-sm"
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

          <div className=" gap-4">
            {filteredThreads.map((thread) => (
              <Postcard key={thread.id} question={thread.question} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
