import React from "react";
//import React, { useState, useEffect } from "react";
//import axios from "axios";
import Postcard from "../postcard/Postcard";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
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

      <div className="flex">
        <div className="w-1/5">
          <div className="max-h-60 overflow-y-auto font-semibold text-lg bg-yellow-500 text-white py-2 px-4">
            <label
              htmlFor="departmentSelect"
              className="block text-sm font-medium text-gray-700"
            >
              Department:
            </label>
            <div className="mt-1">
              {Object.keys(threadsMap).map((dept) => (
                <div
                  key={dept}
                  className="cursor-pointer flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100"
                  onClick={() => handleDepartmentChange(dept)}
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>

          {/* 
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


                    */}

          {isLoggedIn && (
            <button
              onClick={() => navigate("/makepost")}
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ask a question
            </button>
          )}
        </div>

        <div className="w-4/5">
          <p>this should be the 4/5 part</p>

          <div>
            {selectedDepartment && (
              <h2 className="text-2x1 font-bold mb-4 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {" "}
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
