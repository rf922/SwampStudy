import './Login.css';
import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () =>{
        try{

        } catch (err){
        console.error("to err is human:", err);
     }
    }
    const handleNameChange = (e) => {
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
       
        <div className="Login">
            <div className="login-card">
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Type your username" id="username" value={username} onChange={handleNameChange}/>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Type your password" id="password" value={password} onChange={handlePasswordChange} />
                <br />
                <p>Don't have an account? Register <a href="/register">here</a></p>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
       
    )
}




export default Login;