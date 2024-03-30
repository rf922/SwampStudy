import { Link } from "react-router-dom";

const Matching = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-green-600 p-3">
        <Link
          to="/matching"
          className="block text-center font-semibold text-lg bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Currently in Matching
        </Link>
        <div className="border-r border-black-300 h-5"></div> {/*border*/}
        <Link
          to="/forum"
          className="block text-center font-semibold text-lg bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go to Forums
        </Link>
      </div>

      <p>Comming soon</p>
    </div>
  );
};

export default Matching;
