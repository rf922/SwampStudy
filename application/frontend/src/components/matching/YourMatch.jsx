import PropTypes from "prop-types";

export const YourMatch = (props) => {
  return (
    <div
      className="border-b-2 border-gray-500 cursor-pointer"
      onClick={props.onClick}
    >
      <div className={props.active && "border-l-8 border-purple-700"}>
        <div className="py-2">
          <p>You matched with {props.name}</p>
        </div>
      </div>
    </div>
  );
};

YourMatch.propTypes = {
  name: PropTypes.string,
  active: PropTypes.boolean,
  onClick: PropTypes.function,
};

export default YourMatch;
