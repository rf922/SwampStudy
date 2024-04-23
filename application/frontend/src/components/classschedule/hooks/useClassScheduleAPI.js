//import { useState, useEffect } from "react";
import axios from "axios";

export const useClassScheduleAPI = (setInitSchedule, selectedClasses) => {
  const updateClassSchedule = async (updatedClasses) => {
    try {
      const classes = updatedClasses.map((cls) => cls.id);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/schedule/update`,
        { classes },
        { withCredentials: true },
      );
      console.log("Post was successful !" + JSON.stringify(response.data));
    } catch (error) {
      console.log("Error updating class schedule");
    }
  };

  const getClassSchedule = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/schedule/`,
        {
          withCredentials: true,
        },
      );
      const data = response.data;
      const classes = data.map((schedule) => schedule.class);
      setInitSchedule(classes);
      selectedClasses(classes);
    } catch (error) {
      console.log("Error updating class schedule");
    }
  };
  return { getClassSchedule, updateClassSchedule };
};

export default useClassScheduleAPI;
