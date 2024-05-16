import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFormValidation } from "./hooks/useFormValidation";
import { useForumAPI } from "./hooks/useForumAPI";
import { toast } from "react-toastify";

const Makepost = ({ close, setNewPost }) => {
  const { departmentClassesMap, postQuestion } = useForumAPI();
  const { formData, handleInputChange, errors, setFormData, validate } =
    useFormValidation({
      threadTitle: "",
      questionText: "",
    });

  const [uniqueClasses, setUniqueClasses] = useState([]);

  useEffect(() => {
    const firstDepartment = Object.keys(departmentClassesMap)[0];
    if (firstDepartment) {
      setFormData((prev) => ({
        ...prev,
        selectedDepartment: firstDepartment,
        selectedClassId:
          departmentClassesMap[firstDepartment]?.[0]?.class?.id || "",
      }));
    }
  }, [departmentClassesMap, setFormData]);

  useEffect(() => {
    const departmentClasses =
      departmentClassesMap[formData.selectedDepartment] || [];
    const classesMap = {};

    departmentClasses.forEach((currentClass) => {
      const cls = currentClass;
      if (cls && !classesMap[cls.id]) {
        classesMap[cls.id] = cls;
      }
    });

    const classes = Object.values(classesMap);
    setUniqueClasses(classes);
    if (classes.length > 0) {
      setFormData((prev) => ({ ...prev, selectedClassId: classes[0].id }));
    }
  }, [formData.selectedDepartment, departmentClassesMap, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      close();
      const { thread, _question } = await postQuestion(formData);
      setNewPost(thread);
    } else {
      toast.error("Please fix form errors before submitting,", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="flex flex-col max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white my-8 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl focus:ring-4 focus:ring-yellow-300">
      <button
        onClick={close}
        className="absolute top-0 right-0 p-2 text-lg text-gray-800 hover:text-red-500"
      >
        ✖
      </button>
      <h1 className="text-2xl font-bold mb-4 px-6 py-4 bg-violet-200 text-gray-800">
        Make a Post
      </h1>
      <form onSubmit={handleSubmit} className="w-full px-6 pb-6">
        <div className="mb-4">
          <label
            htmlFor="departmentSelect"
            className="block text-sm font-bold mb-2"
          >
            Department
          </label>
          <select
            required
            id="departmentSelect"
            name="selectedDepartment"
            value={formData.selectedDepartment}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {Object.keys(departmentClassesMap).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="classSelect" className="block text-sm font-bold mb-2">
            Class
          </label>
          <select
            required
            id="classSelect"
            name="selectedClassId"
            value={formData.selectedClassId}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {uniqueClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.number})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="threadTitle" className="block text-sm font-bold mb-2">
            Title
          </label>
          <input
            required
            type="text"
            id="threadTitle"
            name="threadTitle"
            placeholder="Enter title"
            value={formData.threadTitle}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.threadTitle && (
            <p className="text-red-500 text-xs italic">{errors.threadTitle}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="questionText"
            className="block text-sm font-bold mb-2"
          >
            Question
          </label>
          <textarea
            required
            id="questionText"
            name="questionText"
            placeholder="Type your question here..."
            value={formData.questionText}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {errors.questionText && (
            <p className="text-red-500 text-xs italic">{errors.questionText}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={close}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

Makepost.propTypes = {
  //specify the type of prop being passed --
  close: PropTypes.func.isRequired, // close - func
  setNewPost: PropTypes.func.isRequired,
};
export default Makepost;
