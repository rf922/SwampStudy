export const MeetingDetails = () => {
  return (
    <div className="col-span-2 border-l-2 border-gray-500">
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
  );
};

export default MeetingDetails;
