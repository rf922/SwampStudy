import { useState, useEffect } from "react";
import axios from "axios";

export const useForumAPI = (
  selectedDepartment,
  setSelectedDepartment,
  selectedClass,
  setSelectedClass,
) => {
  const [threadsMap, setThreadsMap] = useState({});
  const [classId, setClassId] = useState(null);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  /**
   * searches using the passed phrase and classId, returns threads matching the search
   * @param {*} phrase
   * @param {*} classId
   * @returns
   */
  const search = async (phrase, classId) => {
    setIsLoading(true);
    try {
      // to search
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/forum/threads/search`,
        { params: { phrase, classId } },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching threads:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * helper for reseting the threads displayed/ curr seledcted
   */
  const resetFilteredThreads = () => {
    if (selectedDepartment && selectedClass) {
      const threads =
        threadsMap[selectedDepartment]?.[selectedClass].threads || [];
      setFilteredThreads(threads);
    } else {
      console.log("Not SET !");
      setFilteredThreads([]);
    }
  };

  /**
   * helper function to set up and update threamap,
   * takes a mapping of class objects to department strings then creates
   * a grouping of thread arrays to class names to department names
   * @param {*} classesMap
   * @returns
   */
  const organizeData = (classesMap) => {
    const organizedMap = {}; // init container
    Object.keys(classesMap).forEach((department) => {
      //place the department in the map
      organizedMap[department] = classesMap[department].reduce(
        (acc, classObj) => ({
          //place the class and init array
          ...acc,
          [classObj.name]: { ...classObj, threads: [] }, //classes by name, threads arrays by class
        }),
        {},
      );
    });

    return organizedMap;
  };

  useEffect(() => {
    const getClassListing = async () => {
      // retrieve the listing of classes
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forum/threads/class/listing`,
        );
        // ** sets up /updates theadMap */
        const organizedMap = organizeData(response.data);
        setThreadsMap(organizedMap);

        const firstDepartment = Object.keys(organizedMap)[0];
        const firstClass = Object.keys(organizedMap[firstDepartment])[0];

        if (!selectedDepartment || !(selectedDepartment in organizedMap)) {
          // if the selected dep was not
          setSelectedDepartment(firstDepartment);
          setSelectedClass(firstClass);
          setClassId(organizedMap[firstDepartment][firstClass].id);
        } else if (!selectedClass) {
          // class was nt set, set the class
          setSelectedClass(firstClass);
          setClassId(organizedMap[selectedDepartment][firstClass].id);
        }
      } catch (error) {
        console.error("Failed to fetch classes and threads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getClassListing();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getNewUniqueThreads = (newThreads, existingThreads) => {
      //helper to filter out threads already contained in existingThreads
      return newThreads.filter(
        (nt) =>
          !existingThreads.some((et) => et.question.id === nt.question.id),
      );
    };

    const updateThreadsMap = (newUniqueThreads, existingThreads) => {
      //helper for appending new threads to the map
      return {
        ...threadsMap,
        [selectedDepartment]: {
          ...threadsMap[selectedDepartment],
          [selectedClass]: {
            ...threadsMap[selectedDepartment]?.[selectedClass],
            threads: [...existingThreads, ...newUniqueThreads],
          },
        },
      };
    };

    if (selectedDepartment !== "NA" && selectedClass !== "NA" && hasMore) {
      // solong as depp and cls have been set & there are more threads to see
      if (
        page === 1 &&
        threadsMap[selectedDepartment][selectedClass].threads.length !== 0
      ) {
        // if page one is already pop, return
        return;
      }
      if (page > 1) {
        // ensure the page is valid
        const threadPerPage = 10;
        const num = filteredThreads.length / threadPerPage; // complet pages from filteredthreads
        if (page <= num || Math.abs(page - num) > 1) {
          //if page num deviates by more than 1 from whats pos
          setHasMore(false);
          return;
        }
      }

      if (threadsMap.length > 10 && threadsMap.length % 10 !== 0) {
        // if page is not a complete set of threads
        setHasMore(false);
        return;
      }
      setIsLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/forum/threads/${selectedClass}/page/${page}`,
        )
        .then((response) => {
          const newThreads = response.data;
          if (newThreads.length === 0) {
            // new threads was empty !
            setHasMore(false);
          } else {
            // new threads non empty, process them
            const existingThreads =
              threadsMap[selectedDepartment]?.[selectedClass]?.threads || [];

            const newUniqueThreads = getNewUniqueThreads(
              newThreads,
              existingThreads,
            );
            if (newUniqueThreads.length > 0) {
              //if there are new unseen threads
              const updatedThreadsMap = updateThreadsMap(
                newUniqueThreads,
                existingThreads,
              );
              setThreadsMap(updatedThreadsMap);
              setFilteredThreads(
                updatedThreadsMap[selectedDepartment]?.[selectedClass]
                  ?.threads || [],
              );
            } else {
              console.log("No new threads to add.");
            }
          }
        })
        .catch((error) => {
          console.error("Failed to fetch threads due to an error:", error);
        })
        .finally(() => {
          console.log("Fetch threads operation completed.");
          setIsLoading(false);
        });
    } else {
      console.log(
        `Fetch operation not initiated due to invalid parameters: Page=${page}, SelectedClass=${selectedClass}`,
      );
    }
  }, [page, selectedClass]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDepartment) {
      // update the selected department
      const classes = threadsMap[selectedDepartment] || [];
      if (classes.length > 0) {
        // default to first entry
        setSelectedClass(classes[0].name);
        console.log(classes[0].name);
      } else {
        setSelectedClass("");
        setFilteredThreads([]);
      }
      setPage(1);
      setHasMore(true);
    }
  }, [selectedDepartment]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDepartment) {
      // update the selected class
      const threads =
        threadsMap[selectedDepartment]?.[selectedClass].threads || [];
      setFilteredThreads(threads);
      setSelectedClass(selectedClass);
      if (threads[0]) setClassId(threads[0].class.id);
    }
  }, [selectedClass]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
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
  };
};
