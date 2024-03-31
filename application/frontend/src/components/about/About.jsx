import { useNavigate } from "react-router-dom";
import team from "../profile/team";

const About = () => {
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/about/${name}`);
  };
  // console.log(JSON.stringify(team));
  return (
    <div className="h-full w-full bg-purple-100 p-4">
      <p className="text-3xl text-center text-purple-800 mb-4">
        About Seal Team One
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {Object.keys(team).map((name, index) => (
          <div
            onClick={() => handleClick(name)}
            className="flex flex-col items-center cursor-pointer p-4 border-2 border-purple-200 hover:border-gold transition-all rounded-lg"
            key={index}
          >
            <div className="relative h-64 w-64 mb-2 overflow-hidden rounded-full shadow-lg">
              <img
                src={team[name].imgUrl}
                alt={name}
                className="absolute top-0 left-0 h-full w-full object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h1 className="text-purple-800 text-center border-2 border-purple-200 p-2 rounded transition-colors hover:bg-gold hover:text-purple-800">
              {team[name].name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
