import { useState } from "react";
import YourMatch from "./YourMatch";

export const Matching = () => {
  const [name, setName] = useState("[Name]");

  return (
    <div className="flex justify-center">
      <div className="w-5/6 text-center">
        <div className="grid grid-cols-5 bg-gray-200">
          <div className="col-span-4">
            <div className="text-xl border-2 border-gray-500 border-t-0 py-2">
              <p>You matched with {name}</p>
            </div>
          </div>
          <div className="text-xl border-2 border-gray-500 border-t-0 border-l-0 py-2">
            <p>Your Matches</p>
          </div>
          <div className="col-span-4">
            <div className="border-2 border-gray-500 border-t-0 flex justify-center">
              <div className="w-5/6 my-16 border-2 border-gray-500 bg-white">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <div className="flex justify-center">
                      <div className="w-1/2">
                        <div className="grid grid-cols-2">
                          <div className="border-x-2 border-gray-500">
                            <p>Name</p>
                          </div>
                          <div className="border-r-2 border-gray-500">
                            <p>Rating</p>
                          </div>
                        </div>
                        <div className="border-2 border-b-0 border-gray-500 py-16">
                          <p>Profile Picture</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 border-t-2 border-gray-500">
                      <div className="border-r-2 border-gray-500 pb-2">
                        <div className="py-1">
                          <p>Availability:</p>
                        </div>
                        <div className="text-left px-4">
                          <p>Mon: </p>
                          <p>Tue: </p>
                          <p>Wed: </p>
                          <p>Thu: </p>
                          <p>Fri: </p>
                          <p>Sat: </p>
                          <p>Sun: </p>
                        </div>
                      </div>
                      <div>
                        <div className="py-1">
                          <p>Courses Studying:</p>
                        </div>
                        <div className="flex justify-center">
                          <ul className="list-disc ml-4 text-left">
                            <li>Course #1</li>
                            <li>Course #2</li>
                            <li>Course #3</li>
                            <li>Course #4</li>
                            <li>Course #5</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 border-l-2 border-gray-500">
                    <div className="py-1">
                      <p>Meeting Details</p>
                    </div>
                    <div className="text-left px-6 space-y-8">
                      <p>Date: </p>
                      <p>Time: </p>
                      <p>Location: </p>
                      <p>Study Course: </p>
                      <p>Email: </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-500 border-t-0 border-l-0">
            <div className="py-2 border-b-2 border-gray-500">
              <p>Rate your previous study partner</p>
            </div>
            <YourMatch
              name="[Name]"
              active={name == "[Name]"}
              onClick={() => {
                setName("[Name]");
              }}
            />
            <YourMatch
              name="Student One"
              active={name == "Student One"}
              onClick={() => {
                setName("Student One");
              }}
            />
            <YourMatch
              name="Student Two"
              active={name == "Student Two"}
              onClick={() => {
                setName("Student Two");
              }}
            />
            <YourMatch
              name="Student Three"
              active={name == "Student Three"}
              onClick={() => {
                setName("Student Three");
              }}
            />
            <YourMatch
              name="Student Four"
              active={name == "Student Four"}
              onClick={() => {
                setName("Student Four");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
