import Postcard from "../postcard/Postcard";
import { useAuth } from "../../context/AuthContext";
import Makepost from "../makepost/Makepost";
import { useForumAPI } from "./hooks/useForumAPI";
import Loading from "../loading/Loading";
import { useRef, useState, useCallback, useEffect } from "react";

export const Forum = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("NA");
  const [selectedClass, setSelectedClass] = useState("NA");
  const { isLoggedIn } = useAuth();
  const containerRef = useRef(null);
  const [isMakePostVisible, setIsMakePostVisible] = useState(false);
  //  const [postCreated, setPostCreated] = useState(0);
  const [newPost, setNewPost] = useState(null);

  const toggleMakePost = () => {
    setIsMakePostVisible(!isMakePostVisible);
  };

  const {
    threadsMap,
    setThreadsMap,
    classId,
    setClassId,
    filteredThreads,
    resetFilteredThreads,
    setFilteredThreads,
    hasMore,
    setHasMore,
    search,
    searchPhrase,
    setSearchPhrase,

    page,
    setPage,

    isLoading,
    addThreadToThreadMap,
  } = useForumAPI(
    selectedDepartment,
    setSelectedDepartment,
    selectedClass,
    setSelectedClass,
  );

  /**
   * detects when a user has reached the bottom of the threads div,
   * on reaching the bottom the page increments if there is more content to load
   */
  const handleScroll = useCallback(
    ({ target }) => {
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (filteredThreads.length % 10 !== 0) {
          // get threads a page at a time i.e 10, if there are not 10
          if (filteredThreads.length > 10) {
            //the initial page was all that there was
            setHasMore(false);
          }
        } else {
          // there was a complete set of threads
          if (hasMore) {
            // increment the page
            setPage((prevPage) => prevPage + 1);
          }
        }
        target.scrollTop = scrollTop - 30; // bounce usr backward
      }
    },
    [page, setPage, newPost, filteredThreads.length, newPost], // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * detects when a user made a new post
   */
  useEffect(() => {
    if (newPost) {
      // a post was made

      setThreadsMap((prevThreadsMap) => {
        const departmentName = newPost.class.department;
        const className = newPost.class.name;
        const updatedThreadsMap = { ...prevThreadsMap };

        if (!updatedThreadsMap[departmentName]) {
          //if the dept doesnte exist init it
          updatedThreadsMap[departmentName] = {};
        }

        if (!updatedThreadsMap[departmentName][className]) {
          //if the class doesnt exist init it with empty threads []
          updatedThreadsMap[departmentName][className] = { threads: [] };
        }
        return updatedThreadsMap;
      });
      addThreadToThreadMap(newPost);
      setHasMore(true);
      setNewPost(null); // reset newPost to prevent reprocessing
    }
  }, [newPost]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //scroll the user back to the top on selecteddp / class change
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [selectedDepartment, selectedClass]);

  const handleSearchChange = (event) => {
    setSearchPhrase(event.target.value);
    if (!searchPhrase.trim()) {
      //if the entry is blank reset the threads
      resetFilteredThreads();
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchPhrase.trim()) {
      //prevent empty search
      console.log("Search bar was empty !");
      return;
    }
    try {
      const searchRes = await search(searchPhrase, classId);
      console.log(`Searching with ${searchPhrase}, ${classId}`);
      setSearchPhrase("");
      if (searchRes.length === 0) {
        //empty results reset the thread display
        alert("search yielded no results !! ");
        resetFilteredThreads();
      } else {
        // update the display with the results found
        setFilteredThreads(searchRes);
      }
    } catch (error) {
      console.log("error getting search results " + error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    const classes = Object.keys(threadsMap[e.target.value]);
    setSelectedClass(classes[0]);
    setPage(1);
    setHasMore(true);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    const newClassDetails = threadsMap[selectedDepartment]?.[selectedClass];
    setClassId(newClassDetails?.id || null);
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto my-4">
      {isMakePostVisible && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md">
          <Makepost close={toggleMakePost} setNewPost={setNewPost} />
        </div>
      )}

      <div className="flex">
        <div className="w-1/4 h-96 p-4 overflow-auto bg-violet-300 shadow-lg">
          <h2 className="font-bold font-size-lg text-xl mb-2 text-yellow-300">
            Filters
          </h2>
          <div>
            <div className="font-bold mb-2">Department:</div>
            <select
              id="departmentSelect"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="block w-full pl-3 pr-10 py-2 mb-4 text-base focus:ring-2 focus:ring-yellow-300 focus:border-yellow-200 sm:text-sm rounded-md bg-white"
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
              className="block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-200 sm:text-sm rounded-md bg-white"
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

        <div className="w-3/4 p-4">
          <div className="rounded-lg overflow-hidden shadow-lg bg-violet-300 border border-purple-100 mb-4 p-6 text-gray-800">
            <input
              type="text"
              value={searchPhrase}
              onChange={handleSearchChange}
              placeholder="Search for threads..."
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 sm:text-sm rounded-md bg-white"
            />
            <div className="flex flex-col sm:flex-row justify-between items-stretch my-2 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="bg-yellow-300 hover:bg-yellow-400 text-purple-600 font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
              >
                Search
              </button>
              <button
                onClick={toggleMakePost}
                className={`bg-yellow-300 hover:bg-yellow-400 text-purple-600 font-bold py-2 px-4 rounded transition duration-200 ease-in-out ${!isLoggedIn ? "hidden" : ""}`}
              >
                Make a Post
              </button>
            </div>
          </div>
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="overflow-auto  min-w-full scrollbar-hide max-h-[720px] border-none px-6 "
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 ">
                {filteredThreads.map((thread) => (
                  <Postcard key={thread.id} thread={thread} />
                ))}
                {!isLoading && (!hasMore || filteredThreads.length < 10) && (
                  <p className="text-center text-xl text-purple-800 font-bold italic mb-9 shadow-md">
                    Have a question you didn&apos;t see? Ask it!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;
