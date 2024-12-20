import React from "react";
import UserProfile from "../userprofile/UserProfile";
import Availability from "../availability/Availability";
import ClassSchedule from "../classschedule/ClassSchedule";
import UpdateAccount from "../account/accountsettings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  return (
    <div className="bg-violet-200 w-full h-screen overflow-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col md:flex-row m-0">
        {/* usr prof, avail, cls schedule */}
        <div className="flex-2 md:flex-[3]">
          <div className="overflow-auto my-6 bg-violet-200 scrollbar-hide max-h-[920px]">
            <div className="bg-violet-200 text-gray-800">
              <UserProfile />
            </div>
            <div className="bg-violet-200 text-gray-800">
              <Availability />
            </div>
            <div className="bg-violet-200 text-gray-800">
              <ClassSchedule />
            </div>
          </div>
        </div>

        {/* account settings*/}
        <div className="flex-1 md:flex-[1]">
          <div className="flex flex-col bg-violet-200">
            <div className="bg-violet-200 text-gray-800">
              <UpdateAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
