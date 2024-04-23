import PropTypes from "prop-types";

export const MeetingRating = (props) => {
  return (
    <div className="col-span-5 my-16 border-2 border-gray-500 bg-white">
      <div className="text-center space-y-8 mt-4 mb-16">
        <p>How would you rate your study partner?</p>
        <div className="flex justify-center">
          <div className="border-2 border-black rounded-xl max-w-48 w-full overflow-hidden">
            <img className="w-full object-scale-down p-2" src="/logo512.png" />
            <div className="border-t-2 border-black py-1">
              <p>{props.match.name}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="0.25"
              stroke="currentColor"
              className="w-20 h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          ))}
        </div>
        <button
          className="bg-yellow-300 rounded-lg px-5 py-1 text-black hover:bg-yellow-400 transition-colors duration-300"
          onClick={() => {
            props.onSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

MeetingRating.propTypes = {
  match: PropTypes.object,
  onSubmit: PropTypes.function,
};

export default MeetingRating;
