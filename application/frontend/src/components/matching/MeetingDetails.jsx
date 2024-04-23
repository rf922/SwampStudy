import PropTypes from "prop-types";

export const MeetingDetails = (props) => {
  return (
    <div className="col-span-2 my-16 border-2 border-gray-500 border-l-0 bg-white">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="py-1 text-center">
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
        <div className="text-right">
          <button
            className="bg-yellow-300 rounded-lg px-5 py-1 text-black hover:bg-yellow-400 transition-colors duration-300 m-2"
            onClick={() => {
              props.setRate(true);
              props.setFind(false);
            }}
          >
            Rate Partner
          </button>
        </div>
      </div>
    </div>
  );
};

MeetingDetails.propTypes = {
  setRate: PropTypes.function,
  setFind: PropTypes.function,
};

export default MeetingDetails;
