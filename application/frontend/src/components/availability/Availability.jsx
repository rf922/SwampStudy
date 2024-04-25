import React, { useEffect, useState } from "react";
import { useAccountAPI } from "./hooks/useAccountAPI";

const Availability = () => {
  //avail comp to update availability
  const [availability, setAvailability] = useState(0);
  const [initialAvailability, setInitialAvailability] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);
  const { updateAvailability } = useAccountAPI();
  const [formData, setFormData] = useState({
    weekavailability: 0,
  });

  const [days, setDays] = useState({
    //day options, init all false
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  useEffect(() => {
    const dayBits = {
      // katter the bit masks need to be moved to the js file thatll handl our bit ops , lives in /src/util/.
      Monday: 0b00000001,
      Tuesday: 0b00000010,
      Wednesday: 0b00000100,
      Thursday: 0b00001000,
      Friday: 0b00010000,
      Saturday: 0b00100000,
      Sunday: 0b01000000,
    };

    const localData = localStorage.getItem("userDetails");
    if (localData) {
      //use localdata to pop availability with usrs settings
      const savedDetails = JSON.parse(localData);
      const savedAvailability = savedDetails.weekavailability;
      setAvailability(savedAvailability);
      setDays({
        // & the bitmask with the avail to check the bit, & set day
        Monday: savedAvailability & dayBits.Monday,
        Tuesday: savedAvailability & dayBits.Tuesday,
        Wednesday: savedAvailability & dayBits.Wednesday,
        Thursday: savedAvailability & dayBits.Thursday,
        Friday: savedAvailability & dayBits.Friday,
        Saturday: savedAvailability & dayBits.Saturday,
        Sunday: savedAvailability & dayBits.Sunday,
      });
      setFormData((prevForm) => ({
        //set the form val
        ...prevForm,
        weekavailability: savedAvailability,
      }));

      setInitialAvailability(savedDetails.weekavailability);
    }
  }, []);

  useEffect(() => {
    const dayBits = {
      Monday: 0b00000001,
      Tuesday: 0b00000010,
      Wednesday: 0b00000100,
      Thursday: 0b00001000,
      Friday: 0b00010000,
      Saturday: 0b00100000,
      Sunday: 0b01000000,
    };

    let newAvailability = 0;
    Object.entries(days).forEach(([day, isAvailable]) => {
      if (isAvailable) {
        // or eql newAvailability with bitMask  to set bit for day,
        newAvailability |= dayBits[day]; // mv to the util file once ready
      }
    });

    setFormData((prevForm) => ({
      ...prevForm,
      weekavailability: newAvailability,
    }));
    setAvailability(newAvailability);
    setHasChanged(newAvailability !== initialAvailability);
  }, [days, initialAvailability]);

  const handleToggle = (day) => {
    setDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSaveChanges = async () => {
    try {
      // update if a change was made
      if (hasChanged) {
        const localData = localStorage.getItem("userDetails");
        const savedDetails = localData ? JSON.parse(localData) : {};
        localStorage.setItem(
          "userDetails",
          JSON.stringify({ ...savedDetails, weekavailability: availability }),
        );

        await updateAvailability(formData);
        setHasChanged(false);
        setInitialAvailability(availability);
      } else {
        console.log(`No updated data to send !`);
      }
    } catch (error) {
      console.error("Error updating :", error);
    }
  };

  return (
    <div className="flex flex-col max-w-full mx-12 rounded-lg overflow-hidden shadow-lg bg-white my-4 border border-purple-200 transition duration-200 ease-in-out hover:shadow-2xl hover:ring-4 hover:ring-yellow-300 hover:scale-105 focus:outline-none p-4">
      <h2 className="text-xl font-semibold text-purple-800 text-center underline">
        Availability
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 bg-purple-200 gap-4 px-4 py-2">
        {Object.entries(days).map(([day, isAvailable], index) => (
          <label
            key={index}
            className="inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAvailable}
              onChange={() => handleToggle(day)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {day}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSaveChanges}
        disabled={!hasChanged}
        className={`mt-4 self-center font-bold py-2 px-4 rounded-full w-full sm:w-auto transition duration-200 ease-in-out ${
          hasChanged
            ? "bg-yellow-500 hover:bg-yellow-700 text-white"
            : "bg-purple-200 hover:bg-purple-300 text-purple-700"
        }`}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Availability;
