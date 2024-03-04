import { useNavigate } from "react-router-dom";
import team from "../profile/team";

const About = () => {
  const navigate = useNavigate();
  const handleClick = (name) => {
    navigate(`/about/${name}`);
  };
  // console.log(JSON.stringify(team));
  return (
    <div className="h-full w-full bg-slate-800 p-4">
      <p className="text-3xl text-center text-white mb-4">
        About Seal Team One
      </p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {Object.keys(team).map((name, index) => (
          <div
            onClick={() => handleClick(name)}
            className="flex flex-col items-center cursor-pointer p-4 border-2 border-transparent hover:border-white transition-all"
            key={index}
          >
            <div className="relative h-64 w-64 mb-2 overflow-hidden rounded-full">
              <img
                src={team[name].imgUrl}
                alt={name}
                className="absolute top-0 left-0 h-full w-full object-cover rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
            <h1 className="text-white text-center border-2 border-white p-2 rounded transition-colors hover:bg-white hover:text-slate-800">
              {team[name].name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
