import { useState } from "react";
import YourMatch from "./YourMatch";
import MatchRating from "./MatchRating";
import MatchProfile from "./MatchProfile";
import MeetingDetails from "./MeetingDetails";

export const Matching = () => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState(false);
  const [find, setFind] = useState(true);

  return (
    <div className="flex justify-center">
      <div className="w-5/6">
        <div className="grid grid-cols-5 bg-gray-200 text-center">
          <div className="col-span-4">
            <div className="text-xl border-2 border-gray-500 border-t-0 py-2">
              {rate ? (
                <p>Rate your study partner: {name}</p>
              ) : (
                <p>You matched with {name}</p>
              )}
            </div>
          </div>
          <div className="text-xl border-2 border-gray-500 border-t-0 border-l-0 py-2">
            <p>Your Matches</p>
          </div>
          <div className="col-span-4">
            <div className="border-2 border-gray-500 border-t-0 flex justify-center">
              <div className="w-5/6">
                <div className="grid grid-cols-5">
                  {rate ? (
                    <MatchRating name={name} />
                  ) : (
                    <>
                      {find && (
                        <div className="flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="5"
                            stroke="red"
                            className="w-20 h-20"
                            onClick={() => {
                              alert("(WIP) Clicked ❌");
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18 18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                      <MatchProfile />
                      {find ? (
                        <div className="flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="5"
                            stroke="green"
                            className="w-20 h-20"
                            onClick={() => {
                              alert("(WIP) Clicked ✔");
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </div>
                      ) : (
                        <MeetingDetails setRate={setRate} setFind={setFind} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-500 border-t-0 border-l-0">
            <YourMatch
              name="Find New Study Buddy"
              active={find}
              onClick={() => {
                setName("");
                setRate(false);
                setFind(true);
              }}
            />
            <YourMatch
              name="[Name]"
              active={name == "[Name]"}
              onClick={() => {
                setName("[Name]");
                setRate(false);
                setFind(false);
              }}
              matched
            />
            <YourMatch
              name="Student One"
              active={name == "Student One"}
              onClick={() => {
                setName("Student One");
                setRate(false);
                setFind(false);
              }}
              matched
            />
            <YourMatch
              name="Student Two"
              active={name == "Student Two"}
              onClick={() => {
                setName("Student Two");
                setRate(false);
                setFind(false);
              }}
              matched
            />
            <YourMatch
              name="Student Three"
              active={name == "Student Three"}
              onClick={() => {
                setName("Student Three");
                setRate(false);
                setFind(false);
              }}
              matched
            />
            <YourMatch
              name="Student Four"
              active={name == "Student Four"}
              onClick={() => {
                setName("Student Four");
                setRate(false);
                setFind(false);
              }}
              matched
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
