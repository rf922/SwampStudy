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
        <div className="w-1/5 mt-4 mr-4 ml-4">
          {" "}
          {/* nested box */}
          <div
            className="max-h-150 block overflow-y-auto font-semibold text-lg  py-2 px-4 rounded-md"
            style={{ backgroundColor: "#FFCF01", padding: "2rem 1rem" }}
          >
            <label
              htmlFor="departmentSelect"
              className=" text-lg font-medium text-gray-700"
            >
              Department:
            </label>

            <div className="mt-4" style={{ padding: "0 1rem" }}>
              {Object.keys(threadsMap).map((dept) => (
                <div
                  key={dept}
                  className="cursor-pointer flex items-center border border-purple-200 justify-between px-4 py-2 text-sm font-medium text-gray-900 bg-purple-100 hover:bg-gray-100"
                  onClick={() => handleDepartmentChange(dept)}
                >
                  {dept}
                </div>
              ))}
            </div>
          </div>{" "}
          {/* dep select box */}
          {isLoggedIn && (
            <button
              onClick={() => navigate("/makepost")}
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-20 rounded mt-4"
            >
              Ask A Question
            </button>
          )}
        </div>
        {/*----*/}
        <div className="w-4/5 mr-4 mt-4">
          <div>
            {selectedDepartment && (
              <h2 className="text-3x1 mb-4 bg-purple-300 text-white py-2 px-4 rounded">
                {selectedDepartment} Department
              </h2>
            )}
          </div>

          <div className="flex">
            <label
              htmlFor="classSelect"
              className="block text-lg font-medium text-white mb-2 bg-blue-500  rounded"
              style={{ minWidth: "150px" }}
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
              className="ml-2 block w-full px-4 py-2 mt-1 bg-white border border-grey-300 rounded-md shadow-sm focus:ouline-none focus:ring-indigo-500 foucs: border-indigo-500 sm:text-sm"
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
