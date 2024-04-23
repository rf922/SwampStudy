import { useState } from "react";
import YourMatch from "./YourMatch";
import MatchRating from "./MatchRating";
import MatchProfile from "./MatchProfile";
import MeetingDetails from "./MeetingDetails";

export const Matching = () => {
  const [match, setMatch] = useState({ id: -1, name: "" });
  const [rate, setRate] = useState(false);
  const [find, setFind] = useState(true);

  // TODO: Remove dummy data
  const [matches, setMatches] = useState([
    { id: 0, name: "Student Zero" },
    { id: 1, name: "Student One" },
    { id: 2, name: "Student Two" },
    { id: 3, name: "Student Three" },
    { id: 4, name: "Student Four" },
    { id: 5, name: "Student Five" },
  ]);

  return (
    <div className="flex justify-center">
      <div className="w-5/6">
        <div className="grid grid-cols-5 bg-gray-200 text-center">
          <div className="col-span-4">
            <div className="text-xl border-2 border-gray-500 border-t-0 py-2">
              {rate ? (
                <p>Rate your study partner: {match.name}</p>
              ) : (
                <>
                  {find ? (
                    <p>Find A New Study Buddy!</p>
                  ) : (
                    <p>{match.name}&apos;s Profile</p>
                  )}
                </>
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
                    <MatchRating
                      match={match}
                      onSubmit={() => {
                        setMatches(
                          matches.filter((buddy) => buddy.id !== match.id),
                        );
                        setMatch({ id: -1, name: "" });
                        setRate(false);
                        setFind(true);
                      }}
                    />
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
                              // setMatches([...matches, "Dio was here"]);
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
          <div className="border-b-2 border-r-2 border-gray-500">
            <YourMatch
              name="Find A New Study Buddy"
              active={find}
              onClick={() => {
                setMatch({ id: -1, name: "" });
                setRate(false);
                setFind(true);
              }}
            />
            <div className="max-h-96 overflow-y-auto">
              {matches.map((buddy) => (
                <YourMatch
                  key={buddy.id}
                  name={buddy.name}
                  active={match.id == buddy.id}
                  onClick={() => {
                    setMatch(buddy);
                    setRate(false);
                    setFind(false);
                  }}
                  matched
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Matching;
