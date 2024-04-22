import { useState } from "react";
import YourMatch from "./YourMatch";
import MatchRating from "./MatchRating";
import MatchProfile from "./MatchProfile";
import MeetingDetails from "./MeetingDetails";

export const Matching = () => {
  const [name, setName] = useState("[Name]");
  const [rate, setRate] = useState(false);

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
              <div className="w-5/6 my-16 border-2 border-gray-500 bg-white">
                <div className="grid grid-cols-5">
                  {rate ? (
                    <MatchRating name={name} />
                  ) : (
                    <>
                      <MatchProfile />
                      <MeetingDetails />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-500 border-t-0 border-l-0">
            <YourMatch
              name={`Rate: ${name}`}
              active={rate}
              onClick={() => {
                setRate(true);
              }}
            />
            <YourMatch
              name="[Name]"
              active={name == "[Name]" && !rate}
              onClick={() => {
                setName("[Name]");
                setRate(false);
              }}
              matched
            />
            <YourMatch
              name="Student One"
              active={name == "Student One" && !rate}
              onClick={() => {
                setName("Student One");
                setRate(false);
              }}
              matched
            />
            <YourMatch
              name="Student Two"
              active={name == "Student Two" && !rate}
              onClick={() => {
                setName("Student Two");
                setRate(false);
              }}
              matched
            />
            <YourMatch
              name="Student Three"
              active={name == "Student Three" && !rate}
              onClick={() => {
                setName("Student Three");
                setRate(false);
              }}
              matched
            />
            <YourMatch
              name="Student Four"
              active={name == "Student Four" && !rate}
              onClick={() => {
                setName("Student Four");
                setRate(false);
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
