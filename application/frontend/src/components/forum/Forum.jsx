import React, { useState } from "react";
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
    classId,
    filteredThreads,
    resetFilteredThreads,
    setFilteredThreads,
    search,
  } = useForumAPI();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearchChange = (event) => {
    const searchPhrase = event.target.value;
    setSearchPhrase(searchPhrase);
    if (!searchPhrase) {
      // no input is , reset the threads to default
      console.log("Input cleared, resetting threads to default");
      resetFilteredThreads(); // helper for resetting threads to display
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchPhrase.trim()) {
      // no blank phrases !
      console.log("Search bar was empty !");
      return;
    }
    try {
      const searchRes = await search(searchPhrase, classId);
      console.log(`Searching with ${searchPhrase}, ${classId}`);
      if (searchRes.length === 0) {
        alert("search yielded no results !! ");
        resetFilteredThreads();
      } else {
        setFilteredThreads(searchRes);
      }
    } catch (error) {
      console.log("error getting search results " + error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto my-4">
      {/* main content area with side column for filters */}
      <div className="flex">
        {/* side col for dept and cls filters */}
        <div className="w-1/4 h-96 p-4 bg-violet-300 shadow-lg">
          <h2 className="font-bold font-size-lg text-xl mb-2 text-yellow-300">
            Filters
          </h2>
          <div>
            <div className="font-bold mb-2">Department:</div>
            <select
              id="departmentSelect"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="block w-full pl-3 pr-10 py-2 mb-4 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
            >
              {Object.keys(threadsMap).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="font-bold mb-2">Class:</div>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={handleClassChange}
              disabled={
                !selectedDepartment ||
                !Object.keys(threadsMap[selectedDepartment] || {}).length
              }
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
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
        </div>

        {/* 2snd col */}
        <div className="w-3/4 p-4">
          <div className="rounded-lg overflow-hidden shadow-lg bg-violet-300 border border-purple-100 mb-4 p-6  text-gray-800">
            <input
              type="text"
              value={searchPhrase}
              onChange={handleSearchChange}
              placeholder="Search for threads..."
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white"
            />
            <div className="flex justify-between items-center my-2">
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="bg-yellow-300 hover:bg-gold text-purple-400 font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
              >
                Search
              </button>
              <button
                onClick={() => navigate("/makepost")}
                className={`bg-yellow-300 hover:bg-gold text-purple-400 font-bold py-2 px-4 rounded transition duration-200 ease-in-out ${!isLoggedIn ? "hidden" : ""}`}
              >
                Make a Post
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {filteredThreads.map((thread) => (
              <Postcard key={thread.id} thread={thread} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
