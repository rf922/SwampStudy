import { useNavigate } from 'react-router-dom';
import './About.css'
import team from '../profile/team';

const About = () => {

    const navigate = useNavigate();
    const handleClick = (name) => {
        navigate (`/about/${name}`)
    }
    console.log(JSON.stringify(team));
    return (
        <div className='about'>
            <p className="text-3xl text-center">About Seal Team One</p>
        <div className="teammate-container">
            {Object.keys(team).map((name, index) => (
                <div onClick={() => {handleClick(name)} } className="teammate" key={index}>
                    <img src={team[name].imgUrl}/>
                        <h1>{team[name].name}</h1>
                </div>
            ))}                
            </div>
        </div> );
}


export default About;