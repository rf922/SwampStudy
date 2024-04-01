import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div>
      <h1>settings</h1>
      <div>
        <Link to="/account" className="bg-yellow-400">
          Account Settings
        </Link>
      </div>

      <div>
        <Link to="/userProfile" className="bg-yellow-400">
          Profile Settings
        </Link>
      </div>
    </div>
  );
};

export default Settings;
