import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    //To-Do create and use form validation
    try {
      const result = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
      );
      if (result.status === 201) {
        console.log(JSON.stringify(result.data) + confirmPassword);
        navigate("/");
      } else {
        console.log(result.data);
        alert("User not registered. Please try again.");
      }
    } catch (err) {
      console.error("to err is human:", err);
    }
  };

  return (
    <div className="Register">
      <div className="register-card">
        <h1>Register</h1>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          id="firstname"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          id="lastname"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          placeholder="Type your password"
          id="confirm-password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <br />
        <p>
          Already have an account? Login <a href="/login">Login</a>
        </p>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
