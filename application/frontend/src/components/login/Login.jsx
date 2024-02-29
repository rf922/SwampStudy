import axios from "axios";
import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {

            //replace with env variable, 
            const response = await axios.post(
                `http://localhost:80/user/login`,
                { username: username, password: password }
            );
            if (response.status === 200) {
                console.log("User Login successful");
            } else {
                console.log("User Login unsuccessful");
            }
        } catch (err) {
            console.error("[ handleLogin ] :", err?.response ? err.response.data : err);
//            console.error("Request URL:", `${process.env.BACK_END_URL}/user/login`); //broken
        }
    };

    const handleNameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (//TODO implement styling 
        <div className="Login">
            <div className="login-card">
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Type your username"
                    id="username"
                    value={username}
                    onChange={handleNameChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Type your password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <br />
                <p>
                    {"Don't have an account? Register"} <a href="/register">here</a>
                </p>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
