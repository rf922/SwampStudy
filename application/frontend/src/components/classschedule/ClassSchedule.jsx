import React, { useState, useEffect } from "react";
import axios from "axios";
import { useClassScheduleAPI } from "./hooks/useClassScheduleAPI";

const ClassSchedule = () => {
  //clss schedule comp lets usr set schedule
  const [departmentClassesMap, setDepartmentClassesMap] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [initSchedule, setInitSchedule] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [classesChanged, setClassesChanged] = useState(false);
  const { getClassSchedule, updateClassSchedule } = useClassScheduleAPI(
    setInitSchedule,
    setSelectedClasses,
  );

  useEffect(() => {
    //get init class listing
    const getDepartmentListing = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/forum/departments/listing`,
        );
        setDepartmentClassesMap(response.data);
        const firstDepartment = Object.keys(response.data)[0];
        if (firstDepartment) {
          setSelectedDepartment(firstDepartment);
          setSelectedClassId(response.data[firstDepartment][0].id || "");
        }
      } catch (error) {
        console.error("Error getting departments and classes:", error);
      }
    };
    getClassSchedule();
    getDepartmentListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDepartmentChange = (event) => {
    const newSelectedDepartment = event.target.value;
    setSelectedDepartment(newSelectedDepartment);
    const classes = departmentClassesMap[newSelectedDepartment];
    setSelectedClassId(classes?.[0]?.id || "");
  };

  const handleClassChange = (event) => {
    setSelectedClassId(event.target.value);
  };

  const handleAddClass = () => {
    const classToAdd = departmentClassesMap[selectedDepartment].find(
      (cls) => cls.id === parseInt(selectedClassId),
    );
    if (
      classToAdd &&
      !selectedClasses.some((cls) => cls.id === classToAdd.id)
    ) {
      setSelectedClasses((prev) => [...prev, classToAdd]);
    }
  };

  const handleRemoveClass = (classId) => {
    setSelectedClasses((prevClasses) =>
      prevClasses.filter((cls) => cls.id !== classId),
    );
  };

  useEffect(() => {
    const initClassIds = new Set(initSchedule.map((cls) => cls.id));
    const selectedClassIds = new Set(selectedClasses.map((cls) => cls.id));

    const setsAreEqual =
      initClassIds.size === selectedClassIds.size &&
      [...initClassIds].every((id) => selectedClassIds.has(id));

    setClassesChanged(!setsAreEqual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClasses]);

  const getBadgeStyle = (index) => {
    //for setting alt colors for classes
    switch (index % 3) {
      case 0:
        return "bg-purple-400 text-white";
      case 1:
        return "bg-yellow-300 text-purple-600";
      case 2:
        return "bg-gray-200 text-purple-800";
      default:
        return "bg-purple-400 text-white";
    }
  };

  const handleSaveChange = async () => {
    console.log({ selectedClasses });
    updateClassSchedule(selectedClasses);

    setClassesChanged(false);
    setInitSchedule(selectedClasses);
  };

  return (
    <div className="flex flex-col sm:flex-row max-w-full min-h-[220px] mx-12 rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl hover:ring-4 hover:ring-yellow-300 hover:scale-105 focus:outline-none ">
      {/* cls / depp sel section */}
      <div className="flex flex-col justify-between px-6 py-4 bg-violet-200 text-gray-800 sm:w-1/3">
        <h2 className="font-bold text-lg text-purple-800">Class Schedule</h2>
        <div className="mt-4">
          <label
            htmlFor="departmentSelect"
            className="block text-sm font-bold mb-2"
          >
            Department
          </label>
          <select
            id="departmentSelect"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {Object.keys(departmentClassesMap).map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="classSelect" className="block text-sm font-bold mb-2">
            Class
          </label>
          <select
            id="classSelect"
            value={selectedClassId}
            onChange={handleClassChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {departmentClassesMap[selectedDepartment]?.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.number})
              </option>
            ))}
          </select>
          <button
            onClick={handleAddClass}
            className="mt-4 self-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full w-full sm:w-auto"
          >
            Add Class
          </button>
        </div>
      </div>
      {/* sel class listing */}
      <div className="flex-grow bg-purple-100 px-6 py-4 text-gray-800 sm:w-2/3">
        <p className="text-xl font-bold text-purple-600">Selected Classes:</p>
        <div className="overflow-auto scrollbar-hide min-h-[200px] max-h-[200px]">
          {selectedClasses.map((cls, index) => (
            <div
              key={cls.id}
              className="group relative inline-flex items-center mx-2 mt-12"
            >
              <span
                className={`px-2 py-1 text-sm font-medium rounded ${getBadgeStyle(index)}`}
              >
                {cls.department} ({cls.number})
                <button
                  onClick={() => handleRemoveClass(cls.id)}
                  className="ml-2 text-md bg-transparent rounded-sm hover:text-black"
                  aria-label="Remove"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <span
                  id={`tooltip-${cls.id}`}
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm text-nowrap font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:visible group-hover:opacity-100 dark:bg-gray-700 -translate-y-10 -translate-x-4"
                >
                  {cls.name}
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSaveChange}
            className={`font-bold py-2 px-4 rounded-full text-white ${classesChanged ? "bg-yellow-500 hover:bg-yellow-700" : "bg-purple-200 hover:bg-purple-300 text-purple-700"}`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
