export const MatchProfile = () => {
  return (
    <div className="col-span-3 text-center my-16 border-2 border-gray-500 bg-white">
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
  );
};

export default MatchProfile;
